const mongoose = require('mongoose')

const paymentSchema = new mongoose.Schema({


    invoiceId: {
        type: String,
        required: true,
    },
    value: {
        type: Number,
        required: true,
    },
    paymentDate: {
        type: String,
        required: false,
    },
    isPayed: {
        type: Boolean,
        default: false,
    }

})

paymentSchema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});

module.exports = mongoose.model('Payment', paymentSchema)