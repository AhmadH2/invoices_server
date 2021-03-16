const mongoose = require('mongoose')

const invoiceSchema = new mongoose.Schema({


    customerName: {
        type: String,
        required: true,
    },
    descr: {
        type: String,
        required: false,
    },
    value: {
        type: Number,
        required: true,
    },
    creationDate: {
        type: String,
        required: false,
    },
})

invoiceSchema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});

module.exports = mongoose.model('Invoice', invoiceSchema)