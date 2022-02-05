const { Router } = require('express')
const express = require('express')
const Month = require('../models/month')
const indexRouter = express.Router()

indexRouter.get('/', async (req, res) => {
    const months = await Month.find({})
    res.status(200).json({months: months})
})

module.exports = indexRouter