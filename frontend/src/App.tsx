import bgImage from './assets/banner.jpg';
import MainPage from './pages/mainpage.tsx'

function App() {
  return (
    <div className="bg-blue-50 min-h-screen overflow-x-hidden">
      <div
        className="flex items-center justify-center m-2 border py-20 text-3xl font-bold text-white bg-cover bg-center"
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        <a>User Management System</a>
      </div>
      <MainPage />
    </div>
  )
}

export default App
