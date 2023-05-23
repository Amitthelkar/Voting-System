import "./App.css";


import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


import { Fragment } from "react";
import Home from "./Components/Home";
import AdminLogin from "./Components/AdminLogin";
import Navbar from "./Components/Navbar";
import Login from "./Components/Login";
import Registration from "./Components/Registration";
import EmployeeLogin from "./Components/EmployeeLogin";
import AdminDashboard from "./Components/AdminDashboard";
import CreateQuery from "./Components/CreateQuery";
import SetSolution from "./Components/SetSolution";


function App() {
  return (
    <Fragment>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login/admin" element={<AdminLogin />} />
          <Route path="/login" element={<Login />} />
          <Route path="/login/employee" element={< EmployeeLogin/>} />
          <Route path="/register/employee" element={<Registration />} />
          <Route path="/dashboard/admin" element={<AdminDashboard />} />
          <Route path="/createquery" element={<CreateQuery />} />
          <Route path="/setsolution" element={<SetSolution />} />
        
          
        </Routes>
      </Router>
    </Fragment>
  );
}

export default App;