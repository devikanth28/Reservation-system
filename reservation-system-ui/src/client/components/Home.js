import React, { useEffect, useState } from 'react'
import HomePageServices from './HomePageServices';
import { AsyncTypeahead } from 'react-bootstrap-typeahead';
const Home = () => {
    const [fromPoint, setFromPoint] = useState('');
    const [toPoint, setToPoint] = useState('');
    const [selectDate, setSelectedDate] = useState('');
    const [responseObject, setResponseObject] = useState([]);
    const [srcFilteredOptions, setSrcFilteredOptions] = useState([]);
    const [destFilteredOptions, setDestFilteredOptions] = useState([])
    useEffect(()=>{
      getPlaces();      
    },[])
    const getPlaces = () =>{
        HomePageServices().getPlaces().then((resp)=>{
            setResponseObject(resp.data.dataObject)
            console.log("")
        }).catch((err) => {
            console.log("errrrr:", err);
        });
    }
    
    const getSrcAutoSuggestions = (e) =>{
        const cities=responseObject.map((item)=>item.city);
        setSrcFilteredOptions(cities.filter((city)=>city.toLowerCase().includes(e.toLowerCase())))

    }
    const DistObj = responseObject.filter((item)=>item.city == fromPoint.toString());
    console.log("DistObj",DistObj)
    const getDestAutoSuggestions = (e) =>{
        let destCities =[];
        if(DistObj[0]){
            destCities = responseObject.filter((item)=>item.district != DistObj[0].district)
        }
        console.log("destCities", destCities)
        const filterOptions = destCities.map((item)=>item.city)
        console.log(filterOptions,"filterOptions")
        setDestFilteredOptions(filterOptions.filter((city)=>city.toLowerCase().includes(e.toLowerCase())))
    }
    const minDate = new Date().toISOString().substring(0, 10);
    const maxDate = new Date();
     maxDate.setDate(maxDate.getDate() + 30)
     let maxDateString = maxDate.toISOString().substring(0, 10);
    const selectedDate = (e) =>{
        console.log(e.target.value)
        setSelectedDate(e.target.value)
    }
    const getBuses = () =>{
        const srcPoint = fromPoint.toString();
        const destPoint = toPoint.toString();
        const date = selectDate.toString();
        const REQUEST_OBJ = {"from":srcPoint, "to":destPoint, "date":date}
        console.log(REQUEST_OBJ)

    }
  return (
      <div className='container'>
          <div className='d-flex align-items-center justify-content-center' style={{"height":"100vh"}}>
              <AsyncTypeahead
                  id="LocalityName"
                  filterBy={() => true}
                  minLength={2}
                  maxResults={100}
                  onSearch={(e) => { getSrcAutoSuggestions(e) }}
                  onChange={(selected) => { setFromPoint(selected) }}
                  options={srcFilteredOptions}
                  className="col-4"
                  placeholder='enter from point'
              >
              </AsyncTypeahead>
              <AsyncTypeahead
                  id="LocalityName"
                  filterBy={() => true}
                  minLength={2}
                  maxResults={100}
                  onSearch={(e) => { getDestAutoSuggestions(e) }}
                  onChange={(selected) => { setToPoint(selected) }}
                  options={destFilteredOptions}
                  className="col-4"
                  placeholder='enter to point'
              >
              </AsyncTypeahead>
              <input type="date" min={minDate} max={maxDateString} onChange={(e)=>selectedDate(e)}/>
              <button className='rounded-pill ms-2' onClick={()=>getBuses()}>searchbuses</button>
          </div>
      </div>
   
  )
}

export default Home