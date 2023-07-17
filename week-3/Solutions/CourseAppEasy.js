// Without Jwt Course App Demonstration

const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()

app.use(cors())
app.use(bodyParser.json())

// In memory arrays to store the information of admins, users and courses
let ADMINS = []
let COURSES = []
let USERS = []

function adminAuthentication(req, res, next) {
  // this function is middleware to check the authetication request
  const { username, password } = req.headers
  const ExistingAdmin = ADMINS.find(
    u => u.username === username && u.password === password
  )
  if (ExistingAdmin) {
    next()
  } else {
    res.status(401).json({ message: 'Unauthorized Access' })
  }
}

// Admin Routes

app.post('/admin/signup', (req, res) => {
  const admin = req.body
  console.log(admin)
  const ExistingAdmin = ADMINS.find(a => a.username === admin.username)
  if (ExistingAdmin) {
    res.status(403).json({ message: 'Admin already existed' })
  } else {
    ADMINS.push(admin)
    res.status(201).json({ message: 'Admin successfully created' })
  }
})

app.post('/admin/login', adminAuthentication, (req, res) => {
  res.json({ message: 'Logged in successfully' })
})

app.post('/admin/courses', adminAuthentication, (req, res) => {
  let course = req.body
  course = { ...course, id: Date.now() }
  if (!course.title) {
    res.status(401).json({ message: 'Course info not provided' })
  } else {
    COURSES.push(course)
    res.json({ message: 'Course Succesfully created', courseId: course.id })
  }
})
app.put('/admin/courses/:courseId', adminAuthentication, (req, res) => {
  const courseId = parseInt(req.params.courseId)
  const course = COURSES.find(c => c.id === courseId)
  console.log(course)

  if (course) {
    Object.assign(course, req.body)
    res.json({ message: 'Course Updated Sucessfully' })
  } else {
    res.status(404).json({ message: 'Course not found' })
  }
})
app.get('/admin/courses', adminAuthentication, (req, res) => {
  res.json({ COURSES })
})

//Admin Routes end
function userAuthentication(req, res, next) {
  const { username, password } = req.headers
  const existingUser = USERS.find(
    u => u.username === username && u.password === password
  )
  if (existingUser) {
    next()
  } else {
    res.status(401).json({ message: 'Unauthorized Access' })
  }
}
// User routes Start

app.post('/users/signup', (req, res) => {
  const user = { ...req.body, purchasedCourses: [] }
  const existingUser = USERS.find(u => u.username === user.username)

  if (existingUser) {
    res.status(403).json({ message: 'User already Existed' })
  } else {
    USERS.push(user)
    res.json({ message: 'User succesfully Created' })
  }
})

app.post('/users/login', userAuthentication, (req, res) => {
  res.json({ message: 'User Logged in successfully' })
})

app.get('/users/courses', userAuthentication, (req, res) => {
  let publishedCourses = COURSES.filter(c => c.published)
  res.json({ message: 'Published Courses', courses: publishedCourses })
})

app.post('/users/courses/:courseId', userAuthentication, (req, res) => {
  const courseId = parseInt(req.params.courseId)
  const course = COURSES.find(c => c.id === courseId && c.published)
  if (course) {
    const user = USERS.find(u => u.username === req.headers.username)
    user.purchasedCourses.push(courseId)
    res.json({ message: 'Course Purchased Succesfuly' })
  } else {
    res.status(404).json({ message: 'Course Not found or nor Available' })
  }
})

app.get('/users/purchasedCourses', userAuthentication, (req, res) => {
  const user = USERS.find(u => u.username === req.headers.username)
  const purchasedCourses = COURSES.filter(c =>
    user.purchasedCourses.includes(c.id)
  )

  res.json({ purchasedCourses })
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
