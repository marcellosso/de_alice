const mongoose = require('../../database');

const OrderSchema = new mongoose.Schema({
    value: {
        type: Number,
    },
    productsId: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        //required: true
    }],
    status: {
        type: String,
        enum: ['NOVO', 'EM ANDAMENTO', 'PRONTO', 'CONCLUÍDO'],
        default: 'NOVO'
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Order = mongoose.model('Order', OrderSchema);

module.exports = Order;