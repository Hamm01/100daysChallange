import Paper from '@mui/material/Paper'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { useState } from 'react'
import axios from 'axios'
import { TOKEN_KEY, BASEURL } from '../App'

export default function Signin() {
  const [username, SetUsername] = useState('')
  const [password, SetPassword] = useState('')
  return (
    <div>
      <div>
        <Typography
          variant="h6"
          style={{ marginBottom: 10, textAlign: 'center' }}
        >
          Welcome Back | Sign-in Below
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
          style={{
            marginBottom: 10
          }}
          onChange={e => {
            SetUsername(e.target.value)
          }}
        />
        <TextField
          fullWidth
          id="password"
          label="Password"
          variant="outlined"
          type={'password'}
          style={{
            marginBottom: 10
          }}
          onChange={e => {
            SetPassword(e.target.value)
          }}
        />
        <Button variant="contained" size="large" onClick={SigninRequest}>
          Signin
        </Button>
      </Paper>
    </div>
  )
  async function SigninRequest() {
    const URL = `${BASEURL}/admin/login`
    const response = await axios.post(URL, {
      username,
      password
    })
    const data = response.data
    localStorage.setItem(TOKEN_KEY, data.token)
    window.location = '/'
  }
}
