import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import inventoryAxios from '../axios/inventoryAxios'; // Axios instance import edin
import 'bootstrap/dist/css/bootstrap.min.css';

const typeOptions = ['CAR', 'COMPUTER', 'DISK', 'MOUSE'];
const statusOptions = ['ON_STAFF','THE_OFFICE','IN_STORAGE'];

function AddInventory() {
  const { inventoryId } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    type: '',
    brand: '',
    model: '',
    status: '',
    isIdle: false
  });

  useEffect(() => {
    if (inventoryId) {
      inventoryAxios.get(`/${inventoryId}`)
        .then(response => {
          const inventoryData = response.data;
          setFormData({
            ...inventoryData,
            status: inventoryData.status || '', // status alanını boş veya gelen veriyle doldur
            isIdle: inventoryData.isIdle || false // isIdle alanını boolean olarak kontrol et
          });
        })
        .catch(error => {
          console.error("Error fetching inventory data:", error);
        });
    }
  }, [inventoryId]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const url = inventoryId
      ? `/${inventoryId}`
      : '';

    const method = inventoryId ? 'put' : 'post';

    inventoryAxios({
      method: method,
      url: url,
      data: formData
    })
    .then(response => {
      console.log('Inventory saved:', response.data);
      navigate('/InventoryList');
    })
    .catch(error => {
      console.error('There was an error saving the inventory!', error.response ? error.response.data : error.message);
    });
  };

  return (
    <div className="container mt-5">
      <h2>{inventoryId ? 'Update Inventory' : 'Add Inventory'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="type" className="form-label">Type</label>
          <select
            className="form-select"
            id="type"
            name="type"
            value={formData.type}
            onChange={handleChange}
            required
          >
            <option value="">Select Type</option>
            {typeOptions.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="brand" className="form-label">Brand</label>
          <input
            type="text"
            className="form-control"
            id="brand"
            name="brand"
            value={formData.brand}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="model" className="form-label">Model</label>
          <input
            type="text"
            className="form-control"
            id="model"
            name="model"
            value={formData.model}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="status" className="form-label">Status</label>
          <select
            className="form-select"
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
            required
          >
            <option value="">Select Status</option>
            {statusOptions.map(status => (
              <option key={status} value={status}>{status}</option>
            ))}
          </select>
        </div>
        <div className="mb-3 form-check">
          <input
            type="checkbox"
            className="form-check-input"
            id="isIdle"
            name="isIdle"
            checked={formData.isIdle}
            onChange={handleChange}
          />
          <label className="form-check-label" htmlFor="isIdle">Is Idle</label>
        </div>
        <button type="submit" className="btn btn-primary">{inventoryId ? 'Update' : 'Add'}</button>
      </form>
    </div>
  );
}

export default AddInventory;
