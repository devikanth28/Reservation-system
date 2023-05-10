import React from 'react'
import {Routes,Route, BrowserRouter} from 'react-router-dom';
import Home from '../client/components/Home';
const RouteFile = () => {
  return (
    <BrowserRouter>
        <Routes>
            <Route exact path="/" element={<Home/>}/>
        </Routes>
    </BrowserRouter>
  )
}

export default RouteFile