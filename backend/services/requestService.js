
const mongoose = require("mongoose");
const Request = require("../models/foodRequestModel")
    ;
const { Mongoose } = require("mongoose");
const FoodService = require("./foodService");

class FoodRequestService {

    static async saveRequest(data) {

        try {
            let { quantity, foodItemId, requesterId, donorId } = data;


            if (quantity <= 0) {
                throw new Error("invalid quantity")
            }



            const dbRequest = await Request.findOne({ requesterId: requesterId, foodItemId: foodItemId })


            if (!dbRequest) {


                const request = new Request({
                    requesterId,
                    donorId,
                    foodItemId,
                    quantity
                })

                await request.save();

                return request;
            } else {


                quantity += dbRequest.quantity;

                const request = await Request.findOneAndUpdate(
                    { requesterId: requesterId, },
                    { quantity: quantity },
                    { new: true }
                )

                return request;
            }
        } catch (error) {
            throw new Error(error.message)
        }
    }





    static async updateRequestStatus(id, status) {

        const checkRequest = await FoodRequestService.getRequestById(id)
        if (!checkRequest)
            throw new Error("Request Not found")

        if ((checkRequest.quantity > checkRequest.foodItemId.quantity && status === "accepted") || !checkRequest.foodItemId.isAvailable) {
            const request = await Request.findByIdAndUpdate(id, { status: "rejected" })
            return request;
        }

        else {

            const request = await Request.findByIdAndUpdate(id, { status: status })

            if (request && status === "accepted") {
                const updatedQuantity = checkRequest.foodItemId.quantity - checkRequest.quantity;

                await FoodService.updateFoodItem(checkRequest.foodItemId._id, { quantity: updatedQuantity });

            }

            return request;
        }

    }





    static async getRequestById(id) {
        const data = await Request.findById(id)
            .populate("foodItemId")

        return data;
    }



    static async getRequestsByUserId(id, role) {


        const matchFilter = {
            [`${role}Id`]: new mongoose.Types.ObjectId(id)
        };

        const data = await Request.aggregate([
            {
                $match: matchFilter
            },
            {
                $facet: {
                    requestData: [
                        {
                            $lookup: {
                                from: "food_donations",
                                localField: "foodItemId",
                                foreignField: "_id",
                                as: "foodItem"
                            }
                        },
                        {
                            $unwind: {
                                path: "$foodItem",
                                preserveNullAndEmptyArrays: true
                            }
                        }
                    ],
                    counts: [
                        {
                            $group: {
                                _id: "$status",
                                count: { $sum: 1 }
                            }
                        }
                    ]
                }
            }
        ]);


        return data;
    }

    static async getRecentRequests(id, role) {

const matcher={
    [`${role}Id`]: new mongoose.Types.ObjectId(id) 
}
        const requests = await Request.aggregate([
            {
                $match: matcher 
            },
            {
                $sort: { createdAt: -1 } 
            },
            {
                $limit: 5 
            },
            {
                $lookup: {
                    from: 'food_donations', 
                    localField: 'foodItemId', 
                    foreignField: '_id', 
                    as: 'foodItem' 
                }
            },
            {
                $unwind: { path: '$foodItem', preserveNullAndEmptyArrays: true }
            }
        ]);


        console.log("request", requests)
        
        return requests;
    }
}

module.exports = FoodRequestService;