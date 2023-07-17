const express = require('express')
const fs = require('fs')
const cors = require('cors')
const path = require('path')
const app = express()

app.use(cors())
app.get('/files', (req, res) => {
  fs.readdir(path.join(__dirname, './files/'), (err, files) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to retrieve files' })
    }
    res.json(files)
  })
})

app.get('/file/:filename', (req, res) => {
  const filepath = path.join(__dirname, './files/', req.params.filename)
  console.log(filepath)
  fs.readFile(filepath, 'utf8', (err, data) => {
    if (err) {
      return res.status(404).send('File not found')
    }
    res.send(data)
  })
})
app.get('/', (req, res) => {
  res.send('Himanish')
})

app.all('*', (req, res) => {
  res.status(404).send('Route not found')
})

app.listen(3000, err => {
  console.log('app started at 3000')
})
// module.exports = app
