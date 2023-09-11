import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import  axios from 'axios';

function Register() {
    const [values, setValues] = useState({
        name: "",
        email: "",
        password: ""
    })
const navigate = useNavigate()

const handleSubmit = (event)=>{
    event.preventDefault();
    axios.post('http://localhost:8000/register',values)
    .then(res=>{
        if(res.data.Status==="Success"){
            navigate('/login')
        }else{
            alert("Error")
        }
    })
    .then(err=>console.log(err)); 
}


    return (
        <div className='d-flex justify-content-center align-items-center vh-100' >
            <div className='bg-white p-3 rounded w-25'>
                <form onSubmit={handleSubmit}>
                    <h3>Sign Up</h3>

                    <div className="mb-3">
                        <label htmlFor='name'><strong>Name</strong></label>
                        <input
                            type="text"
                            className="form-control rounded-0"
                            placeholder=" name"
                            name="name" onChange={e => setValues({ ...values, name: e.target.value })}
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor='email'>Email address</label>
                        <input
                            type="email"
                            className="form-control rounded-0"
                            placeholder="Enter email" name="email"
                            onChange={e => setValues({ ...values, email: e.target.value })}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor='password'>Password</label>
                        <input
                            type="password"
                            className="form-control rounded-0"
                            placeholder="Enter password"
                            name="password"
                            onChange={e => setValues({ ...values, password: e.target.value })}
                        />
                    </div>

                    <div >
                        <button type="submit" className="btn btn-primary" >
                            Sign Up
                        </button>
                    </div>
                    <Link to="/login" className='btn btn-default border w-100 bg-light rounded-0 text-decoration-none'>Login</Link>
                </form>
            </div >
        </div >
    )
}

export default Register