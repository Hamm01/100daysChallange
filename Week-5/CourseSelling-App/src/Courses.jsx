import Paper from '@mui/material/Paper'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { useEffect, useState } from 'react'
import { TOKEN_KEY } from './Signup'
export default function Courses() {
  const [courses, setCourses] = useState([])

  useEffect(() => {
    function callback1(data) {
      if (data.COURSES) {
        setCourses(data.COURSES)
      }
    }

    function callback(response) {
      response.json().then(callback1)
    }

    fetch('http://localhost:3000/admin/courses', {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem(TOKEN_KEY)
      }
    }).then(callback)
  }, [])

  return (
    <div className="Course-Container">
      {courses.map(course => {
        return <Coursecomponent course={course} />
      })}
    </div>
  )
}

function Coursecomponent(props) {
  const course = props.course
  return (
    <Paper elevation={3} style={{ overflow: 'hidden' }}>
      <Typography variant="h6" style={{ marginBottom: 5, textAlign: 'center' }}>
        {course.title}
      </Typography>
      <Typography
        variant="subtitle1"
        style={{ marginBottom: 5, textAlign: 'center' }}
      >
        {course.description}
      </Typography>
      <img src={course.imageLink} style={{ width: '100%', height: '80%' }} />
    </Paper>
  )
}
