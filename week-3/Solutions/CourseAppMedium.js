/*
These routes using the files admins.json, users.json, courses.json for 
storing the information and using JWT for verifying the requests and
sending appropriate response
*/
const express = require('express')
let jwt = require('jsonwebtoken')
const fs = require('fs')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()

app.use(cors())
app.use(bodyParser.json())

let ADMINS = []
let COURSES = []
let USERS = []
const ADMIN_SECRET = 'S3cr3t'
const USER_SECRET = 'S3cr3t-key'

try {
  ADMINS = JSON.parse(fs.readFileSync('./files/admins.json', 'utf8'))
  USERS = JSON.parse(fs.readFileSync('./files/users.json', 'utf8'))
  COURSES = JSON.parse(fs.readFileSync('./files/courses.json', 'utf8'))
} catch {
  ADMINS = []
  COURSES = []
  USERS = []
}

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

app.post('/admin/signup', (req, res) => {
  const admin = req.body
  const existingAdmin = ADMINS.find(a => a.username === admin.username)
  if (existingAdmin) {
    res.status(403).json({ message: 'Admin already existed' })
  } else {
    ADMINS.push(admin)
    fs.writeFileSync('./files/admins.json', JSON.stringify(ADMINS))
    const token = generateAdminToken(admin)
    res.status(200).json({ message: 'Admin Created Succesfuly', token: token })
  }
})

app.post('/admin/login', (req, res) => {
  const { username, password } = req.headers
  const admin = ADMINS.find(
    a => a.username === username && a.password === password
  )

  if (!admin) {
    res.status(401).json({ message: 'Unauthorized Access' })
  } else {
    const token = generateAdminToken({ username })
    res.status(200).json({ message: 'Logged in Succesfully', token: token })
  }
})

app.post('/admin/courses', authenticateAdminRoute, (req, res) => {
  const course = req.body
  course.id = COURSES.length + 1
  COURSES.push(course)
  fs.writeFileSync('./files/courses.json', JSON.stringify(COURSES))
  res.send({ message: 'Course Successfully created', courseId: course.id })
})

app.put('/admin/courses/:courseId', authenticateAdminRoute, (req, res) => {
  const courseId = parseInt(req.params.courseId)
  const course = COURSES.find(c => c.id === courseId)
  if (course.title) {
    Object.assign(course, req.body)
    fs.writeFileSync('./files/courses.json', JSON.stringify(COURSES))
    res.send({ message: 'Course Successfully updated', courseId: courseId })
  } else {
    res.status(404).json({ message: 'Course not found' })
  }
})

app.get('/admin/courses', authenticateAdminRoute, (req, res) => {
  res.json({ COURSES })
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

// User Routes

app.post('/users/signup', (req, res) => {
  const user = req.body
  const existingUser = USERS.find(u => u.username === user.username)
  if (existingUser) {
    res.status(403).json({ message: 'User already exists' })
  } else {
    USERS.push(user)
    fs.writeFileSync('./files/users.json', JSON.stringify(USERS))

    const token = generateUserToken(user)
    res.json({ message: 'User created successfully', token })
  }
})

app.post('/users/login', (req, res) => {
  const { username, password } = req.headers
  const user = USERS.find(
    u => u.username === username && u.password === password
  )
  if (user) {
    const token = generateUserToken({ username })
    res.json({ message: 'Logged in Successfully', token })
  } else {
    res.status(403).json({ message: 'Invalid username or password' })
  }
})

app.get('/users/courses', authenticateUserRoute, (req, res) => {
  let publishedCourses = COURSES.filter(c => c.published)
  res.json({ message: 'Published Courses', courses: publishedCourses })
})

app.post('/users/courses/:courseId', authenticateUserRoute, (req, res) => {
  const course = COURSES.find(c => c.id === parseInt(req.params.courseId))
  if (course) {
    const user = USERS.find(u => u.username === req.user.username)
    if (user) {
      if (!user.purchasedCourses) {
        user.purchasedCourses = []
      }
      user.purchasedCourses.push(course)
      fs.writeFileSync('./files/users.json', JSON.stringify(USERS))
      res.json({ message: 'Course purchased successfully' })
    } else {
      res.status(403).json({ message: 'User not found' })
    }
  } else {
    res.status(404).json({ message: 'Course not found' })
  }
})

app.get('/users/purchasedCourses', authenticateUserRoute, (req, res) => {
  const user = USERS.find(u => u.username === req.user.username)
  if (user) {
    res.json({ purchasedCourses: user.purchasedCourses || [] })
  } else {
    res.status(403).json({ message: 'User not found!!' })
  }
})

app.listen(3000, () => {
  console.log('Port Succesfully Deployed for Backend')
})

/*
Course structure to present in req body
{ 
    "title": 'course title',
    "description": 'course description',
    "price": 5000,
    "imageLink": 'https://linktoimage.com',
    "published": true
}

*/
