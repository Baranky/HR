import React, { useEffect, useState } from 'react';
import zimmetInstance from '../axios/zimmetInstance'; // Axios instance import edin
import { useParams } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';

function Zimmetle() {
  const { employeeId } = useParams();
  const [inventories, setInventories] = useState([]);
  const [showReturnModal, setShowReturnModal] = useState(false);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [selectedInventory, setSelectedInventory] = useState(null);
  const [availableInventories, setAvailableInventories] = useState([]);
  const [returnDate, setReturnDate] = useState('');

  // Çalışanın zimmetli envanterlerini getirir
  const fetchInventories = async () => {
    try {
      const response = await zimmetInstance.get(`/by-employee/${employeeId}`);
      setInventories(response.data);
      console.log(response.data);
    } catch (error) {
      console.error('Error fetching inventories:', error);
    }
  };

  // Zimmetlenebilir envanterleri getirir
  const fetchAvailableInventories = async () => {
    try {
      //bosta olan envanterler listeleme
      const response = await zimmetInstance.get('/available');
      setAvailableInventories(response.data);
    } catch (error) {
      console.error('Error fetching available inventories:', error);
    }
  };

  useEffect(() => {
    fetchInventories();
  }, [employeeId]);

  // Geri alma modalını açar
  const handleShowReturn = (employeeInventory) => {
    if (employeeInventory && employeeInventory.id) { // Burada EmployeeInventory ID'si kullanılacak
        setSelectedInventory(employeeInventory); // Seçili EmployeeInventory'yi saklıyoruz
        setShowReturnModal(true); // Modal'ı açıyoruz
    } else {
        console.error('EmployeeInventory ID is missing.');
    }
  };

  // Geri alma modalını kapatır
  const handleCloseReturn = () => {
    setShowReturnModal(false);
    setSelectedInventory(null);
    setReturnDate('');
  };

  // Zimmetleme modalını açar
  const handleShowAssign = () => {
    fetchAvailableInventories();
    setShowAssignModal(true);
  };

  // Zimmetleme modalını kapatır
  const handleCloseAssign = () => {
    setShowAssignModal(false);
    setSelectedInventory(null);
  };

  // Geri alma tarihini ayarlar
  const handleReturnDateChange = (e) => {
    setReturnDate(e.target.value);
  };

  // Zimmeti geri alır
  const handleReturn = async () => {
    if (!selectedInventory || !selectedInventory.id) {
        console.error('Selected EmployeeInventory ID is missing.');
        return;
    }

    try {
        // DELETE request to remove the record from EmployeeInventory table
        await zimmetInstance.delete(`/${selectedInventory.id}`);

        // İşlem başarılı olursa envanter listesini güncelliyoruz
        fetchInventories();
        handleCloseReturn();
    } catch (error) {
        console.error('Error returning inventory:', error);
        console.error('Error Details:', error.response ? error.response.data : error.message);
    }
  };

  // Yeni bir zimmet ekler
  const handleAssign = async (inventoryId) => {
    try {
      const newAssignment = {
        dateGiven: new Date().toISOString().split('T')[0],
        dateReturn: null,
        receiverEmployeeId: employeeId,
        delivererEmployeeId: employeeId,
        inventoryId: inventoryId
      };

      await zimmetInstance.post('', newAssignment);
      fetchInventories();
      handleCloseAssign();
    } catch (error) {
      console.error('Error assigning inventory:', error);
      console.error('Error Details:', error.response ? error.response.data : error.message);
    }
  };

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Zimmet Bilgileri</h2>
        <button className="btn btn-primary" onClick={handleShowAssign}>
          Yeni Zimmet Ekle
        </button>
      </div>
      {inventories.length === 0 ? (
        <p>Bu çalışanın zimmet bilgisi yok.</p>
      ) : (
        <table className="table table-striped mt-3">
          <thead>
            <tr>
              <th>Ekipman Tipi</th>
              <th>Marka</th>
              <th>Model</th>
              <th>Aksiyonlar</th>
            </tr>
          </thead>
          <tbody>
            {inventories.map((inventory, index) => (
              <tr key={index}>
                <td>{inventory.type}</td>
                <td>{inventory.brand}</td>
                <td>{inventory.model}</td>
                <td>
                  <button
                    className="btn btn-secondary"
                    onClick={() => handleShowReturn(inventory)}
                  >
                    Zimmeti Geri Al
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Zimmeti  Alma Modalı */}
      <Modal show={showReturnModal} onHide={handleCloseReturn}>
        <Modal.Header closeButton>
          <Modal.Title>Zimmeti Geri Al</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <label htmlFor="returnDate" className="form-label">Teslim Alınan Tarih</label>
          <input
            type="date"
            className="form-control"
            id="returnDate"
            value={returnDate}
            onChange={handleReturnDateChange}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseReturn}>
            Kapat
          </Button>
          <Button variant="primary" onClick={handleReturn}>
            Kaydet
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Yeni Zimmet Ekleme Modalı */}
      <Modal show={showAssignModal} onHide={handleCloseAssign}>
        <Modal.Header closeButton>
          <Modal.Title>Yeni Zimmet Ekle</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <table className="table table-striped mt-3">
            <thead>
              <tr>
                <th>Ekipman Tipi</th>
                <th>Marka</th>
                <th>Model</th>
                <th>Aksiyonlar</th>
              </tr>
            </thead>
            <tbody>
              {availableInventories.map((inventory, index) => (
                <tr key={index}>
                  <td>{inventory.type}</td>
                  <td>{inventory.brand}</td>
                  <td>{inventory.model}</td>
                  <td>
                    <button
                      className="btn btn-primary"
                      onClick={() => handleAssign(inventory.id)}
                    >
                      Zimmetle
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseAssign}>
            Kapat
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Zimmetle;
