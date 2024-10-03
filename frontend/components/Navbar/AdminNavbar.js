import React from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function AdminNavbar({ setIsLoggedIn }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    setIsLoggedIn(false);
    navigate('/Login');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-primary">
      <div className="container-fluid">
        <a className="navbar-brand text-white" href="#">JFORCE</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">

          <ul className="navbar-nav me-auto">
            <li className="nav-item mx-4">
              <a className="nav-link text-white" href="/Home">HOME</a>
            </li>
           
            <li className="nav-item mx-4">
              <a className="nav-link text-white" href="/EmployeeList">EMPLOYEE</a>
            </li>
            <li className="nav-item mx-4">
              <a className="nav-link text-white" href="/InventoryList">INVENTORY</a>
            </li>
            <li className="nav-item mx-4">
              <a className="nav-link text-white" href="/Zimmet">EMBEZZLEMENT</a>
            </li>
          </ul>
          {/* Search bar */}
          <form className="d-flex ms-auto me-4">
            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
            <button className="btn btn-outline-light me-3" type="submit">Search</button>
          </form>
          {/* Logout button */}
          <button className="btn btn-outline-light" type="button" onClick={handleLogout}>logout</button>
        </div>
      </div>
    </nav>
  );
}

export default AdminNavbar;
