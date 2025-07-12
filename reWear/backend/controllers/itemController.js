const Item = require("../models/Item");
const User  = require("../models/User");
const Transactions = require("../models/User");
const cloudinary  = require('../config/cloudinary');
const fs = require("fs");
// Create a New Item

exports.createItem = async (req, res) => {
  try {
    const { title, description, category, type, size, condition, tags, price } = req.body;
    if(!title||!description||!type||!size){
return res.status(400).json(
    {
        success : false,
        message : "required fields cannot be empty"
    }
)
    }
    
    // Validate price
    if (!price || price <= 0) {
      return res.status(400).json({
        success: false,
        message: 'Item price is required and must be greater than 0'
      });
    }
    const filePath = req.file.path;
    const resultOfUpload = await cloudinary.uploader.upload(filePath,{
        folder : "rewear-images",
    });
    fs.unlinkSync(filePath);

    const newItem = new Item({
      Owner: req.user.id,  
      title,
      description,
      category,
      type,
      size,
      condition,
      tags: tags || [],//details of outfit
      price,
      OutfitImage : resultOfUpload.secure_url,
    });
    const savedItem = await newItem.save();
    await savedItem.populate('Owner', 'firstName lastName email');
    res.status(201).json({
      success: true,
      message: 'Item created successfully',
      item: savedItem
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating item',
      error: error.message
    });
  }
};
//get all approved and available items -->
exports.getAllItems = async (req, res) => {
  try {
    const filter = {
      isApproved: true,
      isAvailable: true
    };

    const items = await Item.find(filter)
      .populate('Owner', 'firstName lastName location')
      .sort({ createdAt: -1 }) 
      .select('title description category type size condition price tags createdAt Owner');

    res.json({
      success: true,
      items
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching items',
      error: error.message
    });
  }
};


//Get Single Item
exports.getItem = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id)
      .populate('Owner', 'firstName lastName location profileImage')
      .populate('swapRequestedBy', 'firstName lastName');

    if (!item) {
      return res.status(404).json({
        success: false,
        message: 'Item not found'
      });
    }

    res.json({
      success: true,
      item
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching item',
      error: error.message
    });
  }
};
//get items offered by specific user
exports.getUserItems = async (req, res) => {
  try {
    const items = await Item.find({ Owner: req.user.id })
      .populate('swapRequestedBy', 'firstName lastName email')
      .populate('redeemedBy', 'firstName lastName email')
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      items
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching user items',
      error: error.message
    });
  }
};
//deleting Item
exports.deleteItem = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    
    if (!item) {
      return res.status(404).json({
        success: false,
        message: 'Item not found'
      });
    }

    // Check if user owns the item
    if (item.Owner.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this item'
      });
    }

    await Item.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: 'Item deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting item',
      error: error.message
    });
  }
};
