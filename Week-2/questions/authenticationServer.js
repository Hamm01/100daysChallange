const express = require('express')
const cors = require('cors')
const bodyparser = require('body-parser')
const app = express()

app.use(cors())
app.use(bodyparser.json())

let USERS = [] // Using in memory user array to store the data coming from incoming requests

app.post('/signup', (req, res) => {
  const user = req.body
  console.log(user)
  const ExistingUser = USERS.find(u => u.username === user.username)
  if (ExistingUser) {
    res.status(400).json({ message: 'Username already existed' })
  } else {
    const obj = {
      id: Date.now(),
      username: user.username,
      password: user.password,
      firstname: user.firstname,
      lastname: user.lastname
    }
    USERS.push(obj)
    res.status(201).json({ message: 'New user successfully created' })
  }
})

function userAuthentication(req, res, next) {
  const { username, password } = req.body
  const existingUser = USERS.find(
    u => u.username === username && u.password === password
  )
  if (existingUser) {
    next()
  } else {
    res.status(401).json({ message: 'Unauthorized Access' })
  }
}

app.post('/login', userAuthentication, (req, res) => {
  const existingUser = USERS.find(u => u.username === req.body.username)
  res.status(200).json({
    firstname: existingUser.firstname,
    lastname: existingUser.lastname,
    authToken: existingUser.id
  })
})

app.get('/data', (req, res) => {
  const { username, password } = req.headers
  const existingUser = USERS.find(
    u => u.username === username && u.password === password
  )
  if (existingUser) {
    res.status(200).json(USERS)
  } else {
    res.status(401).json({ message: 'Unauthorized access' })
  }
})

app.listen(3000, () => {
  console.log('Port succesfully deployed')
})

/*

{
    "username": "Himanish@gmail.com",
    "password": "stebinPRotexted",
    "firstname": "Himanish",
    "lastname": "Kochhar"
}


*/
