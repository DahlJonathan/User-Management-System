import { useState } from 'react'
import MainPage from './pages/mainpage.tsx'


function App() {
  return (
    <div>
      <div className="flex items-center justify-center m-10 border py-10 text-3xl font-bold bg-red-500">
        <a>User Management System</a>
      </div>
      <MainPage />
    </div>
  )
}

export default App
