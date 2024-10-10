import { Fragment } from 'react'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './Auth/Login';
import Admindash from './Admin/Admindash';
import Userdetails from './User/Userdetails';


function App() {

  return (
    <Fragment>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/admindash" element={<Admindash />} />
          <Route path="/userdetails" exact element={<Userdetails />} />
        </Routes>
      </BrowserRouter>
    </Fragment>
  )
}

export default App
