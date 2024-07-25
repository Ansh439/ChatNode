import React from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './pages/Home'
import Signup from './pages/Signup'
import CheckEmail from './pages/CheckEmail'
import CheckPassword from './pages/CheckPassword'
import MessagePage from './components/MessagePage'



export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />}>
          <Route path=':userId' element={<MessagePage />} />
        </Route>
        <Route path='/signup' element={<Signup />} />
        <Route path='/email' element={<CheckEmail />} />
        <Route path='/password' element={<CheckPassword />} />
      </Routes>
    </BrowserRouter>
  )
}
