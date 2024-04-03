import React, { useState } from 'react'
import axios from 'axios'
export default function Signup() {
  const [values, setValues] = useState({
    name:'',
    email:'',
    password:''
  })

  const onHandleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };

  const onSubmitDetails = async(event) => {
    event.preventDefault()
    const register = await axios.post("http://localhost:3004/signup", values)
    console.log(register.data)
    setValues({
      name:'',
      email:'',
      password:''
    })
  }

  return (
    <>
        <div className="container">
            <h2>Sing Up పేరు</h2>
            <form onSubmit={onSubmitDetails}>
                <input type="text" onChange={onHandleChange} name="name" value={values.name} placeholder='Enter your name'/>
                <input type='email' onChange={onHandleChange} name="email" value={values.email} placeholder='Enter you Emial'/>
                <input type='password' onChange={onHandleChange} name="password" value={values.password} placeholder='Password'/>
                {/* <input type='number' name="number" placeholder='Enter your Mobile number'/> */}
                <button type='submit' className="button-85" role="button">Sign Up</button>
            </form>
        </div>
    </>
  )
}
