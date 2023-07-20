import Paper from '@mui/material/Paper'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { TOKEN_KEY } from './Signup'
import { useState } from 'react'

export default function AddCourse() {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [imagelink, setImageLink] = useState('')
  return (
    <div>
      <div>
        <Typography
          variant="h6"
          style={{ marginBottom: 10, textAlign: 'center' }}
        >
          Welcome back| Add Courses Page
        </Typography>
      </div>
      <Paper
        elevation={3}
        sx={{
          width: 400,
          height: 300,
          paddingLeft: 5,
          paddingRight: 5,
          paddingTop: 5
        }}
      >
        <TextField
          fullWidth
          id="title1"
          label="Title"
          variant="outlined"
          type={'text'}
          onChange={e => {
            setTitle(e.target.value)
          }}
          style={{
            marginBottom: 10
          }}
        />
        <TextField
          fullWidth
          id="description1"
          label="Description"
          variant="outlined"
          type={'text'}
          onChange={e => {
            setDescription(e.target.value)
          }}
          style={{
            marginBottom: 10
          }}
        />
        <TextField
          fullWidth
          id="imagelink"
          label="Image Link"
          variant="outlined"
          type={'text'}
          onChange={e => {
            setImageLink(e.target.value)
          }}
          style={{
            marginBottom: 10
          }}
        />
        <Button variant="contained" size="large" onClick={courseRequest}>
          Create Course
        </Button>
      </Paper>
    </div>
  )

  async function courseRequest() {
    const URL = 'http://localhost:3000/admin/courses'
    const token = localStorage.getItem(TOKEN_KEY)
    const response = await fetchRequest(URL, token)
    const data = await response.json()
    alert('Course Succesfully created!!')
  }

  function fetchRequest(url, token) {
    return fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        title: title,
        description: description,
        price: 4999,
        imageLink: imagelink,
        published: true
      }),
      headers: {
        'content-type': 'application/json',
        authorization: 'Bearer ' + token
      }
    })
  }
}
