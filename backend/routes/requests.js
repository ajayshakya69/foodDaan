const express = require('express');
const FoodController = require("../controllers/requestController");
const { asynchandler } = require('../middleware/errorHandler');

const router = express.Router();

router.post("/request/create", asynchandler(FoodController.saveRequest))
router.get("/request/:id", asynchandler(FoodController.getRequestByid))
router.get("/donor/requests/:id", asynchandler(FoodController.getRequestsByDonorId))
router.get("/requester/requests/:id", asynchandler(FoodController.getRequestsByRequesterId))
router.put("/request/update/:id", asynchandler(FoodController.updateRequestStatus))

module.exports = router;
