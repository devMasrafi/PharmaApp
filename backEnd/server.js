const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')
const connectDB = require('./config/db')
const bodyParser = require('body-parser')


// dataBase Connection  
dotenv.config()
connectDB()

const app = express()


// middleware
app.use(cors())
app.use(bodyParser.json())
app.use(express.urlencoded({ extended: true }))


const PORT = process.env.PORT || 7000
app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`)
})