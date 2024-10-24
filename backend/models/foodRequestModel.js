
const { Schema, mongoose } = require("../lib/db")


const requestSchema = new Schema({

    requesterId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    donorId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    foodItemId: {
        type: Schema.Types.ObjectId,
        ref: 'Food_donation',
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },

    status: {
        type: String,
        enum: ['pending', 'accepted', 'rejected', 'cancelled'],
        default: 'pending',
    }
});


module.exports = mongoose.model('Request', requestSchema); 