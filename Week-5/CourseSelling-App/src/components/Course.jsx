import axios from 'axios'
import Paper from '@mui/material/Paper'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { TOKEN_KEY, BASEURL } from '../App'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import { courseState } from '../store/atoms/course'
import {
  courseTitle,
  courseImage,
  isCourseLoading,
  coursePrice
} from '../store/selectors/course'

export default function Course() {
  const { courseId } = useParams()
  const setCourse = useSetRecoilState(courseState)
  const courseLoading = useRecoilValue(isCourseLoading)

  // let [course, setCourse] = useState(null)

  useEffect(() => {
    axios
      .get(`${BASEURL}/admin/course/${courseId}`, {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem(TOKEN_KEY)
        }
      })
      .then(callback)
    function callback(response) {
      console.log(response)
      if (response.data.course) {
        setCourse({ course: response.data.course, isLoading: false })
      }
    }
  }, [])

  if (courseLoading) {
    return <>Loading...</>
  }

  return (
    <div>
      <GreyBox />
      <Grid container>
        <Grid item lg={8} md={12} sm={12}>
          <UpdateCourse />
        </Grid>
        <Grid item lg={4} md={12} sm={12}>
          <Coursetable />
        </Grid>
      </Grid>
    </div>
  )
}

function GreyBox() {
  const title = useRecoilValue(courseTitle)
  return (
    <div className="grey-box-container">
      <Typography
        variant="h3"
        style={{ textAlign: 'center', fontWeight: 400, color: 'white' }}
      >
        {title}
      </Typography>
    </div>
  )
}

function Coursetable() {
  const title = useRecoilValue(courseTitle)
  const imageLink = useRecoilValue(courseImage)
  const price = useRecoilValue(coursePrice)
  return (
    <div className="course-badge-container">
      <Paper elevation={0} style={{ paddingBottom: '5px' }}>
        <img
          src={imageLink}
          width={'100%'}
          style={{ borderRadius: '0.5rem' }}
        />
        <div style={{ paddingLeft: 5 }}>
          <Typography variant="h5" style={{ marginBottom: 5 }}>
            {title}
          </Typography>
          <Typography variant="subtitle1" style={{ color: 'grey' }}>
            Price
          </Typography>
          <Typography variant="subtitle1" style={{ marginBottom: 5 }}>
            Rs. {price}
          </Typography>
        </div>
      </Paper>
    </div>
  )
}

function UpdateCourse() {
  const { courseId } = useParams()
  const [courseDetails, setcourse] = useRecoilState(courseState)
  const [title, setTitle] = useState(courseDetails.course.title)
  const [description, setDescription] = useState(
    courseDetails.course.description
  )
  const [imagelink, setImageLink] = useState(courseDetails.course.imageLink)
  const [price, setPrice] = useState(courseDetails.course.price)
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
    const URL = `${BASEURL}/admin/courses/` + courseDetails.course._id
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
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token
        }
      }
    )
    let updatedCourse = {
      _id: courseDetails.course._id,
      title: title,
      description: description,
      price: price,
      imageLink: imagelink,
      published: true
    }
    setcourse({ isLoading: false, course: updatedCourse })
  }
}
