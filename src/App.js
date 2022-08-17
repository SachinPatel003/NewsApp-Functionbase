import './App.css';
import Navbar from './Components/Navbar';
import News from './Components/News';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'
import React, { useState } from 'react'

const App = ()=> {
  const [progress, setProgress] = useState(0)


    return (
            <BrowserRouter>
            <LoadingBar
                color='#f11946'
                progress={progress}
                height={5}
              />
              <Navbar/>
              
              <Routes>
                  <Route exact path="/" element={<News setProgress={setProgress} category="general" key={1} />} />
                  <Route exact path="/sport" element={<News setProgress={setProgress}  category="sports" key={2} />} />
                  <Route exact path="/health" element={<News setProgress={setProgress} category="health" key={3} />} />
                  <Route exact path="/bussiness" element={<News setProgress={setProgress} category="business" key={4} />} />
              </Routes>
            </BrowserRouter>
          );
}

export default App;