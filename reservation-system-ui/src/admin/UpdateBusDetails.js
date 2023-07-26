import React, { useEffect, useState } from 'react'
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from "reactstrap";
import HomePageServices from '../client/components/HomePageServices';
import {useNavigate } from 'react-router-dom';
const UpdateBusDetails = () => {
    const [selectDate, setSelectDate] = useState('');
    const [isDropDownOpen, setDropDownOpen] = useState();
    const [selectedBus, setSelectedBus] = useState();
    const [availBuses, setAvailBuses] = useState([]);
    const [msg, setMsg]=useState(undefined);
    const navigate=useNavigate();
    useEffect(()=>{
        getBuses()
    },[])
    const getBuses = ()=>HomePageServices().getAllBuses().then((resp)=>{
        console.log(resp)
        setAvailBuses(resp.data.dataObject)
    }).catch((err)=>{
        console.log(err);
    })
    const minDate = new Date().toISOString().substring(0, 10);
    const maxDate = new Date();
     maxDate.setDate(maxDate.getDate() + 30)
     let maxDateString = maxDate.toISOString().substring(0, 10);
     const selectedDate = (e) =>{
         console.log("e.target.value",e.target.value);
         setSelectDate(e.target.value);
     }
     const toggleDropDown = () =>{
         setDropDownOpen(!isDropDownOpen);
     }
     const handleSelectedItem = (busName) =>{
        setSelectedBus(busName);
     }
     const selectedBusObj = availBuses?.find((item)=>item.name == selectedBus);
     console.log("selectedBusObj",selectedBusObj)
     const updateBusDetails = (busId, travellingDate) =>{
         const obj ={"busId":busId,"travellingDate":travellingDate}
         console.log("obj",obj)
         const detailObj = HomePageServices().setUpdateDetails(obj).then((resp)=>{
             console.log(resp?.data?.dataObject,"resp?.dataObject")
             setMsg(resp?.data?.dataObject);
         }).catch((err)=>{
             console.log(err)
         })
         console.log("detilObj",detailObj)
     }
    //  console.log(detailObj,"detailObj")
  return (
      <React.Fragment>
          <div>UpdateBusDetails {selectDate}</div>
          <div className='d-flex'>
              <input type="date" min={minDate} max={maxDateString} onChange={(e) => selectedDate(e)} />
              <Dropdown isOpen={isDropDownOpen} toggle={toggleDropDown}>
                  <DropdownToggle caret color="white" className="btn-block text-truncate border-0" >
                      {selectedBus || "Select The Bus"}
                  </DropdownToggle>
                  <DropdownMenu>
                      {availBuses?.map((eachBusItem) => {
                          return (
                              <React.Fragment>
                                  <DropdownItem onClick={() => { handleSelectedItem(eachBusItem.name) }}>
                                      <span>{eachBusItem.name}</span>
                                  </DropdownItem>
                              </React.Fragment>
                          )
                      })}
                  </DropdownMenu>
              </Dropdown>
          </div>
          <input type="text" value={selectedBusObj?.src} placeholder="from"/>
          <input type="text" value={selectedBusObj?.dest} placeholder="To"/>
          <button onClick={(e)=>{updateBusDetails(selectedBusObj?.busId, selectDate)}}>update Bus Details</button>
          {msg == "success" && <button className='bg-danger' onClick={navigate("/")}>updated</button>}
      </React.Fragment>
  )
}

export default UpdateBusDetails