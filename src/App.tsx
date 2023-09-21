import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Register from './pages/Register'

function App() {
  return (
    <div className="App flex flex-col md:justify-start w-screen h-screen bg-image-hero bg-cover bg-no-repeat">
      <Navbar />
      <Routes>
        <Route path="/" Component={Home} />
        <Route path="register" Component={Register} />
      </Routes>
    </div>
  )
}

export default App
