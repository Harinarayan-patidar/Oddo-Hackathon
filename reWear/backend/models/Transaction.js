const mongoose = require('mongoose');
const transactionSchema = new mongoose.Schema({
  item: { type: mongoose.Schema.Types.ObjectId, ref: 'Item' },
  sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // person who initiates
  receiver: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // item uploader
  type: { type: String, enum: ['swap', 'redeem'] },
  status: { type: String, enum: ['pending', 'completed', 'cancelled'], default: 'pending' },
}, { timestamps: true });

// for performance optimization adding indexes
 transactionSchema.index({sender : 1 , status:1})
 transactionSchema.index({receiver : 1 , status:1});
 transactionSchema.index({item : 1, type: 1,status:1})
module.exports = mongoose.model("Transactions",transactionSchema);

