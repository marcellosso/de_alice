const mongoose = require('../../database');

const CategoriaSchema = new mongoose.Schema({
    name: {
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
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

const Categoria = mongoose.model('Categoria', CategoriaSchema);

module.exports = Categoria;
