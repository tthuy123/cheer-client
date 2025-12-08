import './App.css'


import { BrowserRouter, Routes, Route} from 'react-router-dom';


// import MainLayout from './components/layouts/MainLayout';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import CreateProgram from './pages/Training/Strength/CreateProgram';
import StrengthPage from './pages/Training/Strength/StrengthPage';
import TeamTrainingLog from './pages/Training/TeamTrainingLog';


import ProgressChart from './components/Measurement/TeamData/ProgressChart';
import MeasurementBar from './components/Measurement/NewMeasurement/MeasurementBar';
import TrainingBar from './components/Training/TrainingBar';
import TopPerformancePage from './pages/Measurement/TopPerformancePage';
import TeamData from './pages/Measurement/TeamData';
import ProgramEditor from './pages/Training/Strength/ProgramEditor';
import ExerciseSessionPage from './pages/Training/Strength/ExcerciseSessionPage';
import NewMeasurement from './pages/Measurement/NewMeasurement';

import NewCheckOff from './pages/Checkoff/NewCheckOff.jsx';
import CheckOffReview from './pages/Checkoff/CheckOffReview.jsx';
import CheckOffTeamData from './pages/Checkoff/CheckOffTeamData.jsx';

import { useSelector } from "react-redux";
import { Navigate } from 'react-router-dom';

import ProtectedRoute from './components/ProtectedRoute'; // Điều chỉnh path cho đúng
function App() {
  const token = useSelector((s) => s.auth.token);
  console.log("token in app", token);
  

  return (
    <>
    <BrowserRouter>
      <Routes>
          {/* 1. ĐƯỜNG DẪN ĐĂNG NHẬP KHÔNG CẦN BẢO VỆ */}
          <Route path='/login' element={<LoginPage />} />

          {/* 2. CÁC ĐƯỜNG DẪN CẦN BẢO VỆ (SỬ DỤNG ProtectedRoute) */}
          
          {/* Tuyến gốc / và /home đều được bảo vệ và chỉ cần 1 trong 2 */}
          <Route index element={<Navigate to="/home" replace />} /> {/* Chuyển / sang /home */}

          <Route path='/home' element={
              <ProtectedRoute>
                <HomePage />
              </ProtectedRoute>
          } />
          
          <Route path='/training/strength' element={
              <ProtectedRoute>
                <StrengthPage />
              </ProtectedRoute>
          } />

          <Route path='/training/strength/new' element={
              <ProtectedRoute>
                <CreateProgram />
              </ProtectedRoute>
          } />
          
          {/* Áp dụng tương tự cho TẤT CẢ các trang nội bộ còn lại: */}
          <Route path='/training/strength/program' element={<ProtectedRoute><ProgramEditor /></ProtectedRoute>} />
          <Route
            path='/programs/:programId/exercises/:programExerciseId'
            element={<ProtectedRoute><ExerciseSessionPage /></ProtectedRoute>}
          />
          <Route path='/training/team-training-log' element={<ProtectedRoute><TeamTrainingLog /></ProtectedRoute>} />
          
          /* Measurement */
          <Route path='/measurement/new' element={<ProtectedRoute><NewMeasurement /></ProtectedRoute>} />
          <Route path='/measurement/bar' element={<ProtectedRoute><MeasurementBar /></ProtectedRoute>} />
          <Route path='/training/bar' element={<ProtectedRoute><TrainingBar /></ProtectedRoute>} />
          <Route path="/measurement/top-performance-page" element={<ProtectedRoute><TopPerformancePage /></ProtectedRoute>} />
          <Route path="/measurement/team-data" element={<ProtectedRoute><TeamData /></ProtectedRoute>} />

          /* Checkoff */
          <Route path='/check-off/new' element={<ProtectedRoute><NewCheckOff /></ProtectedRoute>} />
          <Route path='/check-off/review' element={<ProtectedRoute><CheckOffReview /></ProtectedRoute>} />
          <Route path='/check-off/team-data' element={<ProtectedRoute><CheckOffTeamData /></ProtectedRoute>} />

      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
