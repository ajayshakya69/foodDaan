const Request = require("../models/foodRequestModel")
    ;

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
        try {
            const request = await Request.findByIdAndUpdate(id, { status: status })
        } catch (error) {
            throw new Error("error in updating status");
        }
    }

    static async getRequestById(id) {
        const data = Request.findById(id);

        return data;
    }

    static async getRecentRequests(id, role) {

        console.log("requests comes")

        const request = await Request.find({ [`${role}Id`]: id })
            .sort({ createdAt: -1 })
            .limit(5)
            .populate("foodItemId")

            console.log(request)


        return request;
    }
}

module.exports = FoodRequestService;