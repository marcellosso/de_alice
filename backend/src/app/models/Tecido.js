const mongoose = require('../../database');

const TecidoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    categorias: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Categoria',
    }],
    // categoriasId: [{
    //     type: String,
    // }],
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

const Tecido = mongoose.model('Tecido', TecidoSchema);

module.exports = Tecido;
