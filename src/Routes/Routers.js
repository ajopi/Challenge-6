import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { Cars } from '../Pages/Cars/Cars'
import { Dashboard } from '../Pages/Dashboard/Dashboard'
import { Home } from '../Pages/Home/Home'
import HomeCustomer from '../Pages/Homepage/HomeCustomer'
import { Login } from '../Pages/Login/Login'
import { Register } from '../Pages/Register/Register'

export const Routers = () => {
  return (
    <Routes>
        <Route path='/' element={<Register/>} />
        <Route path='home' element={<Home/>} />
        <Route path='dashboard' element={<Dashboard/>} />
        <Route path='cars' element={<Cars/>} />
        <Route path='homepagecust' element={<HomeCustomer/>} />
        <Route path='login' element={<Login/>} />
        
    </Routes>
    )
}
