import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useStateContext } from '../context';
import LOGO from './Images/logo_dealsdray.jpeg';


export default function Navbars() {
    const {login,setLogin} = useStateContext();
    const navigate = useNavigate();

const handleLogout = ()=>{
    setLogin(false)
    navigate("/");
}
return (
    <>
<nav className="navbar navbar-expand-lg bg-body-tertiary">
  <div className="container-fluid">
    <img className='mx-3' style={{width:'80px',height:'60px', borderRadius:'50%'}} src={LOGO} alt='...'></img>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
    {(login === true)?
      <ul style={{display:'flex', margin:'auto'}} className="navbar-nav me-auto mb-lg-0">
        <li className="nav-item mx-5">
          <Link className="navbar-brand fs-4" to="/"><b>HOME</b></Link>
        </li>
        <li className="nav-item mx-5">
        <Link className="navbar-brand fs-4" to="/employeelist"><b>EMPLOYEE LIST</b></Link>
        </li>
      </ul>
      :
      <>
      <ul style={{display:'flex', margin:'auto'}} className="navbar-nav me-auto mb-lg-0">
        <li className="nav-item mx-5">
          <Link className="navbar-brand fs-4" to="/"><b>HOME</b></Link>
        </li>
      </ul>
      </>
    }
     
    {(login === true) ?
            <div className='d-flex'>
            <div className='btn bg-white mx-2'><b>Nitish Kumar Yadav</b></div>
            <div className='btn bg-white mx-2' onClick={handleLogout}> <b>Logout</b></div>
            </div>
            :
            <div className='d-flex'>
            <Link className="btn bg-white  mx-1" style={{borderColor:"black"}} to="/login">Login</Link>
            {/* <Link className="btn bg-white   mx-1" style={{borderColor:"black"}} to="/createuser">Register</Link> */}
            </div>
            }
    </div>
  </div>
</nav>
    </>
  )
}
