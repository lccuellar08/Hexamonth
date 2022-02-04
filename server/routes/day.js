const express = require('express')
const Month = require('../models/month')
const Day = require('../models/day')
const dayRouter = express.Router()
const fs = require('fs')

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

// Update with file
dayRouter.put('/:id', async (req, res) => {
    console.log(req.body)
    if (!req.files) {
        res.status(400).json({msg: 'No files were uploaded.'});
        return
    }
    
    // status 400 to differentiate from ending the request in the on limit
    if(req.files.dayFile.truncated) {
        res.status(400).json({msg: "File too big"})
        return
    }

    fs.writeFile('../files/dayFile.txt', req.files.dayFile, function (err) {
        if(err)
            res.status(500).json({msg: "Error saving file"})
        else {
            res.send(200)
        }
    })

})

module.exports = dayRouter