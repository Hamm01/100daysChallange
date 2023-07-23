import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { TOKEN_KEY } from './App'
import axios from 'axios'
import { backendUrl } from './App'

export default function Appbar() {
  const navigate = useNavigate()
  const [username, setUsername] = useState(null)
  useEffect(() => {
    axios
      .get(`${backendUrl}/admin/me/`, {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem(TOKEN_KEY)
        }
      })
      .then(callback)

    function callback(response) {
      if (response.status == 200 && response.data.username) {
        setUsername(response.data.username)
      }
    }
  }, [])

  if (username) {
    return (
      <div className="appbar-container">
        <Typography variant="h6">CourseSellingApp</Typography>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <Button
            onClick={() => {
              navigate('/addcourse')
            }}
            style={{ marginRight: 20 }}
          >
            Add course
          </Button>
          <Button
            onClick={() => {
              navigate('/courses')
            }}
            style={{ marginRight: 20 }}
          >
            Courses
          </Button>
          <Button
            variant="contained"
            size="medium"
            onClick={() => {
              // navigate('/signup')
              localStorage.removeItem(TOKEN_KEY)
              window.location = '/'
            }}
            style={{ marginLeft: 10 }}
          >
            Logout
          </Button>
        </div>
      </div>
    )
  }
  return (
    <div className="appbar-container">
      <Typography variant="h6">CourseSellingApp</Typography>
      <div style={{}}>
        <Button
          variant="text"
          size="medium"
          onClick={() => {
            navigate('/signup')
          }}
          style={{ marginRight: 5 }}
        >
          Signup
        </Button>
        <Button
          variant="text"
          size="medium"
          onClick={() => {
            navigate('/signin')
          }}
        >
          Signin
        </Button>
      </div>
    </div>
  )
}
