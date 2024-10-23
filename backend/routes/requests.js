const express = require('express');
const FoodController = require("../controllers/requestController");
const { asynchandler } = require('../middleware/errorHandler');

const router = express.Router();

router.post("/request/create", asynchandler(FoodController.saveRequest))

router.get("/request/:id", asynchandler(FoodController.getRequestByid))


router.get("/requests/recent/:role/:userId", asynchandler(FoodController.getRecentRequests))


router.get("/requests/:role/:userId", asynchandler(FoodController.getRequestsByUserId))



router.put("/request/update/:id", asynchandler(FoodController.updateRequestStatus))

module.exports = router;
