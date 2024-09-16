import React from 'react';
import { Link } from 'react-router-dom';
import Navbars from '../components/Navbars';
import { useStateContext } from '../context';
import Login from './Login';

function Home() {
  const {login} = useStateContext();
  return (
    <div>
        {(login === true)?
          <>
          <Navbars/>
          <h1 className='my-5' style={{textAlign:'center'}}>WELCOME ADMIN PANEL</h1>

          <br></br>
          <h5 className='my-5' style={{textAlign:'center'}}>Manage Employees and Set Admin Users</h5>
          <div className=' d-flex justify-content-center'>
          <Link to="/addemployee" className="m-3 mx-1 btn btn-danger">Add New Employees</Link>
          <Link to="/createuser" className="m-3 mx-1 btn btn-danger">Add New Admin</Link>

          </div>
          </>
          :
          <Login/>
        }
        
    </div>
  )
}

export default Home

