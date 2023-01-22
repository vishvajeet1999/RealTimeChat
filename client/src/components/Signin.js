import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useCookies } from 'react-cookie';

function Signin() {

    const [email, setEmail] = useState('')
    const [password, setPassword ] = useState('')
    const [cookies, setCookie, removeCookies] = useCookies(['user']);
    const navigate = useNavigate()


    useEffect(() =>{
        
    })

    const handleSubmit = e =>{
        e.preventDefault()

        axios.post('http://localhost:3001/user/signin',
        {email, password}).then(data =>{
            console.log(data.data.token)
            setCookie('token', data.data.token, { path: '/',maxAge: 30*60*60*24 });
            console.log(cookies.token)
            navigate('/')
            
        }).catch(err => console.warn(err))
    }

  return (
    <form style={{width: "40%"}} className="text-center">
        <h3 >Sign In</h3>
        <div className="mb-3">
            <label>Email</label>
            <input type="text" className='form-control' placeholder='hey@gmail.com' value={email} onChange={e => setEmail(e.target.value)}  />
            
        </div>
        <div className="mb-3">
            <label>Password</label>
            <input type="password" className='form-control' placeholder='Password' value={password} onChange={e=> setPassword(e.target.value)}  />
            
        </div>
        <div className='d-grid'>
            <button type='submit' className='btn btn-primary'  onClick={handleSubmit}> Sign In</button>
        </div>
        <p className="forgot-password text-right">Don't have an Acoout? <NavLink to="/signup">Sign Up</NavLink></p>
        
    </form>
  )
}

export default Signin