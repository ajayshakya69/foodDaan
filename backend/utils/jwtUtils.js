
const jwt = require("jsonwebtoken");


class jwtHelper {

    static generateAccessToken(user) {
        if (!user)
            throw new Error("user is required")
        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_PUBPIC_SECRET, { expiresIn: "15m" })
        return token;
    }

    static generateRefreshToken(user) {
        if (!user)
            throw new Error("user is required")
        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_PRIVATE_SECRET, { expiresIn: "15m" })
        return token;
    }
    static verifyRefreshToken(user) {

        if (!user)
            throw new Error("user is required")
        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_PRIVATE_SECRET, { expiresIn: "15m" })
        return token;
    }


}


module.exports = jwtHelper;