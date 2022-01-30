const express = require('express')
const Month = require('../models/month')
const Day = require('../models/day')
const dayRouter = express.Router()

// Get Day by ID
dayRouter.get('/:id', async (req, res) => {
    try {
        const day = await Day.findById(req.params.id).populate('Month').exec()
        res.status(200).json({
            day: day
        })
    } catch {
        res.status(500).json({msg: "Internal Server Error"})
    }
})

module.exports = dayRouter