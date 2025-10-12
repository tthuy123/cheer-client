import './App.css'


import { BrowserRouter, Routes, Route} from 'react-router-dom';


// import MainLayout from './components/layouts/MainLayout';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import CreateProgram from './pages/Training/Strength/CreateProgram';
import StrengthPage from './pages/Training/Strength/StrengthPage';

import TeamTrainingLog from './pages/Training/TeamTrainingLog';

function App() {

  return (
    <>
    <BrowserRouter>
      <Routes>
          <Route index element={<HomePage/>}/>
          <Route path='/login' element={<LoginPage />} />
          <Route path='/home' element={<HomePage />} />
          <Route path='/training/strength' element={<StrengthPage />} />
          <Route path='/training/strength/new' element={<CreateProgram />} />
          <Route path='/training/team-training-log' element={<TeamTrainingLog />} />


          {/* <Route path='/test7' element={<CreateProgram />} /> */}

          
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
