import React ,{useState}from 'react'
import {Link} from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

function Login() {

    const [values, setValues] = useState({
        email: "",
        password: ""
    })
const navigate = useNavigate()
axios.defaults.withCredentials= true;
const handleSubmit = (event)=>{
    event.preventDefault();
    axios.post('http://localhost:8000/login',values)
    .then(res=>{
        if(res.data.Status==="Success"){
            navigate('/')    ////home////
        }else{
            alert("Error")
        }
    })
    .then(err=>console.log(err)); 
}


  return (
    <div className='d-flex justify-content-center align-items-center vh-100 loginPage'>
    <div className='bg-white p-3 border'>
        <div className='test-danger'>
        </div>
        <h2>Login</h2>
       
        <form  onSubmit={handleSubmit}>
            <div className='mb-3'>
                <label htmlFor='email'><strong>Email</strong></label>
                <input typ="email" placeholder='Enter Email' className='form-control rounded-0'  name="email" onChange={e=>setValues({...values,email:e.target.value})}/>
            </div>
            <div className='mb-3'>
                <label htmlFor='password'><strong>password</strong></label>
                <input type="password" placeholder='Enter password' className='form-control rounded-0' name="password" onChange={e=>setValues({...values,password:e.target.value})}/>
            </div>
            <button type="submit" className='btn btn-success w-100 rounded-0' >Log in</button>
            <p>You are agree to our terms and policies</p>
            <Link to="/register" className='btn btn-default border w-100 bg-light rounded-0 ' >
                Create Account
            </Link>

        </form>
    </div>

</div>
  )
}

export default Login