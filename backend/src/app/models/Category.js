const mongoose = require('../../database');

const CategorySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    value: {
        type: Number,
        required: true
    },
    products: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    }],
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Category = mongoose.model('Category', CategorySchema);

module.exports = Category;