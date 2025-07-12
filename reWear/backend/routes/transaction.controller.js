const express = require("express");
const router = express.Router();
const {
  createSwapRequest,
  createRedeemRequest,
  acceptTransaction,
  rejectTransaction,
  getUserTransactions,
} = require("../controllers/transactionController");

const { authenticateUser } = require("../middleware/authMiddleware");

router.post("/swap", authenticateUser, createSwapRequest);

router.post("/redeem", authenticateUser, createRedeemRequest);

router.put("/:transactionId/accept", authenticateUser, acceptTransaction);

router.put("/:transactionId/reject", authenticateUser, rejectTransaction);

router.get("/user", authenticateUser, getUserTransactions);

module.exports = router;
