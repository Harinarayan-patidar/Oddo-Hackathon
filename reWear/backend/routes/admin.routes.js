const express = require("express");
const router = express.Router();
const protectedRoute = require("../middlewares/auth");
const {
  getPendingItems,
  approveItem,
  rejectItem,
  getAllUsers,
  getAdminStats
} = require("../controllers/adminController");
//importing the controller here->
router.get("/getPendingItems", protectedRoute,getPendingItems);
router.get("/approveItem",protectedRoute,approveItem);
router.get("/rejectItem",protectedRoute,rejectItem);
router.get("/getallusers",protectedRoute,getAllUsers);
router.get("/getAdminStats",protectedRoute,getAdminStats);

module.exports = router;

