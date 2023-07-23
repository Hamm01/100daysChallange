const jwt = require('jsonwebtoken')

const ADMIN_SECRET = 'S3cr3t'

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
        return res.sendStatus(403)
      }
      req.admin = admin
      next()
    })
  } else {
    return res.sendStatus(401)
  }
}

module.exports = {
  generateAdminToken,
  authenticateAdminRoute
}
