import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import AddEmployee from './screens/AddEmployee';
import EmployeeList from './screens/EmployeeList';
import Home from './screens/Home';
import Login from './screens/Login';
import Signup from './screens/Signup';

function App() {
  return (
    <BrowserRouter>
    
    <Routes>
      <Route exact path="/" element={<Home/>} />
      <Route exact path="/login" element={<Login/>} />
      <Route exact path="/createuser" element={<Signup/>} />
      <Route exact path="/addemployee" element={<AddEmployee/>} />
      <Route exact path="/employeelist" element={<EmployeeList/>} />
    </Routes>
  
</BrowserRouter>
  );
}

export default App;