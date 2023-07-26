import React, { useEffect, useRef, useState } from 'react'
import {Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
import HomePageServices from './HomePageServices';
const LoginModal = (props) => {
  const toggle = () => {props.setToggle(!props.isOpen)}
  const [values, setValues] = useState(['', '', '', '']);
  const [activeInput, setActiveInput] = useState(0);
  const [userName, setUserName]=useState();
  const inputRefs = useRef([]);
  const [isUserExisted, setUserExisted] = useState(undefined);
  const [userPassword, setUserPassword] = useState();
  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  // const handleInputChange = (e, index) => {
  //   const { value } = e.target;
  //   setValues((prevValues) => {
  //     const newValues = [...prevValues];
  //     newValues[index] = value;
  //     // console.log("Values",newValues)
  //     setUserPassword(newValues);

  //     return newValues;
  //   });

  //   if (value && index < inputRefs.current.length - 1) {
  //     setActiveInput(index + 1);
  //     inputRefs.current[index + 1].focus();
  //   }
  // };

  // const handleInputKeyDown = (e, index) => {
  //   if (e.key === 'Backspace' && !values[index] && index > 0) {
  //     setActiveInput(index - 1);
  //     inputRefs.current[index - 1].focus();
  //   }
  // };

  // const renderInputs = () => {
  //   const inputs = [];

  //   for (let i = 0; i < 4; i++) {
  //     const isActive = activeInput === i;

  //     inputs.push(
  //       <input
  //         key={i}
  //         ref={(ref) => (inputRefs.current[i] = ref)}
  //         type="text"
  //         className='password-box'
  //         maxLength={1}
  //         value={values[i]}
  //         onChange={(e) => handleInputChange(e, i)}
  //         onKeyDown={(e) => handleInputKeyDown(e, i)}
  //         style={{
  //           border: isActive ? '2px solid blue' : '1px solid gray',
  //         }}
  //       />
  //     );
  //   }

  //   return inputs;
  // };
  const handleOnBlur = () =>{
    const getDetails = HomePageServices().getUSerDetails({"userName":userName}).then((resp)=>{
      console.log(resp?.data?.dataObject?.username,"resppppp")
      setUserExisted(resp?.data?.dataObject?.username)
    }).catch((err)=>{
      console.log(err)
    })
  }
  // console.log("userPassword",userPassword)
  const hadleSignUp = () =>{
    const requestObj={"userName":userName,"password":userPassword}
    const signUp = HomePageServices().createUser(requestObj).then((resp)=>{
      if(resp?.data?.dataObject =="success"){
        props.setToggle(!props.isOpen)
      }
    }).catch((err)=>{
      console.log(err);
    })
  }
  const handleLogin = () =>{
    console.log(userName,userPassword)
    const requestObj ={"userName":userName,"password":userPassword}
    const getLogin = HomePageServices().getLogin(requestObj).then((resp)=>{
      console.log(resp)
      if(resp?.data?.dataObject == "success"){
        props.setToggle(!props.isOpen)
      }
    }).catch((err)=>{
      console.log(err)
    })
  }
  return (
    <Modal isOpen={props.isOpen} className='modal-dialog-centered' toggle={toggle}>
    <ModalHeader toggle={toggle}>Hello User Welcome to Reservation</ModalHeader>
    <ModalBody>
      <div className='mb-3'>
        <label className='w-25'>User Name </label>
        <input type="text" onChange={(e)=>{setUserName(e.target.value)}} onBlur={handleOnBlur}/><br/>
      </div>
        <div>
          <label className='w-25'>Password</label>
          {/* {renderInputs()} */}
          <input type="text" onChange={(e) => setUserPassword(e.target.value)} minLength="6" maxlength="10" />
        </div>
    </ModalBody>
    {isUserExisted !== undefined && (
  <ModalFooter>
    {isUserExisted ? (
      <button className='btn btn-outline-danger' onClick={handleLogin}>Login</button>
    ) : (
      <button className='btn btn-danger' onClick={hadleSignUp}>SignUp</button>
    )}
  </ModalFooter>
)}
    </Modal>
  )
}

export default LoginModal