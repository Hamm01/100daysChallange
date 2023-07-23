import axios from 'axios'
import Paper from '@mui/material/Paper'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { TOKEN_KEY, backendUrl } from './App'

export default function Course() {
  const { courseId } = useParams()
  let [course, setCourse] = useState(null)

  useEffect(() => {
    axios
      .get(`${backendUrl}/admin/course/${courseId}`, {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem(TOKEN_KEY)
        }
      })
      .then(callback)
    function callback(response) {
      console.log(response)
      if (response.data.course) {
        setCourse(response.data.course)
      }
    }
  }, [])

  if (!course) {
    return (
      <div
        style={{
          height: '100vh',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        loading...
      </div>
    )
  }

  return (
    <div>
      <GreyBox course={course} />
      <Grid container>
        <Grid item lg={8} md={12} sm={12}>
          <UpdateCourse course={course} setCourse={setCourse} />
        </Grid>
        <Grid item lg={4} md={12} sm={12}>
          <Coursetable course={course} />
        </Grid>
      </Grid>
    </div>
  )
}

function GreyBox(props) {
  return (
    <div className="grey-box-container">
      <Typography
        variant="h3"
        style={{ textAlign: 'center', fontWeight: 400, color: 'white' }}
      >
        {props.course.title}
      </Typography>
    </div>
  )
}

function Coursetable(props) {
  const course = props.course
  return (
    <div className="course-badge-container">
      <Paper elevation={0} style={{ paddingBottom: '5px' }}>
        <img
          src={course.imageLink}
          width={'100%'}
          style={{ borderRadius: '0.5rem' }}
        />
        <div style={{ paddingLeft: 5 }}>
          <Typography variant="h5" style={{ marginBottom: 5 }}>
            {course.title}
          </Typography>
          <Typography variant="subtitle1" style={{ color: 'grey' }}>
            Price
          </Typography>
          <Typography variant="subtitle1" style={{ marginBottom: 5 }}>
            Rs. {course.price}
          </Typography>
        </div>
      </Paper>
    </div>
  )
}

function UpdateCourse(props) {
  const { courseId } = useParams()
  let course = props.course
  const [title, setTitle] = useState(course.title)
  const [description, setDescription] = useState(course.description)
  const [imagelink, setImageLink] = useState(course.imageLink)
  const [price, setPrice] = useState(course.price)
  return (
    <div className="update-course-container">
      <Paper
        elevation={0}
        sx={{
          width: 600,
          paddingLeft: 5,
          paddingRight: 5,
          paddingTop: 5,
          paddingBottom: 5,
          marginTop: '180px'
        }}
      >
        <div>
          <Typography variant="subtitle1" style={{ marginBottom: 10 }}>
            Update Course Details
          </Typography>
        </div>
        <TextField
          fullWidth
          value={title}
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
          value={description}
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
          value={imagelink}
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
          value={price}
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
        <Button variant="contained" size="medium" onClick={courseRequest}>
          Update Course
        </Button>
      </Paper>
    </div>
  )

  async function courseRequest() {
    const URL = `${backendUrl}/admin/courses/` + courseId
    const token = localStorage.getItem(TOKEN_KEY)
    const response = await axios.put(
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
    const updatedCourse = {
      title: title,
      description: description,
      price: price,
      imageLink: imagelink,
      published: true
    }
    props.setCourse(updatedCourse)
    console.log(response)
    alert('Course Succesfully Updated!!')
  }
}
