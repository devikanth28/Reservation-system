import React, { useEffect, useState } from 'react'
import HomePageServices from './HomePageServices';
import { AsyncTypeahead } from 'react-bootstrap-typeahead';
import {Collapse } from "reactstrap";
import {Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
import LoginModal from './LoginModal';
import {useNavigate } from 'react-router-dom';
// import CarSeat from '../images/carseaticon.svg';
const Home = (props) => {
    const [fromPoint, setFromPoint] = useState('');
    const [toPoint, setToPoint] = useState('');
    const [selectDate, setSelectedDate] = useState('');
    const [responseObject, setResponseObject] = useState([]);
    const [srcFilteredOptions, setSrcFilteredOptions] = useState([]);
    const [destFilteredOptions, setDestFilteredOptions] = useState([]);
    const [availBuses, setAvailBuses] = useState();
    const [handleCollapsed, setHandleCollapsed] =useState(90);
    const [totalSeats, setTotalSeats] = useState();
    const [selectedSeats, setSelectedSeats] = useState([]);
    const [errorModal, setErrorModal] = useState(false);
    const [loginModal, setLoginModal] = useState(false);
    const [passengerDetails, setPassengerDetails] = useState([]);
    const [email, setEmail] = useState('');
  const [isValid, setIsValid] = useState(false);
    const navigate = useNavigate();
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
            setAvailBuses(resp.data.dataObject);

        }).catch((err)=>{
            console.log(err)
        })
    }

    const getSeats = (busId,travellingDate) =>{
            const seatObj = {"busId":busId,"travellingDate":travellingDate}
            console.log(seatObj)
        let availSeats = HomePageServices().getSeats(seatObj).then((resp)=>{
            console.log(resp.data.dataObject,"resp.data.dataObject");
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
    const toggle = () => {setErrorModal(!errorModal)};
    const LimitBookingToFourSeats = () =>{
        return(
            <React.Fragment>
                <Modal isOpen={errorModal} className='modal-dialog-centered' toggle={toggle}>
                <ModalHeader toggle={toggle}>Selected Seats {selectedSeats.join(', ')}</ModalHeader>
                <ModalBody>Don't selecte More Than 4 at a Time</ModalBody>
                </Modal>
            </React.Fragment>
        )
    }
   const handleSelectedSeats = (seatId) => {
       const isExistedSeatId = selectedSeats.indexOf(seatId);
       if(isExistedSeatId > -1){
           let selectedSeatsCopy = [...selectedSeats]
           selectedSeatsCopy.splice(isExistedSeatId,1);
           setSelectedSeats(selectedSeatsCopy)
       }
       else if(selectedSeats.length > 3){
        //    alert("You Can't Book More Than 4 Seats at a Time")
        setErrorModal(true)
    }
    else{
           setSelectedSeats([...selectedSeats, seatId]);
       }
   }
//    bus seats
//    function renderSeats(totalSeats) {
//         console.log(selectedSeats,"selectedSeats")
//         const seats = [];
//         console.log("dinesh",totalSeats);
//         console.log(seats)
//         for (let row = 0; row < 6; row++) {
//           for (let col = 0; col < 12; col++) {
//             if ((row != 2 || col == 11) && (row != 3 || col == 11)) {
//               seats.push(
//                 <button id={totalSeats[row][col]?.seatId} className={`bus-seat ${totalSeats[row*col]?.bookedStatus === 'B' ? 'Booked' : selectedSeats.includes(totalSeats[row*col]?.seatId) ? 'select' : ``}`} onClick={()=>{handleSelectedSeats(totalSeats[row*col]?.seatId)}}>
//                    {/* totalSeats[row*col] */}
//                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" version="1.1" viewBox="0 0 700 700">
//                          <g>
//                              <path d="m568.4 104.72c-3.3594-17.359-19.039-30.238-38.078-30.238h-198.8c-18.48 0-34.16 12.879-38.078 30.238h-164.08c-17.359 0-31.359 14-31.359 30.801v287.84c0 16.801 14 30.801 31.359 30.801h164.08c3.3594 17.922 19.039 31.922 38.078 31.922h198.24c17.359 0 32.48-11.762 36.961-27.441 19.602-2.2383 34.719-18.48 34.719-38.078l0.007812-278.32c1.1172-19.039-13.441-35.277-33.043-37.52zm-236.88-17.359h198.24c11.199 0 21.281 7.2812 24.078 17.922-15.121 3.3594-26.879 16.238-29.68 31.359h-192.64c-14 0-25.199-11.199-25.199-24.641s11.199-24.641 25.199-24.641zm-38.078 352.24h-164.08c-9.5195 0-17.922-7.8398-17.922-17.359l0.003906-287.28c0-9.5195 7.8398-17.359 17.922-17.359h164.08c2.8008 18.48 19.039 32.48 38.078 32.48h192.64v258.16l-192.64-0.003907c-19.039 0-34.719 13.441-38.078 31.363zm237.44 31.918h-199.36c-14 0-25.199-11.199-25.199-24.641s11.199-24.641 25.199-24.641h192.64c1.1211 16.801 12.879 30.238 28.559 34.719-2.7969 8.4023-11.758 14.562-21.84 14.562zm58.242-52.078c0 13.441-11.199 24.641-25.199 24.641s-25.199-11.199-25.199-24.641l-0.003906-277.2c0-13.441 11.199-24.641 25.199-24.641s25.199 11.199 25.199 24.641z" />
//                          </g>
//                      </svg>
//                 </button>
//               );
//             } else {
//               seats.push(
//                 <span disabled className="bus-seat">
                  
//                 </span>
//               );
//             }
//           }
//         }
    
//         return seats;
//       }
function renderSeats(totalSeats){
  return  totalSeats.map((item)=>{
    //   console.log("item",item.seatId)
        return  <button className={`bus-seat ${item?.bookedStatus === 'B' ? 'Booked' : selectedSeats.includes(item.seatId) ? 'select' : ``}`} onClick={()=>{handleSelectedSeats(item?.seatId)}}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" version="1.1" viewBox="0 0 700 700">
                                  <g>
                                      <path d="m568.4 104.72c-3.3594-17.359-19.039-30.238-38.078-30.238h-198.8c-18.48 0-34.16 12.879-38.078 30.238h-164.08c-17.359 0-31.359 14-31.359 30.801v287.84c0 16.801 14 30.801 31.359 30.801h164.08c3.3594 17.922 19.039 31.922 38.078 31.922h198.24c17.359 0 32.48-11.762 36.961-27.441 19.602-2.2383 34.719-18.48 34.719-38.078l0.007812-278.32c1.1172-19.039-13.441-35.277-33.043-37.52zm-236.88-17.359h198.24c11.199 0 21.281 7.2812 24.078 17.922-15.121 3.3594-26.879 16.238-29.68 31.359h-192.64c-14 0-25.199-11.199-25.199-24.641s11.199-24.641 25.199-24.641zm-38.078 352.24h-164.08c-9.5195 0-17.922-7.8398-17.922-17.359l0.003906-287.28c0-9.5195 7.8398-17.359 17.922-17.359h164.08c2.8008 18.48 19.039 32.48 38.078 32.48h192.64v258.16l-192.64-0.003907c-19.039 0-34.719 13.441-38.078 31.363zm237.44 31.918h-199.36c-14 0-25.199-11.199-25.199-24.641s11.199-24.641 25.199-24.641h192.64c1.1211 16.801 12.879 30.238 28.559 34.719-2.7969 8.4023-11.758 14.562-21.84 14.562zm58.242-52.078c0 13.441-11.199 24.641-25.199 24.641s-25.199-11.199-25.199-24.641l-0.003906-277.2c0-13.441 11.199-24.641 25.199-24.641s25.199 11.199 25.199 24.641z" />
                                  </g>
                              </svg>
                         </button>
    })
}

const bookSelectedSeats = (busId,date) =>{
    const requestObj = ({"busId":busId,"date":date,"selectedSeats":selectedSeats.join(',')});
    console.log("RequestObj",requestObj)
    const bookSeats = HomePageServices().getBookSeats(requestObj).then((resp)=>{
        console.log(resp);
    }).catch((err)=>{
        console.log(err)
    })
}
const handlePassengerDetails = (index, field, value) => {
    const updatedDetails = [...passengerDetails];
    updatedDetails[index] = {
      ...updatedDetails[index],
      [field]: value
    };
    setPassengerDetails(updatedDetails);
  }
  console.log("passengerDetails",passengerDetails)
  const validateEmail = (email) => {
    // Regular expression pattern for email validation
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    console.log(pattern.test(email),"mmmmmmmm")
    return pattern.test(email);
  };
  const handleEmailChange = (event) => {
    const { value } = event.target;
    setEmail(value);
    setIsValid(validateEmail(value));
  };
  return (
      <div className='container-fluid container-lg'>
          <button onClick={()=>navigate('/updateBusDetails')}>Update Bus Details</button>
          <div className='d-flex align-items-center' style={{"height":"10vh"}}>
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
              <button className='rounded-pill ms-2 btn btn-danger' onClick={()=>getBuses()}>searchbuses</button>
              <button className='btn btn-outline-danger ms-5' onClick={()=>{setLoginModal(true)}} >Login/SignUp</button>
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
              {availBuses?.length > 0 && 
              <React.Fragment>
                {availBuses.map((item)=>{
                  return(
                    <React.Fragment>
                      <div id={'#' + item.busId} onClick={()=>{getSeats(item.busId,item.travellingDate)}} className='fw-bold'>{item.name}</div>
                      <Collapse isOpen={'#' + handleCollapsed === '#' + item.busId} id={'#' + item.busId}>
                      {totalSeats && <div className="bus-seat-layout">{renderSeats(totalSeats)}</div>}
                  {/* {console.log(totalSeats.bookedStatus,"totalSeats.bookedStatus")} */}
                  <div className='d-flex justify-content-center align-items-center'>
                      <p className='Booked-seat-Indication'></p>
                      <span className='me-4'>Booked</span>
                      {selectedSeats.length > 0 && <div className='align-items-center d-flex'>
                        <p className='selecte-seat-Indication'></p> <span>Selected</span>
                          </div>}
                  </div>
                  {selectedSeats.length > 0 && selectedSeats.map((item, index) => {
  return (
    <React.Fragment key={index}>
      <div className="d-flex">
        <div className="form-floating mb-3 w-10 me-3">
          <input
            type="number"
            className="form-control"
            value={item}
            disabled
          />
          <label htmlFor="seatNo">Seat No</label>
        </div>
        <div className="form-floating mb-3 w-25 me-3">
          <input
            type="text"
            className="form-control"
            placeholder="Enter Name"
            value={passengerDetails[index]?.name || ''}
            onChange={(e) =>
              handlePassengerDetails(index, 'name', e.target.value)
            }
          />
          <label htmlFor="name">Name</label>
        </div>
        <div className="form-floating mb-3 w-25 me-3">
          <input
            type="number"
            className="form-control"
            placeholder="Enter age"
            value={passengerDetails[index]?.age || ''}
            onChange={(e) =>
              handlePassengerDetails(index, 'age', e.target.value)
            }
          />
          
          <label htmlFor="age">Age</label>
        </div>
        <div className='align-items-center d-flex'>
        <p className='mb-0 me-2'>Gender</p>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              id={`male-${index}`}
              name={`gender-${index}`}
              checked={passengerDetails[index]?.gender === 'male'}
              onChange={() =>
                handlePassengerDetails(index, 'gender', 'male')
              }
            />
            <label className="form-check-label" htmlFor={`male-${index}`}>
              Male
            </label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              id={`female-${index}`}
              name={`gender-${index}`}
              checked={passengerDetails[index]?.gender === 'female'}
              onChange={() =>
                handlePassengerDetails(index, 'gender', 'female')
              }
            />
            <label className="form-check-label" htmlFor={`female-${index}`}>
              Female
            </label>
          </div>
        </div>
        
        </div>
      
    </React.Fragment>
  );
})}

                  {selectedSeats.length > 0 &&
                          <div className='d-flex justify-content-center'>
                            <div class="form-floating me-3">
                              <input type="email" class="form-control" id="email" placeholder="name@example.com" value={email} onChange={handleEmailChange}/>
                              <label for="email">Email address</label>
                            </div>
                            <button className='btn btn-danger' onClick={() => { bookSelectedSeats(availBuses.busId, availBuses.travellingDate) }}>Book Seat(s)</button>
                          </div>
                  }
              </Collapse>
                    </React.Fragment>
                  )
                })}
                  
                  </React.Fragment>
                  }  
                  {errorModal && <LimitBookingToFourSeats/>}
                  {loginModal && <LoginModal setToggle={setLoginModal} isOpen={loginModal}/>}     
          </div>
        <div
    />


      </div>
   
  )
}

export default Home