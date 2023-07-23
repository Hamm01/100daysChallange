const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const bodyParser = require('body-parser')

const adminRouter = require('./routes/admin')
const userRouter = require('./routes/user')

const app = express()
app.use(cors())

app.use(bodyParser.json()) // to parse the post requests
app.use('/admin', adminRouter)
app.use('/user', userRouter)

//Connection to mongodb

mongoose.connect('mongodb://127.0.0.1:27017/courses', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName: 'courses'
})

app.listen(3000, () => {
  console.log('Port Succesfully Deployed for Backend on 3000')
})
