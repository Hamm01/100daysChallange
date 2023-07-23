import axios from 'axios'
import Paper from '@mui/material/Paper'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { useEffect, useState } from 'react'
import { TOKEN_KEY } from './App'
import { backendUrl } from './App'
import { useNavigate } from 'react-router-dom'

export default function Courses() {
  const [courses, setCourses] = useState([])

  useEffect(() => {
    axios
      .get(`${backendUrl}/admin/courses`, {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem(TOKEN_KEY)
        }
      })
      .then(callback)

    function callback(response) {
      console.log(response)
      if (response.status == 200 && response.data.courses) {
        setCourses(response.data.courses)
      }
    }
  }, [])

  return (
    <div className="Course-Container">
      {courses.map(course => {
        return <Coursecomponent course={course} />
      })}
    </div>
  )
}

export function Coursecomponent(props) {
  const navigate = useNavigate()
  const course = props.course
  return (
    <Paper elevation={0} style={{ display: 'flex', flexDirection: 'column' }}>
      <Typography variant="h6" style={{ marginBottom: 5, textAlign: 'center' }}>
        {course.title}
      </Typography>
      <Typography
        variant="subtitle1"
        style={{ marginBottom: 5, textAlign: 'center' }}
      >
        {course.description}
      </Typography>
      <img src={course.imageLink} style={{ width: '100%', height: '70%' }} />
      <Button
        variant="contained"
        size="medium"
        style={{
          alignSelf: 'center',
          paddingLeft: '30px',
          paddingRight: '30px',
          marginTop: 10,
          marginBottom: 10
        }}
        onClick={() => {
          navigate(`/course/${course._id}`)
        }}
      >
        Edit
      </Button>
    </Paper>
  )
}
