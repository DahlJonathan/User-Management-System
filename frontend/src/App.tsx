import bgImage from './assets/banner.jpg';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './auth/login.tsx';
import MainPage from './pages/mainpage.tsx';

function App() {
  return (
    <div className="bg-blue-100 min-h-screen overflow-x-hidden">
      <div
        className="flex items-center justify-center m-2 border py-20 text-3xl font-bold text-white bg-cover bg-center"
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        <a>User Management System</a>
      </div>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/main" element={<MainPage />} />
          <Route path="/" element={<Login />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
