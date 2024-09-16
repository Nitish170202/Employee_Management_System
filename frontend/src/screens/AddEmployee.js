import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbars from '../components/Navbars';

export default function AddEmployee() {
    // const history = useHistory();
    const navigate = useNavigate();
    const [profileImage, setProfileImage] = useState([]);
    const [credentials, setcredentials] = useState({ name: "", email: "", phone: "", designation:"",gender:"", course:"", profileImage :''});

    const convertToBase64 = (file) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
      });
    };

    const onChange = async (e) => {
      if (e.target.type === 'file') {
        const file = e.target.files[0];
        const base64 = await convertToBase64(file);
        // console.log(base64)
        setProfileImage(base64);
        setcredentials({
          ...credentials, profileImage:base64
        })
      } else {
          setcredentials({ ...credentials, [e.target.name]: e.target.value })
      }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('file', profileImage);
        // console.log(profileImage)
        

        try {

          const response = await axios.post('http://localhost:3001/item/additem', {
            credentials
          }, {
              headers: {
                  'Content-Type': 'application/json',
              }
          });

         if(!response.data.success){
          alert("Kindly fill all the details")
         }
         else{
          alert("Successfully Added");
          navigate('/')
         }

      } catch (error) {
          console.error(`Failed to Add Item: ${error.message}`);
          window.alert(error.message)
      }
    }


    return (
        <>
           <div>
           <Navbars/>
           <h1 className='my-1 fs-1' style={{color:'black', textAlign:'center'}}><b>ADD EMPLOYEE</b></h1>
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
                        <div id="emailHelp" className="form-text" style={{color:'white'}}>We'll never share your email with anyone else.</div>
                    </div>
                    <div className="mb-3">
                    <label htmlFor="mobile" className="form-label">Mobile Number</label>
                        <input type="tel" id="mobile" className="form-control" name="phone" maxLength='10' value={credentials.phone} onChange={onChange} pattern="[0-9]{10}" maxlength="10" placeholder="Enter 10-digit mobile number" required/>
                    </div>

                    <div className='mb-3'>
                        <label htmlFor="designation" className="form-label">Designation</label>
                        <select className="form-select" aria-label="Default select example" name='designation' value={credentials.designation} onChange={onChange}>
                          <option value=''>Select Designation</option>
                          <option value="HR">HR</option>
                          <option value="Manager">Manager</option>
                          <option value="Sales">Sales</option>
                        </select>
                    </div>

                    <div className='mb-3 d-flex'>
                        <label htmlFor="gender" className="form-label">Gender :</label>

                        <div className="form-check mx-5">
                      <input className="form-check-input" type="radio" name='gender' value='Male' onChange={onChange} id="flexCheckDefault" />
                      <label className="form-check-label" htmlFor="gender">
                        Male
                      </label>
                    </div>
                    <div className="form-check mx-3">
                      <input className="form-check-input" type="radio" name='gender' value='Female'  onChange={onChange} id="flexCheckChecked" />
                      <label className="form-check-label" htmlFor="gender">
                        Female
                      </label>
                    </div>

                    </div>

                    <div  className='mb-3 d-flex'>
                    <label htmlFor="course" className="form-label">Course :</label>
                    <div className="form-check mx-5">
                      <input className="form-check-input" type="checkbox" name='course' value='BCA' onChange={onChange} id="flexCheckDefault" />
                      <label className="form-check-label" htmlFor="course">
                        BCA
                      </label>
                    </div>
                    <div className="form-check mx-3">
                      <input className="form-check-input" type="checkbox" name='course' value='MCA'  onChange={onChange} id="flexCheckChecked" />
                      <label className="form-check-label" htmlFor="course">
                        MCA
                      </label>
                    </div>
                    <div className="form-check mx-3">
                      <input className="form-check-input" type="checkbox" name='course' value='BSC' onChange={onChange} id="flexCheckChecked" />
                      <label className="form-check-label" htmlFor="course">
                        BSC
                      </label>
                    </div>
                    </div>

                    <div className='mb-3 d-flex'>
                    <label className="" htmlFor="image">Image</label>
                    <div className="input-group mb-3 mx-3">
                      <input name='profileImage' type="file" onChange={onChange} className="form-control" accept=".jpg, .png" required/>
                    </div>
                    </div>

                    
                    
                    <button type="submit" className="btn btn-success" onClick={handleSubmit}>Add Employee</button>
                    

                </form>
            </div>
            </div>
           </div>
        </>
    )
}


