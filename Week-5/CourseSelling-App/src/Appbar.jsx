import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { TOKEN_KEY } from './Signup'

export default function Appbar() {
  const navigate = useNavigate()
  const [username, setUsername] = useState(null)
  useEffect(() => {
    function callback1(data) {
      if (data.username) {
        setUsername(data.username)
      }
    }

    function callback(response) {
      response.json().then(callback1)
    }

    fetch('http://localhost:3000/admin/me', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem(TOKEN_KEY)
      }
    }).then(callback)
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
          <Typography variant="subtitle1">{username.split('@')[0]}</Typography>
          <Button
            variant="text"
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
