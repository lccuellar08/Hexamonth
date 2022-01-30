if(process.env.NODE_ENV !== "production") {
    require('dotenv').config()
}

const express = require("express")
const bodyParser = require('body-parser')
const cors = require("cors")

const app = express()
app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded( {limit: '10mb', extended: false} )) 

const mongoose = require("mongoose")
mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true}
)
const db = mongoose.connection
db.on("error", error => console.error(error))
db.once("open", () => console.log("Connected to Mongoose"))


var databaseInit = require('./scripts/databaseInit')
//databaseInit.createMonths()
//databaseInit.createDays()

const indexRouter = require('./routes/index')
const monthRouter = require('./routes/month')
const dayRouter = require('./routes/day')
app.use('/', indexRouter)
app.use('/month', monthRouter)
app.use('/day', dayRouter)


app.listen(process.env.PORT || 3000)