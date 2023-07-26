import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Home from './pages/Home/Home'
import Login from './pages/login/Login'
import Signup from './pages/signup/Signup'
import Profile from './pages/profile/Profile'
import Search from './pages/search/Search'
import Devs from './pages/devs/Devs'
import Portfolio from './pages/portfolio/Portfolio'
import Navbar from './components/navbar/Navbar'


const Router = () => {
  return (
    <BrowserRouter>
    <Navbar />
        <Routes>
            <Route 
                path='/'
                element={<Home />}
            />
            <Route 
                path='/login'
                element={<Login />}
            />
            <Route 
                path='/signup'
                element={<Signup />}
            />
            <Route 
                path='/profile'
                element={<Profile />}
            />
            <Route 
                path='/search'
                element={<Search />}
            />
            <Route 
                path='/devs'
                element={<Devs />}
            />
            <Route 
                path='/portfolio/:id'
                element={<Portfolio />}
            />

        </Routes>
    </BrowserRouter>
  )
}

export default Router