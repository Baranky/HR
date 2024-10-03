import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const ProtectedRoute = ({ children, requiredRoles }) => {
  const [showModal, setShowModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [redirect, setRedirect] = useState(false);
  const [redirect2, setRedirect2] = useState(false);
  const token = localStorage.getItem('token');
  const userRole = localStorage.getItem('role');

  useEffect(() => {
    if (!token) {
      setErrorMessage('Lütfen giriş yapın!');
      setShowModal(true);
    } else if (requiredRoles && !requiredRoles.includes(userRole)) {
      setErrorMessage('Bu sayfaya erişim yetkiniz yok!');
      setShowModal(true);
    }
  }, [token, userRole, requiredRoles]);

  const handleLogoutAndRedirect = () => {
    // Kullanıcıyı logout yap
    
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    
    // Modalı kapat ve yönlendirme yap
    setShowModal(false);
    setRedirect(true);
  };
  const handleRedirect = () => {
    // Kullanıcıyı 
    setShowModal(false);
    setRedirect2(true);
  };

  if (redirect) {
    return <Navigate to="/Login" replace />;
  }

  if (redirect2) {
    return <Navigate to="/" replace />;
  }
  return (
    <>
      {showModal && (
        <Modal show={true} onHide={handleRedirect}>
          <Modal.Header closeButton>
            <Modal.Title>Hata</Modal.Title>
          </Modal.Header>
          <Modal.Body>{errorMessage}</Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={handleLogoutAndRedirect}>
              Login Sayfasına Git
            </Button>
          </Modal.Footer>
        </Modal>
      )}
      {!showModal && children}
    </>
  );
};

export default ProtectedRoute;
