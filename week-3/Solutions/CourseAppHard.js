/*
 This Course Selling will store the data in Mongodb
 this is not best way to do the backend
 we have routes, middlewares, schemas in  a same file
 but for better understanding using on in single js file
*/

const express = require('express')
const mongoose = require('mongoose')
let jwt = require('jsonwebtoken')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()

app.use(cors())
app.use(bodyParser.json())

const ADMIN_SECRET = 'S3cr3t'
const USER_SECRET = 'S3cr3t-key'

// Define mongoose schemas

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  purchasedCourses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }]
})
const adminSchema = new mongoose.Schema({
  username: String,
  password: String
})
const courseSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  imageLink: String,
  published: Boolean
})

// Defining mongoose models

const User = mongoose.model('User', userSchema)
const Admin = mongoose.model('Admin', adminSchema)
const Course = mongoose.model('Course', courseSchema)

// Connect to MongoDB

mongoose.connect(
  'mongodb+srv://lejav36928:mJgzTDpIH@cluster0.bzkb2ko.mongodb.net/courses',
  { useNewUrlParser: true, useUnifiedTopology: true }
)
function generateAdminToken({ username }) {
  return jwt.sign({ username, role: 'admin' }, ADMIN_SECRET, {
    expiresIn: '1h'
  })
}
function authenticateAdminRoute(req, res, next) {
  const authHeader = req.headers.authorization
  if (authHeader) {
    const token = authHeader.split(' ')[1]
    jwt.verify(token, ADMIN_SECRET, (err, admin) => {
      if (err) {
        res.status(401).json({ message: 'Unautorized Access' })
      }
      req.admin = admin
      next()
    })
  } else {
    res.status(403).json({ message: 'Forbidden Access!!' })
  }
}

// Admin Routes
app.get('/admin/me', authenticateAdminRoute, async (req, res) => {
  const admin = await Admin.findOne({ username: req.admin.username })
  res.status(200).json({ username: admin.username })
})

app.post('/admin/signup', async (req, res) => {
  const { username, password } = req.body
  const admin = await Admin.findOne({ username })
  if (admin) {
    res.status(403).json({ message: 'Admin Already exists' })
  } else {
    const newAdmin = new Admin({ username, password })
    newAdmin.save()
    const token = generateAdminToken({ username })
    res.status(201).json({ message: 'Admin Sucessfully created', token: token })
  }
})

app.post('/admin/login', async (req, res) => {
  const { username, password } = req.headers
  const admin = await Admin.findOne({ username, password })

  if (!admin) {
    res.status(401).json({ message: 'Unauthorized Access' })
  } else {
    const token = generateAdminToken({ username })
    res.status(200).json({ message: 'Logged in Succesfully', token: token })
  }
})
app.post('/admin/courses', authenticateAdminRoute, async (req, res) => {
  const course = new Course(req.body)
  await course.save()
  res
    .status(201)
    .json({ message: 'Course Created Succesfully', courseId: course.id })
})

app.put(
  '/admin/courses/:courseId',
  authenticateAdminRoute,
  async (req, res) => {
    const courseId = req.params.courseId
    const course = await Course.findByIdAndUpdate(courseId, req.body, {
      new: true
    })
    if (course) {
      res.send({ message: 'Course Successfully updated', courseId: courseId })
    } else {
      res.status(404).json({ message: 'Course not found' })
    }
  }
)

app.get('/admin/courses', authenticateAdminRoute, async (req, res) => {
  const courses = await Course.find({})
  res.json({ courses })
})
// End of Admin Routes

function generateUserToken({ username }) {
  return jwt.sign({ username, role: 'user' }, USER_SECRET, { expiresIn: '1h' })
}

function authenticateUserRoute(req, res, next) {
  const authHeader = req.headers.authorization
  if (authHeader) {
    const token = authHeader.split(' ')[1]
    jwt.verify(token, USER_SECRET, (err, user) => {
      if (err) {
        res.status(401).json({ message: 'Unautorized Access' })
      }
      req.user = user
      next()
    })
  } else {
    res.status(403).json({ message: 'Forbidden Access!!' })
  }
}

// User routes

app.post('/users/signup', async (req, res) => {
  const { username, password } = req.body
  const user = await User.findOne({ username })
  if (user) {
    res.status(403).json({ message: 'User already exists' })
  } else {
    const newUser = new User({ username, password })
    await newUser.save()
    const token = generateUserToken({ username })
    res.json({ message: 'User created successfully', token })
  }
})

app.post('/users/login', async (req, res) => {
  const { username, password } = req.headers
  const user = await User.findOne({ username, password })
  if (user) {
    const token = generateUserToken({ username })
    res.json({ message: 'Logged in successfully', token })
  } else {
    res.status(403).json({ message: 'Invalid username or password' })
  }
})

app.get('/users/courses', authenticateUserRoute, async (req, res) => {
  const courses = await Course.find({ published: true })
  res.json({ courses })
})

app.post(
  '/users/courses/:courseId',
  authenticateUserRoute,
  async (req, res) => {
    const course = await Course.findById(req.params.courseId)
    if (course) {
      const user = await User.findOne({ username: req.user.username })

      if (user) {
        user.purchasedCourses.push(course)
        await user.save()
        res.json({ message: 'Course purchased successfully' })
      } else {
        res.status(403).json({ message: 'User not found' })
      }
    } else {
      res.status(404).json({ message: 'Course not found' })
    }
  }
)

app.get('/users/purchasedCourses', authenticateUserRoute, async (req, res) => {
  const user = await User.findOne({ username: req.user.username }).populate(
    'purchasedCourses'
  )
  if (user) {
    res.json({ purchasedCourses: user.purchasedCourses || [] })
  } else {
    res.status(403).json({ message: 'User not found' })
  }
})

app.listen(3000, () => {
  console.log('Port Succesfully Deployed for Backend')
})
