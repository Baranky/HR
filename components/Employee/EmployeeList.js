import React, { useEffect, useState } from 'react';
import axiosInstance from '../axios/employeeAxios'; // Axios instance import edin
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './EmployeeList.css';

// Enum değerlerini doğrudan kod içinde tanımlayın
const unitOptions = [
  'RESEARCH_DEVELOPMENT',
  'SOFTWARE_DEVELOPMENT'
];

function EmployeeList() {
  const [employees, setEmployees] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [filters, setFilters] = useState({
    name: '',
    surname: '',
    TCKN: '',
    unit: ''
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(5);

  const navigate = useNavigate();

  const fetchEmployees = async () => {
    try {
      const response = await axiosInstance.get();
      setEmployees(response.data);
      setFilteredEmployees(response.data);
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };

  useEffect(() => {
    fetchEmployees();

    const interval = setInterval(() => {
      fetchEmployees();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    filterEmployees();
  }, [filters, employees]);

  useEffect(() => {
    setCurrentPage(1);
  }, [filters]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prevFilters => ({
      ...prevFilters,
      [name]: value
    }));
  };

  const filterEmployees = () => {
    let filtered = employees;

    if (filters.name) {
      filtered = filtered.filter(employee =>
        employee.name.toLowerCase().includes(filters.name.toLowerCase())
      );
    }

    if (filters.surname) {
      filtered = filtered.filter(employee =>
        employee.surname.toLowerCase().includes(filters.surname.toLowerCase())
      );
    }

    if (filters.TCKN) {
      filtered = filtered.filter(employee =>
        employee.TCKN && employee.TCKN.toString() === filters.TCKN
      );
    }

    if (filters.unit) {
      filtered = filtered.filter(employee =>
        employee.units && employee.units === filters.unit
      );
    }

    setFilteredEmployees(filtered);
  };

  const paginatedEmployees = filteredEmployees.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const totalPages = Math.ceil(filteredEmployees.length / pageSize);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleUpdate = (employeeId) => {
    navigate(`/addEmployee/${employeeId}`);
  };

  const handleAddNew = () => {
    navigate('/addEmployee');
  };

  return (
    <div className="container">
      <div className="d-flex justify-content-between align-items-center mt-4 mb-3">
        <h2>Employee List</h2>
        <button className="btn btn-success" onClick={handleAddNew}>
          <i className="fas fa-plus"></i> New Employee
        </button>
      </div>

      <div className="filter-form">
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            className="form-control"
            name="name"
            value={filters.name}
            onChange={handleFilterChange}
          />
        </div>
        <div className="form-group">
          <label>Surname</label>
          <input
            type="text"
            className="form-control"
            name="surname"
            value={filters.surname}
            onChange={handleFilterChange}
          />
        </div>
        <div className="form-group">
          <label>TCKN</label>
          <input
            type="text"
            className="form-control"
            name="TCKN"
            value={filters.TCKN}
            onChange={handleFilterChange}
          />
        </div>
        <div className="form-group">
          <label>Unit</label>
          <select
            className="form-control"
            name="unit"
            value={filters.unit}
            onChange={handleFilterChange}
          >
            <option value="">All</option>
            {unitOptions.map(unit => (
              <option key={unit} value={unit}>
                {unit}
              </option>
            ))}
          </select>
        </div>
      </div>

      {filteredEmployees.length === 0 ? (
        <div className="alert alert-info mt-3">
          No employees found for the selected filter.
        </div>
      ) : (
        <>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Surname</th>
                <th>Gender</th>
                <th>Birth Date</th>
                <th>Marital Status</th>
                <th>TCKN</th>
                <th>Active</th>
                <th>Task</th>
                <th>Graduation Status</th>
                <th>Termination Date</th>
                <th>Units</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedEmployees.map(employee => (
                <tr key={employee.id}>
                  <td>{employee.id}</td>
                  <td>{employee.name}</td>
                  <td>{employee.surname}</td>
                  <td>{employee.gender}</td>
                  <td>{new Date(employee.dateBirth).toLocaleDateString()}</td>
                  <td>{employee.maritalStatus}</td>
                  <td>{employee.TCKN}</td>
                  <td>{employee.isActive ? 'Yes' : 'No'}</td>
                  <td>{employee.task}</td>
                  <td>{employee.graduationStatus}</td>
                  <td>{employee.terminationDate ? new Date(employee.terminationDate).toLocaleString() : ''}</td>
                  <td>{employee.units}</td>
                  <td>
                    <button
                      className="btn btn-primary"
                      onClick={() => handleUpdate(employee.id)}
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

export default EmployeeList;
