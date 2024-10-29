
const jwt = require("jsonwebtoken");
const Redisutils = require("./redisUtils");


class jwtHelper {

    static generateAccessToken(user) {
        if (!user)
            throw new Error("user is required")
        const token = jwt.sign({ _id: user._id, role: user.role }, process.env.JWT_ACCESS_SECRET, { expiresIn: "15m" })
        return token;
    }


    static async generateRefreshToken(user) {
        if (!user)
            throw new Error("user is required")
        const token = jwt.sign({ _id: user._id, role: user.role }, process.env.JWT_REFRESH_SECRET, { expiresIn: "24h" })

        await Redisutils.setCache(`refreshToken:${user._id}`, token)

        return token;
    }



    static async verifyRefreshToken(token) {

        const playload = jwt.verify(token, process.env.JWT_REFRESH_SECRET)

        const savedToken = await Redisutils.getCache(`refreshToken:${playload._id}`);

        if (savedToken !== token)
            throw new Error("invalid token")

        const newAccessToken = this.generateAccessToken(playload)

        return newAccessToken;
    }




}

module.exports = jwtHelper;
