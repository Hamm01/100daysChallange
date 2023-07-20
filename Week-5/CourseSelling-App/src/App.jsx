import './App.css'
import { Routes, Route } from 'react-router-dom'
import Signup from './Signup'
import Appbar from './Appbar'
import Signin from './Signin'
import AddCourse from './AddCourse'
import Courses from './Courses'
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
        </Routes>
      </div>
    </div>
  )
}

export default App
