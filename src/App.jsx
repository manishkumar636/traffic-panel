import { Fragment } from 'react'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './Auth/Login';
import Billingdetails from './User/Billingdetails';
import Admindash from './Admin/Admindash';


function App() {

  return (
    <Fragment>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/admindash" element={<Admindash />} />
          <Route path="/userdetails" exact element={<Billingdetails />} />
        </Routes>
      </BrowserRouter>
    </Fragment>
  )
}

export default App
