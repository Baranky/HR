import React, { useState, useEffect } from 'react';
import employeeAxios from '../axios/employeeAxios'; // Axios instance import edin
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function EmployeeSearch() {
  const [filters, setFilters] = useState({
    TCKN: '',
    name: ''
  });
  const [employees, setEmployees] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(5);
  const [totalPages, setTotalPages] = useState(0);

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value
    });
  };

  const handleSearch = async () => {
    try {
      const response = await employeeAxios.get('/search', {
        params: {
          TCKN: filters.TCKN,
          name: filters.name
        }
      });
      const data = response.data;
      setEmployees(data);
      setTotalPages(Math.ceil(data.length / pageSize));
      setCurrentPage(1);
    } catch (error) {
      console.error('Error fetching employees:', error);
    }
  };

  const handleZimmet = (employeeId) => {
    navigate(`/Zimmetle/${employeeId}`);
  };

  useEffect(() => {
    const fetchAllEmployees = async () => {
      try {
        const response = await employeeAxios.get('/search');
        const data = response.data;
        setEmployees(data);
        setTotalPages(Math.ceil(data.length / pageSize));
      } catch (error) {
        console.error('Error fetching all employees:', error);
      }
    };

    fetchAllEmployees();
  }, []);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const paginatedEmployees = employees.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <div className="container mt-5">
      <h2>Employee Search</h2>
      <form className="row g-3">
        <div className="col-md-5">
          <label htmlFor="TCKN" className="form-label">TCKN</label>
          <input
            type="text"
            className="form-control"
            id="TCKN"
            name="TCKN"
            value={filters.TCKN}
            onChange={handleInputChange}
          />
        </div>
        <div className="col-md-5">
          <label htmlFor="name" className="form-label">Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={filters.name}
            onChange={handleInputChange}
          />
        </div>
        <div className="col-md-2 align-self-end">
          <button type="button" className="btn btn-primary" onClick={handleSearch}>Search</button>
        </div>
      </form>

      <table className="table table-striped mt-5">
        <thead>
          <tr>
            <th>ID</th>
            <th>TCKN</th>
            <th>Name</th>
            <th>Surname</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {paginatedEmployees.map(employee => (
            <tr key={employee.id}>
              <td>{employee.id}</td>
              <td>{employee.TCKN}</td>
              <td>{employee.name}</td>
              <td>{employee.surname}</td>
              <td>
                <button
                  className="btn btn-secondary"
                  onClick={() => handleZimmet(employee.id)}
                >
                  Zimmet İşlemleri
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
    </div>
  );
}

export default EmployeeSearch;
