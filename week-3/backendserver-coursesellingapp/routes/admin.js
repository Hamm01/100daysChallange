const express = require('express')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')

const { Course, Admin } = require('../db')
const {
  generateAdminToken,
  authenticateAdminRoute
} = require('../middleware/authAdmin')

const router = express.Router()

router.get('/me', authenticateAdminRoute, async (req, res) => {
  const admin = await Admin.findOne({ username: req.admin.username })
  if (!admin) {
    res.status(403).json({ msg: 'Admin doesnt exist' })
    return
  }
  res.json({
    username: admin.username
  })
})

router.post('/signup', async (req, res) => {
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

router.post('/login', async (req, res) => {
  const { username, password } = req.body
  const admin = await Admin.findOne({ username, password })

  if (!admin) {
    res.status(401).json({ message: 'Unauthorized Access' })
  } else {
    const token = generateAdminToken({ username })
    res.status(200).json({ message: 'Logged in Succesfully', token })
  }
})
router.post('/courses', authenticateAdminRoute, async (req, res) => {
  const course = new Course(req.body)
  await course.save()
  res
    .status(201)
    .json({ message: 'Course Created Succesfully', courseId: course.id })
})

router.put('/courses/:courseId', authenticateAdminRoute, async (req, res) => {
  const courseId = req.params.courseId
  const course = await Course.findByIdAndUpdate(courseId, req.body, {
    new: true
  })
  if (course) {
    res.send({ message: 'Course Successfully updated', courseId: courseId })
  } else {
    res.status(404).json({ message: 'Course not found' })
  }
})

router.get('/courses', authenticateAdminRoute, async (req, res) => {
  const courses = await Course.find({})
  res.json({ courses })
})

router.get('/course/:courseId', authenticateAdminRoute, async (req, res) => {
  const courseId = req.params.courseId
  const course = await Course.findById(courseId)
  res.json({ course })
})

module.exports = router
