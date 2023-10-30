import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useAuthContext } from "./hooks/useAuthContext"


import Home from './pages/home/Home'
import Login from './pages/login/Login'
import Signup from './pages/signup/Signup'
import Profile from './pages/profile/Profile'
import Search from './pages/search/Search'
import Devs from './pages/devs/Devs'
import Portfolio from './pages/portfolio/Portfolio'
import Navbar from './components/navbar/Navbar'


const Router = () => {
    const { user, authIsReady } = useAuthContext()


  return (
    <>
    {authIsReady && <BrowserRouter>
        <Navbar />
        <Routes>
            <Route 
                path='/'
                element={<Home />}
            />
            <Route 
                path='/login'
                element={!user ? <Login /> : <Navigate to='/' />}
            />
            <Route 
                path='/signup'
                element={!user ? <Signup /> : <Navigate to='/profile' />}
            />
            <Route 
                path='/profile'
                element={user ? <Profile /> : <Navigate to='/'/>}
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
    </BrowserRouter>}
    </>
  )
}

export default Router