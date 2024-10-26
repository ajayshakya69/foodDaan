const User = require("../models/userModel")

class UserService {

    static async createUser(data) {
        const { email } = data;
        console.log("checking user")
        const isUserExit = await User.findOne({ email });

        if (isUserExit)
            throw new Error("user already exist");

        const user = new User({ ...data });
        try {

            console.log("saving is database");

            await user.save()

            const { password, ...userWithoutPassword } = user._doc;

            return userWithoutPassword;
        } catch (error) {
            throw new Error(error.message)
        }
    }

    static async getUserInfo(email) {



        let user = await User.findOne({ email });


        return user;

    }
    static async getUserById(id) {
        let user = await User.findById(id);
        return user;
    }

    static async getUserCount() {

        const userCount = await User.aggregate([
            {
                $group: {
                    _id: '$role',
                    count: { $sum: 1 }
                }
            }
        ])


        return userCount
    }



}

module.exports = UserService;