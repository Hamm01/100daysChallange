const jwt = require('jsonwebtoken')
const USER_SECRET = 'S3cr3t-key'

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

module.exports = {
  generateUserToken,
  authenticateUserRoute
}
