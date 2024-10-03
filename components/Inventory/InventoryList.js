import React, { useEffect, useState } from 'react';
import inventoryAxios from '../axios/inventoryAxios'; // Axios instance import edin
import 'bootstrap/dist/css/bootstrap.min.css';
import './InventoryList.css';
import { useNavigate } from 'react-router-dom';

const typeOptions = [
  'CAR',
  'COMPUTER',
  'DISK',
  'MOUSE'
];

function InventoryList() {
  const [inventories, setInventories] = useState([]);
  const [typeFilter, setTypeFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(5);

  const navigate = useNavigate();

  useEffect(() => {
    fetchInventories();

    const interval = setInterval(() => {
      fetchInventories();
    }, 5000);

    return () => clearInterval(interval);
  }, [typeFilter]);

  useEffect(() => {
    setCurrentPage(1);
  }, [typeFilter]);

  const fetchInventories = async () => {
    try {
      let response;
      if (typeFilter) {
        response = await inventoryAxios.get(`/1/${typeFilter}`);
      } else {
        response = await inventoryAxios.get();
      }
      setInventories(response.data);
    } catch (error) {
      console.error("Error fetching inventories:", error);
    }
  };

  const handleFilterChange = (e) => {
    setTypeFilter(e.target.value);
  };

  const paginatedInventories = inventories.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const totalPages = Math.ceil(inventories.length / pageSize);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleUpdate = (inventoryId) => {
    navigate(`/AddInventory/${inventoryId}`);
  };

  const handleAddNew = () => {
    navigate('/AddInventory');
  };

  return (
    <div className="container">
      <div className="d-flex justify-content-between align-items-center mt-4 mb-3">
        <h2>Inventory List</h2>
        <button className="btn btn-success" onClick={handleAddNew}>
          <i className="fas fa-plus"></i> New Inventory
        </button>
      </div>

      <div className="filter-form">
        <div className="form-group">
          <label>Type</label>
          <select
            className="form-control"
            value={typeFilter}
            onChange={handleFilterChange}
          >
            <option value="">All</option>
            {typeOptions.map(type => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
      </div>

      {inventories.length === 0 ? (
        <div className="alert alert-info mt-3">
          No inventory items found for the selected filter.
        </div>
      ) : (
        <>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>ID</th>
                <th>Type</th>
                <th>Brand</th>
                <th>Model</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedInventories.map(inventory => (
                <tr key={inventory.id}>
                  <td>{inventory.id}</td>
                  <td>{inventory.type}</td>
                  <td>{inventory.brand}</td>
                  <td>{inventory.model}</td>
                  <td>
                    <button
                      className="btn btn-primary"
                      onClick={() => handleUpdate(inventory.id)}
                    >
                      Update
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <nav>
            <ul className="pagination">
              {Array.from({ length: totalPages }, (_, index) => (
                <li key={index + 1} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                  <button className="page-link" onClick={() => handlePageChange(index + 1)}>
                    {index + 1}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </>
      )}
    </div>
  );
}

export default InventoryList;
