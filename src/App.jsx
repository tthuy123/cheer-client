import { useState } from 'react'
import './App.css'


import { BrowserRouter, Routes, Route} from 'react-router-dom';
import {Navigate} from 'react-router-dom';
import { useEffect } from 'react';


// import MainLayout from './components/layouts/MainLayout';
// import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import MenuBar from './components/common/MenuBar';

function App() {

  return (
    <>
    <BrowserRouter>
      <Routes>
        {/* <Route path='/' element={<MainLayout/>}>
          <Route index element={<HomePage/>}/> */}
          <Route path='/login' element={<LoginPage/>}/>
        {/* </Route> */}
          <Route path='/test' element={<MenuBar/>}/>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
