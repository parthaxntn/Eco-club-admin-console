import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import { Admin, Resource } from 'react-admin'
import jsonServerProvider from "ra-data-json-server";
import Home from './pages/Home';
import { BrowserRouter, Route } from 'react-router-dom'
import { Routes } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar/>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
