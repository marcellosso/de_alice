const mongoose = require('../../database');

const ProductSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        // required: true,
    },
    // value: {
    //     type: Number,
    // },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Product = mongoose.model('Product', ProductSchema);

module.exports = Product;