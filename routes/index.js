const { Router } = require('express')
const express = require('express')
const indexRouter = express.Router()

indexRouter.get('/', (req, res) => {
    res.status(200).json({msg: "Hello World!"})
})

module.exports = indexRouter