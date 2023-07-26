import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { TOKEN_KEY } from '../App'

import { BASEURL } from '../App'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { userState } from '../store/atoms/user'
import { userEmailState } from '../store/selectors/userEmail'
import { isUserLoading } from '../store/selectors/isUserLoading'

export default function Appbar() {
  const navigate = useNavigate()
  const userLoading = useRecoilValue(isUserLoading)
  const userEmail = useRecoilValue(userEmailState)
  const setUser = useSetRecoilState(userState)

  if (userLoading) {
    return <></>
  }

  if (userEmail) {
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
              setUser({
                isLoading: false,
                userEmail: null
              })
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
