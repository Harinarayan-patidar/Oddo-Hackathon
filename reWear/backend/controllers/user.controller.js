const User = require('../models/User');
const Item = require('../models/Item');

exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.json({
      success: true,
      user
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching profile',
      error: error.message
    });
  }
};
//update the profile of user
exports.updateProfile = async (req, res) => {
  try {
    const { firstName, lastName, location, profileImage } = req.body;
    
    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      { firstName, lastName, location, profileImage },
      { new: true, runValidators: true }
    ).select('-password');

    res.json({
      success: true,
      message: 'Profile updated successfully',
      user: updatedUser
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating profile',
      error: error.message
    });
  }
};
//get user dashboard stats
exports.getDashboardStats = async (req, res) => {
  try {
    const userId = req.user.id;

    const [
      totalItems,
      activeItems,
      pendingRequests,
      completedTransactions,
      user
    ] = await Promise.all([
      Item.countDocuments({ Owner: userId }),
      Item.countDocuments({ Owner: userId, isAvailable: true }),
      Transaction.countDocuments({ receiver: userId, status: 'pending' }),
      Transaction.countDocuments({ 
        $or: [{ sender: userId }, { receiver: userId }], 
        status: 'completed' 
      }),
      User.findById(userId).select('points')
    ]);

    res.json({
      success: true,
      stats: {
        totalItems,
        activeItems,
        pendingRequests,
        completedTransactions,
        points: user.points
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching dashboard stats',
      error: error.message
    });
  }
};
