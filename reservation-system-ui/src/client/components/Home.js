import React, { useEffect, useState } from 'react'
import HomePageServices from './HomePageServices';
import { AsyncTypeahead } from 'react-bootstrap-typeahead';
import { Link } from 'react-router-dom';
import { Card, CardBody, Collapse } from "reactstrap";
// import CarSeat from '../images/carseaticon.svg';
const Home = () => {
    const [fromPoint, setFromPoint] = useState('');
    const [toPoint, setToPoint] = useState('');
    const [selectDate, setSelectedDate] = useState('');
    const [responseObject, setResponseObject] = useState([]);
    const [srcFilteredOptions, setSrcFilteredOptions] = useState([]);
    const [destFilteredOptions, setDestFilteredOptions] = useState([]);
    const [availBuses, setAvailBuses] = useState();
    const [handleCollapsed, setHandleCollapsed] =useState(90);
    const [totalSeats, setTotalSeats] = useState();
    const [seatClass, setSeatClass] =useState("NotBooked");
    const [selectedSeats, setSelectedSeats] = useState([]);
    const [selectedSeatIds, setSelectedseatIds] = useState();
    useEffect(()=>{
      getPlaces();      
    },[])
    const getPlaces = () =>{
        HomePageServices().getPlaces().then((resp)=>{
            setResponseObject(resp.data.dataObject)
        }).catch((err) => {
            console.log("errrrr:", err);
        });
    }
    
    const getSrcAutoSuggestions = (e) =>{
        const cities=responseObject.map((item)=>item.city);
        setSrcFilteredOptions(cities.filter((city)=>city.toLowerCase().includes(e.toLowerCase())))

    }
    const DistObj = responseObject.filter((item)=>item.city == fromPoint.toString());
    const getDestAutoSuggestions = (e) =>{
        let destCities =[];
        if(DistObj[0]){
            destCities = responseObject.filter((item)=>item.district != DistObj[0].district)
        }
        const filterOptions = destCities.map((item)=>item.city)
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
        const OBJ = {"from":srcPoint, "to":destPoint, "date":date}
        let avlBuses = HomePageServices().getBuses(OBJ).then((resp)=>{
            console.log("resp.data.dataObject[0]",resp.data.dataObject[0])
            setAvailBuses(resp.data.dataObject[0]);

        }).catch((err)=>{
            console.log(err)
        })
    }

    const getSeats = (busId,travellingDate) =>{
            const seatObj = {"busId":busId,"travellingDate":travellingDate}
            console.log(seatObj)
        let availSeats = HomePageServices().getSeats(seatObj).then((resp)=>{
            console.log(resp,"resp.data.dataObject");
            setTotalSeats(resp.data.dataObject);
            console.log("totalSeats",resp.data.dataObject)
            if(handleCollapsed == busId){
                setHandleCollapsed(234)
            }
            else{
                setHandleCollapsed(busId)
            }
        }).catch((err)=>{
            console.log(err);
        })
    }
   const handleSelectedSeats = (seatNo) => {
       setSeatClass("select");
       const isExistedSeatId = selectedSeats.indexOf(seatNo);
       if(isExistedSeatId > -1){
            selectedSeats.splice(isExistedSeatId,1)
       }
       else{
           setSelectedSeats([...selectedSeats, seatNo]);
       }
   }
   console.log(selectedSeats,"selectedSeats")
    function renderSeats(totalSeats) {
        const seats = [];
        console.log(seats)
        for (let row = 1; row <= 6; row++) {
          for (let col = 1; col <= 12; col++) {
            if ((row != 3 || col == 12) && (row != 4 || col == 12)) {
              seats.push(
                <button className={`bus-seat ${totalSeats[row*col]?.bookedStatus === 'B' ? 'Booked' : selectedSeats.length>0 ? 'select' : ``}`} onClick={()=>{handleSelectedSeats(totalSeats[row*col]?.seatId)}}>
                   {/* totalSeats[row*col] */}
                   <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" version="1.1" viewBox="0 0 700 700">
                         <g>
                             <path d="m568.4 104.72c-3.3594-17.359-19.039-30.238-38.078-30.238h-198.8c-18.48 0-34.16 12.879-38.078 30.238h-164.08c-17.359 0-31.359 14-31.359 30.801v287.84c0 16.801 14 30.801 31.359 30.801h164.08c3.3594 17.922 19.039 31.922 38.078 31.922h198.24c17.359 0 32.48-11.762 36.961-27.441 19.602-2.2383 34.719-18.48 34.719-38.078l0.007812-278.32c1.1172-19.039-13.441-35.277-33.043-37.52zm-236.88-17.359h198.24c11.199 0 21.281 7.2812 24.078 17.922-15.121 3.3594-26.879 16.238-29.68 31.359h-192.64c-14 0-25.199-11.199-25.199-24.641s11.199-24.641 25.199-24.641zm-38.078 352.24h-164.08c-9.5195 0-17.922-7.8398-17.922-17.359l0.003906-287.28c0-9.5195 7.8398-17.359 17.922-17.359h164.08c2.8008 18.48 19.039 32.48 38.078 32.48h192.64v258.16l-192.64-0.003907c-19.039 0-34.719 13.441-38.078 31.363zm237.44 31.918h-199.36c-14 0-25.199-11.199-25.199-24.641s11.199-24.641 25.199-24.641h192.64c1.1211 16.801 12.879 30.238 28.559 34.719-2.7969 8.4023-11.758 14.562-21.84 14.562zm58.242-52.078c0 13.441-11.199 24.641-25.199 24.641s-25.199-11.199-25.199-24.641l-0.003906-277.2c0-13.441 11.199-24.641 25.199-24.641s25.199 11.199 25.199 24.641z" />
                         </g>
                     </svg>
                </button>
              );
            } else {
              seats.push(
                <span disabled className="bus-seat">
                  
                </span>
              );
            }
          }
        }
    
        return seats;
      }
  return (
      <div className='container'>
          <div className='d-flex align-items-center justify-content-center' style={{"height":"10vh"}}>
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
          <div>
              {/* for multiple buses */}
              {/* {availBuses && availBuses.map((bus)=>{
                  return(
                      <React.Fragment>
                      <div id={"#" + bus.busId} onClick={()=>getSeats(bus.busId,bus.travellingDate)}>{bus.name}</div>
                     <Collapse isOpen={'#' + handleCollapsed === '#' + bus.busId} id={'#' + bus.busId} className="d-flex justify-content-center">
                        <Card className='w-25 d-block'>
                            {totalSeats && totalSeats.length > 1 && totalSeats.map((seat)=>{
                                return(
                                    <React.Fragment>
                                       <button className={`${seat.bookedStatus == "B" ? "Booked" : seatClass}`} onClick={()=>{handleSelectedSeats(seat.seatNo)}}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" version="1.1" viewBox="0 0 700 700">
                                                <g>
                                                    <path d="m568.4 104.72c-3.3594-17.359-19.039-30.238-38.078-30.238h-198.8c-18.48 0-34.16 12.879-38.078 30.238h-164.08c-17.359 0-31.359 14-31.359 30.801v287.84c0 16.801 14 30.801 31.359 30.801h164.08c3.3594 17.922 19.039 31.922 38.078 31.922h198.24c17.359 0 32.48-11.762 36.961-27.441 19.602-2.2383 34.719-18.48 34.719-38.078l0.007812-278.32c1.1172-19.039-13.441-35.277-33.043-37.52zm-236.88-17.359h198.24c11.199 0 21.281 7.2812 24.078 17.922-15.121 3.3594-26.879 16.238-29.68 31.359h-192.64c-14 0-25.199-11.199-25.199-24.641s11.199-24.641 25.199-24.641zm-38.078 352.24h-164.08c-9.5195 0-17.922-7.8398-17.922-17.359l0.003906-287.28c0-9.5195 7.8398-17.359 17.922-17.359h164.08c2.8008 18.48 19.039 32.48 38.078 32.48h192.64v258.16l-192.64-0.003907c-19.039 0-34.719 13.441-38.078 31.363zm237.44 31.918h-199.36c-14 0-25.199-11.199-25.199-24.641s11.199-24.641 25.199-24.641h192.64c1.1211 16.801 12.879 30.238 28.559 34.719-2.7969 8.4023-11.758 14.562-21.84 14.562zm58.242-52.078c0 13.441-11.199 24.641-25.199 24.641s-25.199-11.199-25.199-24.641l-0.003906-277.2c0-13.441 11.199-24.641 25.199-24.641s25.199 11.199 25.199 24.641z" />
                                                </g>
                                            </svg>
                                       </button>
                                </React.Fragment>
                                )
                            })}
                        </Card>
                     </Collapse>
                      </React.Fragment>
                  )
              })} */}

              {/* single bus */}
              {availBuses && 
              <React.Fragment>
                  <div id={'#' + availBuses.busId} onClick={()=>{getSeats(availBuses.busId,availBuses.travellingDate)}}>{availBuses.name}</div>
                  <Collapse isOpen={'#' + handleCollapsed === '#' + availBuses.busId} id={'#' + availBuses.busId}>
                      {totalSeats && <div className="bus-seat-layout">{renderSeats(totalSeats)}</div>}
                  {/* {console.log(totalSeats.bookedStatus,"totalSeats.bookedStatus")} */}
              </Collapse>
                  </React.Fragment>
                  }           
          </div>
        <div
    />


      </div>
   
  )
}

export default Home