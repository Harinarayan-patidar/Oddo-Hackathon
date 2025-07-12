const express = require("express");
const router = express.Router();

//importing essential controller from item.controller.js

const {createItem,getAllItems,getItem,getUserItems,deleteItem} = require("../controllers/itemController");
const { protectedRoute } = require("../middlewares/auth");

router.post("/createItem",protectedRoute,createItem);
router.get("/getAllItems",protectedRoute,getAllItems);
router.get("/create/:id",protectedRoute,getItem);
router.get("/getuseritem",protectedRoute,getUserItems);
router.delete("/deleteItem/:id",protectedRoute,deleteItem);

module.exports = router;

