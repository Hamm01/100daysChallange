import React from 'react'
import { Grid, Typography } from '@mui/material'
import Button from '@mui/material/Button'
import { useNavigate } from 'react-router-dom'

export default function Landing() {
  const navigate = useNavigate()
  return (
    <div>
      <Grid
        container
        style={{
          padding: '5vw'
        }}
        columnSpacing={{ xs: 1, sm: 2, md: 3, lg: 8 }}
      >
        <Grid item xs={12} md={6} lg={6}>
          <div style={{ marginTop: 100 }}>
            <Typography variant={'h2'}>Course Selling App Admin</Typography>
            <Typography variant={'h5'}>
              A place to learn, earn and grow
            </Typography>
            <div style={{ display: 'flex', marginTop: 20 }}>
              <div style={{ marginRight: 10 }}>
                <Button
                  size={'large'}
                  variant={'contained'}
                  onClick={() => {
                    navigate('/signup')
                  }}
                >
                  Signup
                </Button>
              </div>
              <div>
                <Button
                  size={'large'}
                  variant={'contained'}
                  onClick={() => {
                    navigate('/signin')
                  }}
                >
                  Signin
                </Button>
              </div>
            </div>
          </div>
          <div></div>
        </Grid>
        <Grid item xs={12} md={6} lg={6} style={{ marginTop: 20 }}>
          <img
            src={
              'https://img.freepik.com/premium-vector/young-male-teacher-lesson-blackboard-classroom_9026-58.jpg'
            }
            width={'100%'}
          />
        </Grid>
      </Grid>
    </div>
  )
}
