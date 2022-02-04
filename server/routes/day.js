const express = require('express')
const Month = require('../models/month')
const Day = require('../models/day')
const dayRouter = express.Router()
const fs = require('fs')


// Get Day by ID
dayRouter.get('/:id', async (req, res) => {
    try {
        const day = await Day.findById(req.params.id).populate('Month').select('-filepath').exec()

        res.status(200).json({
            day: day
        })
    } catch {
        res.status(500).json({msg: "Internal Server Error"})
    }
})

// Get day's file by ID
dayRouter.get('/:id/file', async (req, res) => {
    try {
        const day = await Day.findById(req.params.id).populate('Month').exec()
        if(day.filepath) {
            const fileData = fs.readFileSync(`./files/${day.filename}`);
            console.log("fileData")
            res.send(fileData)
        } else {
            console.log("failed to read filepath")
        }
    } catch {
        res.status(500).json({msg: "Internal Server Error"})
    }
})

// Update with file
dayRouter.put('/:id', async (req, res) => {
    console.log(req.files)
    if (!req.files) {
        res.status(400).json({msg: 'No files were uploaded.'});
        return
    }
    
    // status 400 to differentiate from ending the request in the on limit
    if(req.files[0].truncated) {
        res.status(400).json({msg: "File too big"})
        console.log("Truncating")
        return
    }

    const extension = req.files[0].originalname.split(".").slice(-1)[0]

    fs.rename("./"+req.files[0].path, `./files/${req.params.id}.${extension}`, function (err) {
        if(err) {
            // res.status(500).json({msg: "Internal Server Error"})
            throw err
        }
    })
    console.log("File saved")

    let day
    try {
        day = await Day.findById(req.params.id)
        day.filename = `${req.params.id}.${extension}`
        day.filepath = process.cwd() + `/files/${req.params.id}.${extension}`
        day.Complete = true
        await day.save()
        res.status(200).json({day: day})
    } catch {
        if(day == null) {
            // Didn't find day in database, redirect
            res.status(301).json({msg: "No day with that ID"})
        }
        else {
            res.status(500).json({msg: "Internal Server Error"})
        }
    }

})

module.exports = dayRouter