import Paper from '@mui/material/Paper'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { useState } from 'react'
import axios from 'axios'
import { TOKEN_KEY, BASEURL } from '../App'

export default function Signup() {
  const [username, SetUsername] = useState()
  const [password, SetPassword] = useState()
  return (
    <div>
      <div>
        <Typography
          variant="h6"
          style={{ marginBottom: 10, textAlign: 'center' }}
        >
          Welcome to Course Selling Website | Signup Below
        </Typography>
      </div>
      <Paper
        elevation={3}
        sx={{
          width: 400,
          height: 200,
          paddingLeft: 5,
          paddingRight: 5,
          paddingTop: 5
        }}
      >
        <TextField
          fullWidth
          id="username"
          label="Username"
          variant="outlined"
          type={'text'}
          onChange={e => {
            SetUsername(e.target.value)
          }}
          style={{
            marginBottom: 10
          }}
        />
        <TextField
          fullWidth
          id="password"
          label="Password"
          variant="outlined"
          type={'password'}
          onChange={e => {
            SetPassword(e.target.value)
          }}
          style={{
            marginBottom: 10
          }}
        />
        <Button variant="contained" size="large" onClick={SignupRequest}>
          Signup
        </Button>
      </Paper>
    </div>
  )
  async function SignupRequest() {
    const URL = `${BASEURL}/admin/signup`
    const response = await axios.post(URL, {
      username,
      password
    })
    const data = response.data
    localStorage.setItem(TOKEN_KEY, data.token)
    window.location = '/'
  }
}
