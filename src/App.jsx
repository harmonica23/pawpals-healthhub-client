import { useState, useEffect } from 'react'
import { Route, Routes } from 'react-router'
import Nav from './components/Nav'
import Register from './components/Register'
import SignIn from './components/SignIn'
import Home from './components/Home'
import Profile from './components/Profile'
import PetDetail from './components/PetDetail'
import './App.css'
import { CheckSession } from './services/auth'
import AddPetForm from './components/AddPetForm'
import DietWtForm from './components/DietWtForm'
import HealthDetailsForm from './components/HealthDetailsForm'
import EditPet from './components/EditPet'

const App = () => {
  const [user, setUser] = useState(null)

  const checkToken = async () => {
    const user = await CheckSession()
    setUser(user)
  }

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      checkToken()
    }
  }, [])

  const handleLogOut = () => {
    setUser(null)
    localStorage.clear()
  }

  return (
    <div>
      <header>
        <Nav
          user={user}
          handleLogOut={handleLogOut}
        />
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<SignIn setUser={setUser} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile user={user}/>} />
          <Route path="/pet/:id" element={<PetDetail />} />
          <Route path="/pet" element={<AddPetForm />} />
          <Route path="/pet/:id/diet" element={<DietWtForm />} />
          <Route path="/pet/:id/vetConsult" element={<HealthDetailsForm />} />
          <Route path="/pet/:id/vax" element={<HealthDetailsForm />} />
          <Route path="/pet/:id/med" element={<HealthDetailsForm />} />
          <Route path="/pet/:id/incident" element={<HealthDetailsForm />} />
          <Route path="/pet/edit/:id" element={<EditPet />} />
        </Routes>
      </main>
    </div >
  )
}

export default App
