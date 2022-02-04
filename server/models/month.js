const { Int32, Double } = require('mongodb')
const mongoose = require('mongoose')

const monthSchema = new mongoose.Schema({
    MonthName: {
        type: String,
        required: true
    },
    Month: {
        type: Number,
        btype: Int32,
        required: true
    },
    Year: {
        type: Number,
        btype: Int32,
        required: true
    },
    Theme: {
        type: String,
        required: false,
    },
    Description: {
        type: String,
        required: false,
    }
})

module.exports = mongoose.model('Month', monthSchema)