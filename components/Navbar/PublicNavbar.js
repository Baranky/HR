import React from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function PublicNavbar() {
  const navigate = useNavigate();

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-primary">
      <div className="container-fluid">
        <a className="navbar-brand text-white" href="#">JFORCE</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav me-auto">
            <li className="nav-item mx-5">
              <a className="nav-link text-white" href="/Home">HOME</a>
            </li>
            </ul>
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <form className="d-flex">
                <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                <button className="btn btn-outline-light me-5" type="submit">Search</button>
              </form>
            </li>
            <li className="nav-item">
              <button className="btn btn-outline-light me-1" type="button" onClick={() => navigate('/Login')}>Login</button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default PublicNavbar;
