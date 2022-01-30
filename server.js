if(process.env.NODE_ENV !== "production") {
    require('dotenv').config()
}

const express = require("express")
const cors = require("cors")

const app = express()
app.use(cors())

const mongoose = require("mongoose")
mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true}
)
const db = mongoose.connection
db.on("error", error => console.error(error))
db.once("open", () => console.log("Connected to Mongoose"))

const indexRouter = require('./routes/index')

app.use('/', indexRouter)

app.listen(process.env.PORT || 3000)