const Item = require('../models/Item');
const User = require('../models/User');
const Transaction = require('../models/Transaction');

// Get all items for admin approval
exports.getPendingItems = async (req, res) => {
  try {
    const items = await Item.find({ isApproved: false })
      .populate('Owner', 'firstName lastName email')
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      items
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching pending items',
      error: error.message
    });
  }
};
//approve the Item --->
exports.approveItem = async (req, res) => {
  try {
    const { itemId } = req.params;

    const item = await Item.findByIdAndUpdate(
      itemId,
      { isApproved: true },
      { new: true }
    ).populate('Owner', 'firstName lastName email');

    if (!item) {
      return res.status(404).json({
        success: false,
        message: 'Item not found'
      });
    }

    res.json({
      success: true,
      message: 'Item approved successfully',
      item
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error approving item',
      error: error.message
    });
  }
};
//reject the item ->
exports.rejectItem = async (req, res) => {
  try {
    const { itemId } = req.params;

    const item = await Item.findByIdAndDelete(itemId);

    if (!item) {
      return res.status(404).json({
        success: false,
        message: 'Item not found'
      });
    }

    res.json({
      success: true,
      message: 'Item rejected and deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error rejecting item',
      error: error.message
    });
  }
};

// get all users 
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find({ role: 'user' })
      .select('-password')
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      users
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching users',
      error: error.message
    });
  }
};
//get admin transaction data -> 
exports.getAdminStats = async (req, res) => {
  try {
    const [
      totalUsers,
      totalItems,
      pendingItems,
      totalTransactions,
      completedTransactions
    ] = await Promise.all([
      User.countDocuments({ role: 'user' }),
      Item.countDocuments(),
      Item.countDocuments({ isApproved: false }),
      Transaction.countDocuments(),
      Transaction.countDocuments({ status: 'completed' })
    ]);

    res.json({
      success: true,
      stats: {
        totalUsers,
        totalItems,
        pendingItems,
        totalTransactions,
        completedTransactions
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching admin stats',
      error: error.message
    });
  }
};