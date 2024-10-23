
const UserService = require('../services/userService');
const { registerUserSchema, loginUserSchema } = require('../DTO/authentication');
const zodError = require('../lib/zodError');

class AuthController {


    static async register(req, res, next) {


        const validation = registerUserSchema.safeParse(req.body);

        if (!validation.success) {

            res.status(400);
            throw new Error(zodError(validation.error));
        }

        try {

            const saveUser = await UserService.createUser(validation.data)

            if (!saveUser) {
                res.status(400);
                throw new Error("user not created")
            }

            res.status(201).json({ message: "user created successfully", user: saveUser })
        } catch (error) {
            res.status(400)
            next(error)

        }
    }



    static async login(req, res, next) {
        const validation = loginUserSchema.safeParse(req.body);

        if (!validation.success) {
            res.status(400);
            throw new Error(zodError(validation.error));
        }

        const { email, password } = validation.data;


        console.log(validation.data)

        try {

            const checkUser = await UserService.getUserInfo(email)

        

            if (!checkUser || !(await checkUser.matchPassword(password))) {
                throw new Error("invalid credentials");
            }

            const { password: pwd, ...dbuser } = checkUser._doc;

            res.status(200).json({ message: "login success", user: dbuser })


        } catch (error) {
            if (error.message == "invalid credentials") {
                res.status(401)
            }
            next(error)
        }
    }

}

module.exports = AuthController;


