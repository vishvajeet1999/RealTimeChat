import React, { useState } from 'react'
import axios from 'axios'
import {BrowserRouter as Router, Routes, Route, NavLink} from 'react-router-dom'

function Signup() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

const handleSubmit = e =>{
    e.preventDefault()

    axios.post('http://localhost:3001/user/signup', {name, email, password}).then(data =>{
        console.log(data)
    })
}


  return (
    <form style={{width: "40%"}} className="text-center">
        <h3>Sign Up</h3>
        <div className="mb-3">
            <label>Name</label>
            <input type="text" value={name} placeholder="Vishva..." className="form-control" onChange={e => setName(e.target.value)}  />
            
        </div>
        <div>
            <label>Email</label>
            <input type="text" value={email} placeholder="Hey@gmail.com..." className="form-control" onChange={e => setEmail(e.target.value)}  />
            
        </div>
        <div>
            <label>Password</label>
            <input type="text" value={password} placeholder="password" className='form-control' onChange={e=> setPassword(e.target.value)}  />
            
        </div>

        <div className="d-grid">
          <button type="submit" onClick={handleSubmit} className="btn btn-primary">
            Sign Up
          </button>
        </div>
        
        {/* <button type='submit' onClick={handleSubmit}> Sign Up</button> */}
        <div>

        <p className="forgot-password text-right">
          Already have an Account? <NavLink to="/signin">Signin</NavLink>
        </p>

        {/* <span>Already have an account?</span>
            <NavLink to="/signin">Signin</NavLink> */}
        
        </div>
    </form>
  )
}

export default Signup