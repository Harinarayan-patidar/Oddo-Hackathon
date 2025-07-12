const Transaction = require("../models/Transaction.js");
const Item = require("../models/Item");
const User = require ("../models/User");
exports.createSwapRequest = async (req, res) => {
  try {
    const { itemId, myItemId } = req.body; 
    const senderId = req.user.id;
    const [wantedItem, offeredItem] = await Promise.all([
      Item.findById(itemId).populate('Owner'),
      Item.findById(myItemId).populate('Owner')
    ]);
    if (!wantedItem || !offeredItem) {
      return res.status(404).json({
        success: false,
        message: 'One or both items not found'
      });
    }

    if (!wantedItem.isAvailable || !offeredItem.isAvailable) {
      return res.status(400).json({
        success: false,
        message: 'One or both items are not available for swap'
      });
    }

    if (wantedItem.Owner._id.toString() === senderId) {
      return res.status(400).json({
        success: false,
        message: 'Cannot request swap for your own item'
      });
    }

    if (offeredItem.Owner._id.toString() !== senderId) {
      return res.status(400).json({
        success: false,
        message: 'You can only offer items that you own'
      });
    }

    // Check if already requested
    const existingRequest = await Transaction.findOne({
      item: itemId,
      sender: senderId,
      type: 'swap',
      status: 'pending'
    });

    if (existingRequest) {
      return res.status(400).json({
        success: false,
        message: 'Swap request already exists'
      });
    }

    const transaction = new Transaction({
      item: itemId,
      sender: senderId,
      receiver: wantedItem.Owner._id,
      type: 'swap',
      status: 'pending',
      offeredItem: myItemId // Add this field to Transaction schema
    });

    await transaction.save();

    // Update both items with swap request
    await Promise.all([
      Item.findByIdAndUpdate(itemId, { swapRequestedBy: senderId }),
      Item.findByIdAndUpdate(myItemId, { swapRequestedBy: wantedItem.Owner._id })
    ]);

    await transaction.populate([
      { path: 'item', select: 'title description price' },
      { path: 'offeredItem', select: 'title description price' },
      { path: 'sender', select: 'firstName lastName email' },
      { path: 'receiver', select: 'firstName lastName email' }
    ]);

    res.status(201).json({
      success: true,
      message: 'Swap request created successfully',
      transaction
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating swap request',
      error: error.message
    });
  }
};
//redeem the outfit with points->
exports.createRedeemRequest = async (req, res) => {
  try {
    const { itemId } = req.body;
    const senderId = req.user.id;

    const item = await Item.findById(itemId).populate('Owner');
    const user = await User.findById(senderId);
    
    if (!item) {
      return res.status(404).json({
        success: false,
        message: 'Item not found'
      });
    }

    if (!item.isAvailable) {
      return res.status(400).json({
        success: false,
        message: 'Item is not available for redemption'
      });
    }

    if (item.Owner._id.toString() === senderId) {
      return res.status(400).json({
        success: false,
        message: 'Cannot redeem your own item'
      });
    }

    // Check if user has enough points (item price)
    if (user.points < item.points) {
      return res.status(400).json({
        success: false,
        message: `Insufficient points. Required: ${item.price}, Available: ${user.points}`
      });
    }

    const transaction = new Transaction({
      item: itemId,
      sender: senderId,
      receiver: item.Owner._id,
      type: 'redeem',
      status: 'pending'
    });

    await transaction.save();

    await transaction.populate([
      { path: 'item', select: 'title description price' },
      { path: 'sender', select: 'firstName lastName email' },
      { path: 'receiver', select: 'firstName lastName email' }
    ]);

    res.status(201).json({
      success: true,
      message: 'Redeem request created successfully',
      transaction
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating redeem request',
      error: error.message
    });
  }
};
//Accept the redeem or swap request  ---->

exports.acceptTransaction = async (req, res) => {
  try {
    const { transactionId } = req.params; // id fetch hogi params se
    const userId = req.user.id;  // since user is authenticated

    const transaction = await Transaction.findById(transactionId)
      .populate('item')
      .populate('sender')
      .populate('receiver');

    if (!transaction) {
      return res.status(404).json({
        success: false,
        message: 'Transaction not found'
      });
    }

    if (transaction.receiver._id.toString() !== userId) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to accept this transaction'
      });
    }

    if (transaction.status !== 'pending') {
      return res.status(400).json({
        success: false,
        message: 'Transaction is not pending'
      });
    }

    // Handle different transaction types
    if (transaction.type === 'redeem') {
      // For redeem: buyer pays item price, seller gets the points
      const itemPrice = transaction.item.price;

      // Deduct points from buyer (sender)
      await User.findByIdAndUpdate(transaction.sender._id, {
        $inc: { points: -itemPrice }
      });

      // Add points to seller (receiver)
      await User.findByIdAndUpdate(transaction.receiver._id, {
        $inc: { points: itemPrice }
      });

      // Update item
      await Item.findByIdAndUpdate(transaction.item._id, {
        isAvailable: false,
        redeemedBy: transaction.sender._id
      });
    } else if (transaction.type === 'swap') {
      // For swaps: no point deduction/increment - just exchange items
      // Update both items to unavailable
      await Promise.all([
        Item.findByIdAndUpdate(transaction.item._id, {
          isAvailable: false,
          swapRequestedBy: transaction.sender._id
        }),
        // Also update the offered item if it exists
        transaction.offeredItem && Item.findByIdAndUpdate(transaction.offeredItem, {
          isAvailable: false,
          swapRequestedBy: transaction.receiver._id
        })
      ]);
    }

    // Update transaction status
    transaction.status = 'completed';
    await transaction.save();

    res.json({
      success: true,
      message: 'Transaction accepted successfully',
      transaction
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error accepting transaction',
      error: error.message
    });
  }
};

//Reject The Transaction 
exports.rejectTransaction = async (req, res) => {
  try {
    const { transactionId } = req.params;
    const userId = req.user.id;

    const transaction = await Transaction.findById(transactionId);

    if (!transaction) {
      return res.status(404).json({
        success: false,
        message: 'Transaction not found'
      });
    }

    if (transaction.receiver.toString() !== userId) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to reject this transaction'
      });
    }

    if (transaction.status !== 'pending') {
      return res.status(400).json({
        success: false,
        message: 'Transaction is not pending'
      });
    }

    transaction.status = 'cancelled';
    await transaction.save();

    // Remove swap request from item if it was a swap
    if (transaction.type === 'swap') {
      await Item.findByIdAndUpdate(transaction.item, {
        $unset: { swapRequestedBy: 1 }
      });
    }

    res.json({
      success: true,
      message: 'Transaction rejected successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error rejecting transaction',
      error: error.message
    });
  }
};

// Get user's transactions
exports.getUserTransactions = async (req, res) => {
  try {
    const userId = req.user.id;
    const { type, status } = req.query;

    const filter = {
      $or: [
        { sender: userId },
        { receiver: userId }
      ]
    };

    if (type) filter.type = type;
    if (status) filter.status = status;

    const transactions = await Transaction.find(filter)
      .populate('item', 'title description category type')
      .populate('sender', 'firstName lastName email')
      .populate('receiver', 'firstName lastName email')
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      transactions
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching transactions',
      error: error.message
    });
  }
};