import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Form, Modal, Table } from 'react-bootstrap';
import delImg from '../components/Images/delete.png';
import editImg from '../components/Images/edit.jpg';

function UserItems() {
  const [items, setItems] = useState([]);
  const [editingItem, setEditingItem] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [formValues, setFormValues] = useState({ 
    name: '',
    email: '',
    phone: '',
    designation: '' ,
    gender:'',
    course:'',

  });


  useEffect(() => {
    fetchItems();
  }, []); 

  const fetchItems = async () => {
    try {
      const response = await axios.post(`http://localhost:3001/item/getitems`, {});
      setItems(response.data.items);
    } catch (error) {
      console.error('Error fetching items:', error);
    }
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setFormValues({ 
      name: item.name, 
      email: item.email,
      phone : item.phone,
      designation: item.designation,
      gender: item.gender,
      course: item.course,
    });
    setShowEditModal(true);
  };

  const handleDelete = (item) => {
    setEditingItem(item);
    setShowDeleteModal(true);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({ ...prevValues, [name]: value }));
  };

  const handleSaveEdit = async () => {
    console.log("skns",formValues)
    try {
      await fetch(`http://localhost:3001/item/edititem/${editingItem._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formValues),
      }).then((response)=>{
        if(response.status===200){
            alert("Saved Successfully")
        }
        else{
            alert("Failed  ", response.message)
        }
      });
      setShowEditModal(false);
      fetchItems();
    } catch (error) {
      console.error('Error updating item:', error);
    }
  };

  const handleConfirmDelete = async () => {
    try {
      await fetch(`http://localhost:3001/item/items/${editingItem._id}`, {
        method: 'DELETE',
      });
      setShowDeleteModal(false);
      fetchItems();
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  return (
    <div className='my-5'>
    <p>{items.qrCodeUrl}</p>
    
      {/* <h2 className="text-center my-4">User Items</h2> */}
      <Table striped bordered hover style={{ backgroundColor: 'white' }}>
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Email</th>
            <th>Mobile No.</th>
            <th>Designation</th>
            <th>Gender</th>
            <th>Course</th>
            <th>Create Date</th>
            <th>Admin Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item._id}>
              <td>
                <a href={item.qrCodeUrl} download={item.qrCodeUrl}><img src={item.profileImage} alt="QR Code" style={{ width: '100px', height: '100px' }} /></a>
              </td>
              <td>{item.name}</td>
              <td>{item.email}</td>
              <td>{item.phone}</td>
              <td>{item.designation}</td>
              <td>{item.gender}</td>
              <td>{item.course}</td>
              <td>{new Date(item.date).toLocaleDateString()}</td>

              <td>
                <Button variant="primary" onClick={() => handleEdit(item)} className="me-2">
                <img style={{width:'25px' , height:'30px'}} src={editImg} alt='delete'></img>
                </Button>
                <Button variant="danger" onClick={() => handleDelete(item)}>
                <img style={{width:'25px' , height:'30px'}} src={delImg} alt='delete'></img>
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Edit Modal */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Employee</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formValues.name}
                onChange={handleFormChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="numberReceived"
                value={formValues.email}
                onChange={handleFormChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Mobile No</Form.Label>
              <Form.Control
                type="tel"
                name="phone"
                value={formValues.phone}
                onChange={handleFormChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Designation</Form.Label>
              <Form.Select
                type="date"
                name="designation"
                value={formValues.designation}
                onChange={handleFormChange}
              >
              <option value="">Select Designation</option>
              <option value="HR">HR</option>
              <option value="Manager">Manager</option>
              <option value="Sales">Sales</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className='mb-3 d-flex'>
            <Form.Label>Gender</Form.Label>
                <div className='mx-3'>
                <input
                  type="radio"
                  name="selectedOption"
                  value={formValues.gender}
                  checked={formValues.gender === 'Male'}
                  onChange={handleFormChange}
                /> Male
              </div>
              <div>
                <input
                  type="radio"
                  name="selectedOption"
                  value={formValues.gender}
                  checked={formValues.gender === 'Female'}
                  onChange={handleFormChange}
                /> Female
              </div>
            </Form.Group>

        <Form.Group className="mb-3 d-flex">
        <Form.Label>Course</Form.Label>
        <div className="form-check mx-5">
                      <input className="form-check-input" type="checkbox" name='course' value={formValues.course} onChange={handleFormChange} id="flexCheckDefault" />
                      <label className="form-check-label" htmlFor="course">
                        BCA
                      </label>
                    </div>
                    <div className="form-check mx-3">
                      <input className="form-check-input" type="checkbox" name='course' value={formValues.course}  onChange={handleFormChange} id="flexCheckChecked" />
                      <label className="form-check-label" htmlFor="course">
                        MCA
                      </label>
                    </div>
                    <div className="form-check mx-3">
                      <input className="form-check-input" type="checkbox" name='course' value={formValues.course} onChange={handleFormChange} id="flexCheckChecked" />
                      <label className="form-check-label" htmlFor="course">
                        BSC
                      </label>
                    </div>
      </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSaveEdit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Delete Modal */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Item</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete the item of <b>{editingItem?.name}</b>?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
          {/* <img style={{width:'25px' , height:'30px'}} src={editImg} alt='delete'></img> */}
          Cancel
          </Button>
          <Button variant="danger" onClick={handleConfirmDelete}>
          {/* <img style={{width:'25px' , height:'30px'}} src={delImg} alt='delete'></img> */}
          Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default UserItems;
