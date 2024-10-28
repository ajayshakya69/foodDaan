const { redis } = require("../lib/redis");


class Redisutils {
    static async getCache(key) {
        try {
            return await redis.get(key)
        } catch (error) {
            return error;
        }
    }

    static async setCache(key, data) {
        try {
            return await redis.set(key, JSON.stringify(data))
        } catch (error) {
            return error;
        }
    }

    static async clearCache(key) {
        try {
            return await redis.del(key)
        } catch (error) {
            return error;
        }
    }
}


module.exports = Redisutils;