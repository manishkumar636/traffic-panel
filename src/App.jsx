import { Fragment } from 'react'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './Auth/Login';
import Billingdetails from './User/Billingdetails';


function App() {

  return (
    <Fragment>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/billingdetails" exact element={<Billingdetails />} />
        </Routes>
      </BrowserRouter>
    </Fragment>
  )
}

export default App
