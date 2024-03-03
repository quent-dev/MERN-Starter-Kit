import React from 'react'
import Home from 'features/Home';
import SignUp from 'features/SignUp';
import Login from 'features/Login';
import Profile from 'features/Profile';
import NavBar from './features/NavBar';
import { Routes, Route } from 'react-router-dom';
import { UserProvider } from 'contexts/user.context';




const App = () => {

  return (
    <div className="flex flex-col justify-center align-center w-full">
      <UserProvider>
      <NavBar />
        <Routes>
          <Route exact path="/" element={<Home />}></Route>
          <Route path="/auth" element={<SignUp />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/profile" element={<Profile />}></Route>
        </Routes>
      </UserProvider>
    </div>
  )
}

export default App