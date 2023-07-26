import Paper from '@mui/material/Paper'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { TOKEN_KEY, BASEURL } from '../App'
import { useState } from 'react'
import axios from 'axios'

export default function AddCourse() {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [imagelink, setImageLink] = useState('')
  const [price, setPrice] = useState('')
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
          minHeight: 300,
          paddingLeft: 5,
          paddingRight: 5,
          paddingTop: 5,
          paddingBottom: 5
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
        <TextField
          fullWidth
          id="price"
          label="Price"
          variant="outlined"
          type={'text'}
          onChange={e => {
            setPrice(e.target.value)
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
    const URL = `${BASEURL}/admin/courses/`
    const token = localStorage.getItem(TOKEN_KEY)
    const response = await axios.post(
      URL,
      {
        title: title,
        description: description,
        price: price,
        imageLink: imagelink,
        published: true
      },
      {
        headers: {
          Authorization: 'Bearer ' + token
        }
      }
    )
    console.log(response)
    alert('Course Succesfully created!!')
  }
}
