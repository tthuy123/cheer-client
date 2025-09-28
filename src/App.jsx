import { useState } from 'react'
import './App.css'


import { BrowserRouter, Routes, Route} from 'react-router-dom';
import {Navigate} from 'react-router-dom';
import { useEffect } from 'react';


// import MainLayout from './components/layouts/MainLayout';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import MenuBar from './components/common/MenuBar';
import TrainingBar from './components/Training/TrainingBar';
import StrengthBar from './components/Training/StrengthBar';
import SearchBar from './components/Training/SearchBar';
import ProgramCard from './components/Training/ProgramCard';
import CreateCard from './components/Training/CreateCard';
import CheerTrainer from './pages/Training/Strength/CheerTrainer';
import CreateProgram from './pages/Training/Strength/CreateProgram';
function App() {

  return (
    <>
    <BrowserRouter>
      <Routes>
        {/* <Route path='/' element={<MainLayout/>}>
          <Route index element={<HomePage/>}/> */}
          <Route path='/login' element={<LoginPage />} />
          <Route path='/home' element={<HomePage />} />
          {/* </Route> */}
          {/* các test cho các ví dụ */}
          <Route path='/test' element={<MenuBar/>} />
          <Route path='/test1' element={<TrainingBar />} />
          <Route path='/test2' element={<StrengthBar />} />
          <Route path='/test3' element={<SearchBar />} />
          <Route path='/test4' element={<ProgramCard />} />
          <Route path='/test5' element={<CreateCard />} />
          <Route path='/test6' element={<CheerTrainer />} />
          <Route path='/test7' element={<CreateProgram />} />

          
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
