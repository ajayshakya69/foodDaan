
const { idSchema } = require("../DTO/authentication");
const zodError = require("../lib/zodError");
const UserService = require("../services/userService")
function structuredCount(data) {
    let result = {};
    data.forEach(item => {
        if (item._id === "donor" || item._id === "requester")
            result[item._id] = item.count
    })
    
    return result;
}

class UserController {


    static async getUserCount(_, res, next) {

        try {
            const data = await UserService.getUserCount()

            if (!data.length === 0) {
                throw new Error("users not found");
            }

            res.status(200).json(structuredCount(data))


        } catch (error) {
            if (error.message === "users not found")
                res.status(404)
            next(error)
        }
    }


    static async getAllUsers(req, res, next) {


    }

    static async getUserById() {

    }
}

module.exports = UserController;