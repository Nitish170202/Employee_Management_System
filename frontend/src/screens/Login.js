import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbars';
import { useStateContext } from '../context';


export default function Login() {
const [credentials, setCredentials] = useState({ email: "", password: "" })
const {setLogin , setUserName} = useStateContext();
  let navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { email, password } = credentials;

        const response = await fetch("/signin", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email , password })
        })
        const data = await response.json()
        console.log("signin data ",data);
        if(!data.success){
            window.alert("Invalid Credentials");
        }
        else{
            window.alert("Login Successfull");
            setLogin(true);
            setUserName(data.username)
            navigate("/");
            
        }
    
  }

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
  }

  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div className='container'>
      <h3 className='my-5' style={{textAlign:'center'}}>WELCOME TO SIGN-IN PAGE</h3>
        <form className='w-50 m-auto mt-5 border bg-dark border-success rounded' method='post'>
          <div className="m-3">
            <label htmlFor="exampleInputEmail1" className="form-label" style={{"color":"white"}}>Email address</label>
            <input type="email" className="form-control" name='email' value={credentials.email} onChange={onChange} aria-describedby="emailHelp" />
            <div id="emailHelp" className="form-text" style={{"color":"white"}}>We'll never share your email with anyone.</div>
          </div>
          <div className="m-3">
            <label htmlFor="exampleInputPassword1" className="form-label" style={{"color":"white"}}>Password</label>
            <input type="password" className="form-control" value={credentials.password} onChange={onChange} name='password' />
          </div>
          <button type="submit" className="m-3 btn btn-success" onClick={handleSubmit}>Submit</button>
        </form>

      </div>
    </div>
  )
}

