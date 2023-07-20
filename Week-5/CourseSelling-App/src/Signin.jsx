import Paper from '@mui/material/Paper'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
export default function Signin() {
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
        />
        <Button variant="contained" size="large">
          Signin
        </Button>
      </Paper>
    </div>
  )
}
