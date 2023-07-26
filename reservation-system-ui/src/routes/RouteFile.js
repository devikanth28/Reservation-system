import React from 'react'
import {Routes,Route, BrowserRouter} from 'react-router-dom';
import UpdateBusDetails from '../admin/UpdateBusDetails';
import BusList from '../client/components/BusList';
import Home from '../client/components/Home';
const RouteFile = () => {
  return (
    <BrowserRouter>
        <Routes>
            <Route exact path="/" element={<Home/>}/>
            <Route exact path ="/busList" element={<BusList/>}/>
            <Route exact path='/updateBusDetails' element={<UpdateBusDetails/>}/>
        </Routes>
    </BrowserRouter>
  )
}

export default RouteFile