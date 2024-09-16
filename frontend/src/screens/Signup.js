import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbars from '../components/Navbars';
// import Signup from './Signup';

export default function Signup() {
    // const history = useHistory();
    const Navigate = useNavigate();

    const [credentials, setcredentials] = useState({ name: "", email: "", password: "" });


    const onChange = (e) => {
        setcredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { name, email, password} = credentials;

        const response = await fetch("/signup", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({name , email , password})
        })
        const data = await response.json()
        console.log(data);
        if(!data.success){
            window.alert("Invalid Registration");
            console.log("Invaild Registration")
        }
        else{
            Navigate('/login');
            // localStorage.setItem('authToken',data.authToken);
            window.alert("Registration Successful");
            console.log("Registration Successful");
            

        }
    }


    return (
        <>
           <div>
           <Navbars/>
           <h1 className='my-5 fs-1' style={{color:'black', textAlign:'center'}}><b>WELCOME TO SIGN-UP PAGE</b></h1>
            <div className='container w-50 m-auto mt-5 border bg-dark border-success rounded'>
            <div className='container my-5' style={{ color: "white", fontWeight: "30px" }}>
                <form method='post'>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Name</label>
                        <input type="text" className="form-control" name='name' value={credentials.name} onChange={onChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email address</label>
                        <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name='email' value={credentials.email} onChange={onChange} />
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input type="password" className="form-control" id="exampleInputPassword1" name='password' value={credentials.password} onChange={onChange} />
                    </div>
                    <button type="submit" className="btn btn-success" onClick={handleSubmit}>Submit</button>


                </form>
            </div>
            </div>
           </div>
        </>
    )
}
