const express = require('express');
const { asynchandler } = require('../middleware/errorHandler');
const FoodController = require("../controllers/foodController")

const router = express.Router();

router.get("/allitems", asynchandler(FoodController.getFoodItems))

router.get("/item/:id", asynchandler(FoodController.getFoodItemById))

router.get("/items/user/:id", asynchandler(FoodController.getFoodItemsByUserId))

router.post("/create", asynchandler(FoodController.createFoodItem))

router.put("/update/:id", asynchandler(FoodController.updateFoodItem))

router.delete("/delete/:id", asynchandler(FoodController.deleteFoodItem))



module.exports = router;
