const express = require('express');
const router = express.Router();
const Employees = require('../models/employee');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req,file,cd) =>{
    cd(null, 'public/Images')
  },
  filename: (req, file,cb)=>{
    cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname))
  }
})

const upload = multer({
  storage:storage
})



router.post('/additem',async (req, res) => {
  try{
     
    let { name, email, phone, designation,gender, course,profileImage } = req.body.credentials;
    
    if(!name || !email || !phone || !designation || !gender || !course || !profileImage){
      return res.json({success:false, message: "Kindly fill all the details" });
    }

    const item = new Employees({ name:name,email:email, phone:phone, designation:designation, gender:gender, course:course, profileImage:profileImage, date:new Date() });
    await item.save()
    console.log("Successfully registered" )
    return res.json({success:true , message: "Successfully registered" });
    }
    catch(error){
        console.log("Error:",error)
        return res.json({"Fetch Failed :": error})
    }

});


router.post('/getitems', async (req, res) => {
    try {
  
      const items = await Employees.find();
  
      if (items.length === 0) {
        return res.status(404).json({ message: "No items found" });
      }
  
      return res.status(200).json({ items, message: "Successfully fetched" });
    } catch (error) {
      console.error("Error fetching items:", error);
      return res.status(500).json({ message: "An error occurred while fetching items" });
    }
  });
  

  router.put('/editItem/:id', async (req, res) => {
    try {
      const itemId = req.params.id; // Extract the item ID from the path parameters
      const { name, email, phone, designation,gender, course} = req.body; // Destructure the body for the required fields




      const updatedItem = await Employees.findByIdAndUpdate(
        itemId,
        {  name, email, phone, designation,gender, course },
        { new: true, runValidators: true } // `new: true` returns the updated document
      );
  
      if (!updatedItem) {
        return res.status(404).json({ message: "Item not found" });
      }
  
      // Return the updated item and a success message
      return res.status(200).json({ item: updatedItem, message: "Item successfully updated" });
    } catch (error) {
      console.error("Error updating item:", error);
      return res.status(500).json({ message: "An error occurred while updating the item" });
    }
  });
  

  router.delete('/items/:id', async (req, res) => {
    try {
      const itemId = req.params.id;
  
      // Find item by ID and delete it
      const deletedItem = await Employees.findByIdAndDelete(itemId);
  
      if (!deletedItem) {
        return res.status(404).json({ message: 'Item not found' });
      }
  
      return res.status(200).json({ message: 'Item successfully deleted' });
    } catch (error) {
      console.error('Error deleting item:', error);
      return res.status(500).json({ message: 'An error occurred while deleting the item' });
    }
  });




module.exports = router;