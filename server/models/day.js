const { Int32, Double } = require('mongodb')
const mongoose = require('mongoose')

const daySchema = new mongoose.Schema({
    Day: {
        type: Number,
        bbtype: Int32,
        required: true
    },
    Month: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Month'
    },
    Complete: {
        type: Boolean,
        required: true
    },
    filetype: {
        type: String,
        required: false,
    },
    filename: {
        type: String,
        required: false,
    },
    filepath: {
        type: String,
        required: false,
    }
})

module.exports = mongoose.model('Day', daySchema)