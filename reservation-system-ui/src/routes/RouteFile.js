import React from 'react'
import {Routes,Route, BrowserRouter} from 'react-router-dom';
import BusList from '../client/components/BusList';
import Home from '../client/components/Home';
const RouteFile = () => {
  return (
    <BrowserRouter>
        <Routes>
            <Route exact path="/" element={<Home/>}/>
            <Route exact path ="/busList" element={<BusList/>}/>
        </Routes>
    </BrowserRouter>
  )
}

export default RouteFile