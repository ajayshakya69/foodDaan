const { foodRequestSchema ,statusSchema} = require("../DTO/foodRequestSchema");
const { idSchema } = require("../DTO/authentication");
const FoodService = require("../services/foodService")
const FoodRequestService = require("../services/requestService")
const zodError = require("../lib/zodError")

class FoodRequestController {
    static async saveRequest(req, res, next) {

        console.log("in the save request")
        const validation = foodRequestSchema.safeParse(req.body);

        if (!validation.success) {
            res.status(400);
            throw new Error(zodError(validation.error));
        }

        console.log("data validated")
        try {
            const { foodItemId } = validation.data;
            try {
                console.log("checking food item")

                const foodDetail = await FoodService.getFoodItemById(foodItemId)

                if (!foodDetail) {
                    res.status(404)
                    throw new Error("Product not found")
                }
                const request = await FoodRequestService.saveRequest(validation.data);
                console.log("request created", request)
                res.status(204).json({ message: "request created", request });
            } catch (error) {
                res.status(404)
                throw new Error(error.message)
            }


        } catch (error) {
            if (error.message !== "Product not found")
                res.status(400)
            next(error);
        }
    }

    static async getRequestsByDonorId(req, res, next) {
        console.log("params", req.params)

        const validation = idSchema.safeParse(req.params);
        if (!validation.success) {
            res.status(400);
            throw new Error(zodError(validation.error));
        }
        try {
            const data = await FoodRequestService.getRequestsByDonorId(validation.data)
            if (data.length === 0)
                throw new Error("Request not found");
            res.status(200).json(data)
        } catch (error) {
            if (error.message === "Request not found")
                res.status(404)
            next(error)
        }

    }

    static async getRequestsByRequesterId(req, res, next) {

        const validation = idSchema.safeParse(req.params);
        if (!validation.success) {
            res.status(400);
            throw new Error(zodError(validation.error));
        }

        try {
            const data = await FoodRequestService.getRequestsByrequesterId(validation.data)
            if (data.length === 0)
                throw new Error("Request not found");
            res.status(200).json(data);
        } catch (error) {
            if (error.message === "Request not found")
                res.status(404)
            next(error)
        }

    }

    static async updateRequestStatus(req, res, next) {
        const idValidation = idSchema.safeParse(req.params);

        if (!idValidation.success) {
            res.status(400);
            throw new Error(zodError(idValidation.error));
        }
        const statusValidation = statusSchema.safeParse(req.body);

        if (!statusValidation.success) {
            res.status(400);
            throw new Error(zodError(statusValidation.error));
        }

        try {
            await FoodRequestService.updateRequestStatus(idValidation.data.id, statusValidation.data.status)
            res.status(204).send();
        } catch (error) {
            next(error)
        }


    }

    static async getRequestByid(req, res, next) {
        const validation = idSchema.safeParse(req.params);
        if (!validation.success) {
            res.status(400);
            throw new Error(zodError(validation.error));
        }
        try {
            const request = await FoodRequestService.getRequestById(validation.data)
            if (!request)
                throw new Error("Request not found")
            res.status(200).json(request)
        } catch (error) {
            if (error.message === "Request not found")
                res.status(404)
            next(error)
        }
    }
}

module.exports = FoodRequestController;