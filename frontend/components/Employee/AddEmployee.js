import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import employeeAxios from '../axios/employeeAxios';  // axiosInstance import edin
import 'bootstrap/dist/css/bootstrap.min.css';

// Enum değerlerini tanımlayın
const tasksOptions = ['SOFTWARE_DEVELOPMENT_EXPERT', 'DIRECTOR', 'ASSISTANT_DIRECTOR'];
const graduationStatusOptions = ['BACHELORS_DEGREE', 'ASSOCIATE_DEGREE', 'MASTERS_DEGREE', 'DOCTORATE_DEGREE'];
const unitOptions = ['RESEARCH_DEVELOPMENT', 'SOFTWARE_DEVELOPMENT'];

function AddEmployee() {
  const { employeeId } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    gender: '',
    dateBirth: '',
    maritalStatus: '',
    TCKN: '',
    isActive: false,
    task: '',
    graduationStatus: '',
    units: '',
    terminationDate: ''
  });

  useEffect(() => {
    if (employeeId) {
      employeeAxios.get(`/${employeeId}`)
        .then(response => {
          const employeeData = response.data;
          // Tarihi uygun formata dönüştür
          employeeData.dateBirth = employeeData.dateBirth ? new Date(employeeData.dateBirth).toISOString().substring(0, 10) : '';
          employeeData.terminationDate = employeeData.terminationDate ? new Date(employeeData.terminationDate).toISOString().substring(0, 16) : '';
          setFormData(employeeData);
        })
        .catch(error => {
          console.error("Error fetching employee data:", error);
        });
    }
  }, [employeeId]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const url = employeeId
      ?`/${employeeId}`
      : '';

    const method = employeeId ? 'put' : 'post';

    employeeAxios({
      method: method,
      url: url,
      data: formData
    })
    .then(response => {
      console.log('employe saved:', response.data);
      navigate('/EmployeeList');
    })
    .catch(error => {
      console.error('There was an error saving the employee!', error);
    });
  };

  return (
    <div className="container mt-5">
      <h2>{employeeId ? 'Update Employee' : 'Add Employee'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="surname" className="form-label">Surname</label>
          <input
            type="text"
            className="form-control"
            id="surname"
            name="surname"
            value={formData.surname}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="gender" className="form-label">Gender</label>
          <select
            className="form-select"
            id="gender"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            required
          >
            <option value="">Select Gender</option>
            <option value="MALE">MALE</option>
            <option value="FEMALE">FEMALE</option>
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="dateBirth" className="form-label">Date of Birth</label>
          <input
            type="date"
            className="form-control"
            id="dateBirth"
            name="dateBirth"
            value={formData.dateBirth}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="maritalStatus" className="form-label">Marital Status</label>
          <input
            type="text"
            className="form-control"
            id="maritalStatus"
            name="maritalStatus"
            value={formData.maritalStatus}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="TCKN" className="form-label">TCKN</label>
          <input
            type="text"
            className="form-control"
            id="TCKN"
            name="TCKN"
            value={formData.TCKN}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3 form-check">
          <input
            type="checkbox"
            className="form-check-input"
            id="isActive"
            name="isActive"
            checked={formData.isActive}
            onChange={handleChange}
            required
          />
          <label className="form-check-label" htmlFor="isActive">Is Active</label>
        </div>
        <div className="mb-3">
          <label htmlFor="task" className="form-label">Task</label>
          <select
            className="form-select"
            id="task"
            name="task"
            value={formData.task}
            onChange={handleChange}
            required
          >
            <option value="">Select Task</option>
            {tasksOptions.map(task => (
              <option key={task} value={task}>{task}</option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="graduationStatus" className="form-label">Graduation Status</label>
          <select
            className="form-select"
            id="graduationStatus"
            name="graduationStatus"
            value={formData.graduationStatus}
            onChange={handleChange}
            required
          >
            <option value="">Select Graduation Status</option>
            {graduationStatusOptions.map(status => (
              <option key={status} value={status}>{status}</option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="units" className="form-label">Unit</label>
          <select
            className="form-select"
            id="units"
            name="units"
            value={formData.units}
            onChange={handleChange}
            required
          >
            <option value="">Select Unit</option>
            {unitOptions.map(unit => (
              <option key={unit} value={unit}>{unit}</option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="terminationDate" className="form-label">Termination Date</label>
          <input
            type="datetime-local"
            className="form-control"
            id="terminationDate"
            name="terminationDate"
            value={formData.terminationDate}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">{employeeId ? 'Update' : 'Add'}</button>
      </form>
    </div>
  );
}

export default AddEmployee;