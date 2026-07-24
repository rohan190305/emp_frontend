import React from 'react'
import './App.css'
import { Route, Routes, BrowserRouter } from 'react-router-dom'
import { Login } from './Pages/Login'
import { Register } from './Pages/Register'
import Dashboard from './Pages/Dashboard'
import Emp from './Pages/Emp'
import Department from './Pages/Department'
import State from './Pages/State'
import City from './Pages/City'

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login/>} />
          <Route path='/auth/register' element={<Register/>} />
          <Route path='/dashboard' element={<Dashboard/>} />
          <Route path='/emp' element={<Emp/>} />
          <Route path='/emp/:id' element={<Emp/>} />
          <Route path='/department' element={<Department/>} />
          <Route path='/state' element={<State/>} />
          <Route path='/city' element={<City/>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App