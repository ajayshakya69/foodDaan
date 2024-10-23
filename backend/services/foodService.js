

const { split } = require("postcss/lib/list");
const FoodDonation = require("../models/foodModel");
class FoodService {

    static async createFoodItem(data) {
        const saveItem = new FoodDonation({ ...data });

        try {
            await saveItem.save();
            return saveItem;
        } catch (error) {
            throw new Error(error.message)
        }
    }

    static async updateFoodItem(id, data) {


        const updatedItem = await FoodDonation.findByIdAndUpdate(
            id,
            data,
            { new: true }
        )

        if (!updatedItem) {
            throw new Error("Food donation item not found");
        }

        return updatedItem;
    }


    static async getFoodItemById(id) {

        console.log(id);


        const data = await FoodDonation
            .findById(id)
            .populate('donatedBy', "name organization_name")
            .exec();


        return data;
    }


    static async getFoodItemsByUserId(id) {

        const data = await FoodDonation.find({ donatedBy: id });

        return data;
    }

    static async getFoodItems() {
        const currentDate = new Date().toISOString().split('T')[0];
        const data = await FoodDonation.find({ expirationDate: { $gt: currentDate } });
        
        return data;
    }

}


module.exports = FoodService