import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes,Navigate } from 'react-router-dom';
import PublicNavbar from './components/Navbar/PublicNavbar';
import PrivateNavbar from './components/Navbar/AdminNavbar';
import EYNavbar from './components/Navbar/EYnavbar';
import IKNavbar from './components/Navbar/IKnavbar';
import EmployeeList from './components/Employee/EmployeeList';
import AddEmployee from './components/Employee/AddEmployee';
import InventoryList from './components/Inventory/InventoryList';
import AddInventory from './components/Inventory/AddInventory';
import Zimmet from './components/EmployeeInventor/Zimmet';
import Zimmetle from './components/EmployeeInventor/Zimmetle';
import Login from './components/Login/Login';
import Home from './components/Home/HomePage';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedRole = localStorage.getItem('role');
    setIsLoggedIn(!!token);
    setRole(storedRole || '');
  }, []);

  const renderNavbar = () => {
    if (!isLoggedIn) {
      return <PublicNavbar />;
    }
    if (role === 'ADMIN') {
      return <PrivateNavbar setIsLoggedIn={setIsLoggedIn} />;
    }
    if (role === 'IK') {
      return <IKNavbar setIsLoggedIn={setIsLoggedIn} />;
    }
    if (role === 'EY') {
      return <EYNavbar setIsLoggedIn={setIsLoggedIn} />;
    }
    return <PublicNavbar />;
  };

  return (
    <Router>
      <div>
        {renderNavbar()}
        <div className="container mt-4">
          <Routes>
          <Route path="/" element={<Navigate to="/Home" />} />
            <Route path="/Login" element={<Login setIsLoggedIn={setIsLoggedIn} setRole={setRole} />} />
            <Route path="/Home" element={<Home setIsLoggedIn={setIsLoggedIn} setRole={setRole} />} />
            <Route
              path="/EmployeeList"
              element={
                <ProtectedRoute requiredRoles={['IK', 'ADMIN']}>
                  <EmployeeList />
                </ProtectedRoute>
              }
            />
            <Route
              path="/addEmployee"
              element={
                <ProtectedRoute requiredRoles={['IK','ADMIN']}>
                  <AddEmployee />
                </ProtectedRoute>
              }
            />
            <Route
              path="/addEmployee/:employeeId"
              element={
                <ProtectedRoute requiredRoles={['IK','ADMIN']}>
                  <AddEmployee />
                </ProtectedRoute>
              }
            />
            <Route
              path="/InventoryList"
              element={
                <ProtectedRoute requiredRoles={['EY','ADMIN']}>
                  <InventoryList />
                </ProtectedRoute>
              }
            />
            <Route
              path="/AddInventory"
              element={
                <ProtectedRoute requiredRoles={['EY','ADMIN']}>
                  <AddInventory />
                </ProtectedRoute>
              }
            />
            <Route
              path="/AddInventory/:inventoryId"
              element={
                <ProtectedRoute requiredRoles={['EY','ADMIN']}>
                  <AddInventory />
                </ProtectedRoute>
              }
            />
            <Route
              path="/Zimmet"
              element={
                <ProtectedRoute requiredRoles={['IK', 'ADMIN']}>
                  <Zimmet />
                </ProtectedRoute>
              }
            />
            <Route
              path="/Zimmetle/:employeeId"
              element={
                <ProtectedRoute requiredRoles={['EY', 'ADMIN']}>
                  <Zimmetle />
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
