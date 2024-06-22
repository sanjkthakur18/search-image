import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import SearchPage from './pages/SearchPage'
import Login from './pages/Login'
import PhotoContextProvider from './store/PhotoContext'
import SingleImage from './pages/SingleImage'
import './App.css'

const App = () => {

  return (
    <PhotoContextProvider>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Login />} />
            <Route path='/search-page' element={<Layout />}>
              <Route index element={<SearchPage />} />
            </Route>
            <Route path='/edit/:id' element={<SingleImage />} />
          </Routes>
        </BrowserRouter>
    </PhotoContextProvider>
  )
}

export default App
