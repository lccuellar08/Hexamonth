const express = require('express')
const Month = require('../models/month')
const Day = require('../models/day')
const monthRouter = express.Router()

// Get Month by ID
monthRouter.get('/:id', async (req, res) => {
    try {
        const month = await Month.findById(req.params.id)
        const days = await Day.find({Month: month.id}).populate('Month').exec()
        res.status(200).json({
            month: month,
            days: days
        })
    } catch {
        res.status(500).json({msg: "Internal Server Error"})
    }
})

// Update Month by ID
// Receive JSON obj with: {theme: string, description: string}
monthRouter.put('/:id', async (req, res) => {
    let month
    try {
        month = await Month.findById(req.params.id)
        month.Theme = req.body.theme
        month.Description = req.body.description
        await month.save()
        res.status(200).json({month: month})
    } catch {
        if(month == null) {
            // Didn't find month in database, redirect
            res.status(301).json({msg: "No month with that ID"})
        }
        else {
            res.status(500).json({msg: "Internal Server Error"})
        }
    }
})

module.exports = monthRouter