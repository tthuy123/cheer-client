import './App.css'


import { BrowserRouter, Routes, Route} from 'react-router-dom';


// import MainLayout from './components/layouts/MainLayout';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import CreateProgram from './pages/Training/Strength/CreateProgram';
import StrengthPage from './pages/Training/Strength/StrengthPage';

import TeamTrainingLog from './pages/Training/TeamTrainingLog';


import NewMeasurement from './pages/Measurement/NewMeasurement';
import ProgressChart from './components/Measurement/TeamData/ProgressChart';
import MeasurementBar from './components/Measurement/NewMeasurement/MeasurementBar';
import TrainingBar from './components/Training/TrainingBar';
import TopPerformancePage from './pages/Measurement/TopPerformancePage';
import TeamData from './pages/Measurement/TeamData';
import ProgramEditor from './pages/Training/Strength/ProgramEditor';
import ExerciseSessionPage from './pages/Training/Strength/ExcerciseSessionPage';

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
          <Route path='/training/strength/program' element={<ProgramEditor />} />
          <Route path='/training/strength/program/exercise' element={<ExerciseSessionPage />} />

          <Route path='/training/team-training-log' element={<TeamTrainingLog />} />
          <Route path='/measurement/new' element={<NewMeasurement />} />
          <Route path='/measurement/bar' element={<MeasurementBar />} />
          <Route path='/training/bar' element={<TrainingBar />} />
          <Route path="/measurement/top-performance-page" element={<TopPerformancePage />} />
          <Route path="/measurement/team-data" element={<TeamData />} />


          {/* <Route path='/test7' element={<CreateProgram />} /> */}
          <Route path='/test2' element={<DropSelectMeas />} />
          <Route path='/test4' element={<ProgressChart />} />


          
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
