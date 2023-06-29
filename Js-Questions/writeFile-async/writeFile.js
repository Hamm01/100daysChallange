const fs = require('fs')

const content = 'Ok lets see we are updating or not fd.txt'

fs.writeFile('fd.txt', content, 'utf-8', contentAfterupdating)

function contentAfterupdating(err) {
  if (err) {
    console.error(err)
  }
  console.log('Succefully written the file')
}
