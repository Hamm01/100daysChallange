import './App.css'
import { Routes, Route } from 'react-router-dom'
import { RecoilRoot, useSetRecoilState } from 'recoil'
import axios from 'axios'
import Signup from './components/Signup'
import Appbar from './components/Appbar'
import Signin from './components/Signin'
import AddCourse from './components/AddCourse'
import Courses from './components/Courses'
import Course from './components/Course'
import Landing from './components/Landing'
import { userState } from './store/atoms/user.js'
import { useEffect } from 'react'
export const TOKEN_KEY = 'CourseSellingApptoken'
export const BASEURL = 'http://localhost:3000'
function App() {
  return (
    <RecoilRoot>
      <div className="appContainer">
        <div className="appbar">
          <Appbar />
          <InitUser />
        </div>
        <div className="signup-container">
          <Routes>
            <Route path="/signin" element={<Signin />}></Route>
            <Route path="/signup" element={<Signup />}></Route>
            <Route path="/addcourse" element={<AddCourse />}></Route>
            <Route path="/courses" element={<Courses />}></Route>
            <Route path="/course/:courseId" element={<Course />}></Route>
            <Route path="/" element={<Landing />}></Route>
          </Routes>
        </div>
      </div>
    </RecoilRoot>
  )
}
function InitUser() {
  const setuser = useSetRecoilState(userState)
  async function init() {
    try {
      const response = await axios.get(`${BASEURL}/admin/me/`, {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem(TOKEN_KEY)
        }
      })
      console.log(response.data)
      if (response.data.username) {
        setuser({
          isLoading: false,
          userEmail: response.data.username
        })
      } else {
        setuser({
          isLoading: false,
          userEmail: null
        })
      }
    } catch (e) {
      setuser({
        isLoading: false,
        userEmail: null
      })
      console.error(e)
    }
  }

  useEffect(() => {
    init()
  }, [])

  return <></>
}

export default App
