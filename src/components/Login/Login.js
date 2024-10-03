import React, { useState } from 'react';
import axiosInstance from '../axios/axiosInstance';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function Login({ setIsLoggedIn, setRole }) {
  const [role, setRoleLocal] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleImageClick = (selectedRole) => {
    setRoleLocal(selectedRole);
    setShowModal(true);
  };

  const handleLogin = async () => {
    try {
      const response = await axiosInstance.post('generateToken', {
        username,
        password,
      });

      const token = response.data;
      if (!token || token.split('.').length !== 3) {
        console.error('Invalid token received:', token);
      } else {
        localStorage.setItem('token', token);
        localStorage.setItem('role', role);
        setIsLoggedIn(true);
        setRole(role);
      }

      setShowModal(false);
      setErrorMessage('');

      if (role === 'IK') {
        navigate('/EmployeeList');
      } else if (role === 'EY') {
        navigate('/InventoryList');
      } else if (role === 'ADMIN') {
        navigate('/Zimmet');
      }
    } catch (error) {
      setErrorMessage('Login failed. Please check your username and password.');
      console.error('Error generating token:', error);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Login</h2>
      <div className="row">
        <div className="col text-center">
          <img 
            src="ik.jpg" 
            alt="IK" 
            className="img-fluid mb-2" 
            onClick={() => handleImageClick('IK')} 
            style={{ cursor: 'pointer' }}
          />
        </div>
        <div className="col text-center">
          <img 
            src="envanter.jpg" 
            alt="EY" 
            className="img-fluid mb-2" 
            onClick={() => handleImageClick('EY')} 
            style={{ cursor: 'pointer' }}
          />
        </div>
        <div className="col text-center">
          <img 
            src="admin.png" 
            alt="ADMIN" 
            className="img-fluid mb-2" 
            onClick={() => handleImageClick('ADMIN')} 
            style={{ cursor: 'pointer' }}
          />
        </div>
      </div>

      {/* Modal for username and password input */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{role} Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
          <div className="mb-3">
            <label htmlFor="username" className="form-label">Username</label>
            <input
              type="text"
              className="form-control"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleLogin}>
            Login
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Login;
