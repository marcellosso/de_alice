const mongoose = require('mongoose');

const AddressSchema = new mongoose.Schema({
    logradouro: {
        type: String,
        required: true,
        lowercase: true,
    },
    complemento: {
        type: String,
        required: true,
        lowercase: true,
    },
    bairro: {
        type: String,
        required: true,
        lowercase: true,
    },
    estado: {
        type: String,
        required: true,
    },
    cidade: {
        type: String,
        required: true,
        lowercase: true,
    },
    cep: {
        type: String,
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
})

const Address = mongoose.model('Address', AddressSchema);

module.exports = Address;