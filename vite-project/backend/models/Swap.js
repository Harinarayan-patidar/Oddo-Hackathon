const mongoose = require('mongoose');
const transactionSchema = new mongoose.Schema({
  item: { type: mongoose.Schema.Types.ObjectId, ref: 'Item' },
  sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // person who initiates
  receiver: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // item uploader
  type: { type: String, enum: ['swap', 'redeem'] },
  status: { type: String, enum: ['pending', 'completed', 'cancelled'], default: 'pending' },
}, { timestamps: true });

module.exports = mongoose.model("Transactions",transactionSchema);

