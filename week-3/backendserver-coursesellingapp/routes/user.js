const express = require('express')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')

const { Course, User } = require('../db')
const {
  generateUserToken,
  authenticateUserRoute
} = require('../middleware/authUser')

const router = express.Router()

router.post('/signup', async (req, res) => {
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

router.post('/login', async (req, res) => {
  const { username, password } = req.headers
  const user = await User.findOne({ username, password })
  if (user) {
    const token = generateUserToken({ username })
    res.json({ message: 'Logged in successfully', token })
  } else {
    res.status(403).json({ message: 'Invalid username or password' })
  }
})

router.get('/courses', authenticateUserRoute, async (req, res) => {
  const courses = await Course.find({ published: true })
  res.json({ courses })
})

router.post('/courses/:courseId', authenticateUserRoute, async (req, res) => {
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
})

router.get('/purchasedCourses', authenticateUserRoute, async (req, res) => {
  const user = await User.findOne({ username: req.user.username }).populate(
    'purchasedCourses'
  )
  if (user) {
    res.json({ purchasedCourses: user.purchasedCourses || [] })
  } else {
    res.status(403).json({ message: 'User not found' })
  }
})

module.exports = router
