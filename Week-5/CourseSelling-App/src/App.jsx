import './App.css'
import { Routes, Route } from 'react-router-dom'
import Signup from './components/Signup'
import Appbar from './components/Appbar'
import Signin from './components/Signin'
import AddCourse from './components/AddCourse'
import Courses from './components/Courses'
import Course from './components/Course'
import Landing from './components/Landing'
export const TOKEN_KEY = 'CourseSellingApptoken'
export const backendUrl = 'http://localhost:3000'
function App() {
  return (
    <div className="appContainer">
      <div className="appbar">
        <Appbar />
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
  )
}

export default App
