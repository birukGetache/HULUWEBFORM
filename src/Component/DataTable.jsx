import React, { useState } from 'react';
import axios from 'axios';
import './DATA.css'
const DataTable = ({ dataList, setDataList }) => {
  const [searchParams, setSearchParams] = useState({
    phoneNumber: '',
    location: '',
    department: '',
    yearsOfExperience: '',
    urgency: '',
    gender: ''
  });

  const [editingRowId, setEditingRowId] = useState(null);
  const [editingIndex, setEditingIndex] = useState(false);
  const [updatedData, setUpdatedData] = useState({});

  const handleSearchChange = (e) => {
    const { name, value } = e.target;
    setSearchParams((prevParams) => ({ ...prevParams, [name]: value }));
  };

  const filterData = () => {
    return dataList.filter((data) => {
      return (
        (searchParams.phoneNumber === '' || data.phoneNumber.includes(searchParams.phoneNumber)) &&
        (searchParams.location === '' || data.location.toLowerCase().includes(searchParams.location.toLowerCase())) &&
        (searchParams.department === '' || data.department.toLowerCase().includes(searchParams.department.toLowerCase())) &&
        (searchParams.yearsOfExperience === '' || (data.yearsOfExperience && data.yearsOfExperience.toString().includes(searchParams.yearsOfExperience))) &&
        (searchParams.urgency === '' || data.urgency.toLowerCase() === searchParams.urgency.toLowerCase()) &&
        (searchParams.gender === '' || data.gender.toLowerCase() === searchParams.gender.toLowerCase())
      );
    });
  };

  const filteredData = filterData();

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/data/${id}`);
      setDataList((prevList) => prevList.filter((item) => item._id !== id));
    } catch (error) {
      console.error('Error deleting data:', error);
    }
  };
  

  const handleHire = async (id) => {
    try {
      const currentData = dataList.find((item) => item._id === id);
      const updatedData = {
        ...currentData,
        hired: 'hired',
        hiredBy:'HULU GENERAL COMMITION',
        hireDate: new Date().toLocaleDateString(),
      };
      await axios.put(`http://localhost:5000/api/data/${id}`, updatedData);
      setDataList((prevList) =>
        prevList.map((item) =>
          item._id === id ? updatedData : item
        )
      );
    } catch (error) {
      console.error('Error updating hire status:', error);
    }
  };
  

  const handleUpdate = async (data) => {
    setEditingIndex(true);
    setUpdatedData(data);
    console.log(updatedData);
    try {
      const response = await axios.put(`http://localhost:5000/api/data/${data._id}`, updatedData);
      const updatedList = dataList.map((item) =>
        item._id === data._id ? response.data : item
      );
      setDataList(updatedList);
      setEditingIndex(null);
      setUpdatedData({});
    } catch (error) {
      console.error('Error updating data:', error);
    }
  };
  

  const applyUpdate = async () => {
    try {
      const response = await axios.put(`http://localhost:5000/api/data/${updatedData._id}`, updatedData);
      const updatedList = dataList.map((item) =>
        item._id === updatedData._id ? response.data : item
      );
      setDataList(updatedList);
      setEditingIndex(null);
      setUpdatedData({});
    } catch (error) {
      console.error('Error updating data:', error);
    }
  };
  const handleEditClick = (data) => {
    setEditingRowId(data._id);
    setUpdatedData({ ...data });
  };

  const handleUpdateChange = (e) => {
    const { name, value } = e.target;
    setUpdatedData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleUrgencyChange = async (index, value) => {
    const currentData = dataList[index];
    const updatedData = { ...currentData, urgency: value };
    setDataList((prevList) =>
      prevList.map((item, i) =>
        i === index ? updatedData : item
      )
    );
    const response = await axios.put(`http://localhost:5000/api/data/${updatedData._id}`, updatedData);
  };

  return (
    <div className="table-container">
      <h1 style={{display:"flex" , justifyContent:"center" , fontFamily:"cursive"
      }}>Data Table</h1>
      <div className="search-bar">
        <label>
          Phone Number:
          <input
            type="text"
            name="phoneNumber"
            value={searchParams.phoneNumber}
            onChange={handleSearchChange}
          />
        </label>
        <label>
          Location:
          <input
            type="text"
            name="location"
            value={searchParams.location}
            onChange={handleSearchChange}
          />
        </label>
        <label>
          Department:
          <input
            type="text"
            name="department"
            value={searchParams.department}
            onChange={handleSearchChange}
          />
        </label>
        <label>
          Years of Experience:
          <input
            type="text"
            name="yearsOfExperience"
            value={searchParams.yearsOfExperience}
            onChange={handleSearchChange}
          />
        </label>
        <label>
          Urgency:
          <select
            name="urgency"
            value={searchParams.urgency}
            onChange={handleSearchChange}
          >
            <option value="">All</option>
            <option value="not urgent">Not Urgent</option>
            <option value="urgent">Urgent</option>
          </select>
        </label>
        <label>
          Gender:
          <select
            name="gender"
            value={searchParams.gender}
            onChange={handleSearchChange}
          >
            <option value="">All</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </label>
      </div>
      <table className="data-table">
        <thead>
          <tr>
            <th>First Name</th>
            <th>Middle Name</th>
            <th>Department</th>
            <th>Phone Number</th>
            <th>Location</th>
            <th>Gender</th>
            <th>Urgency</th>
            <th>Hire Status</th>
            <th>Years of Experience</th>
            <th>Created At</th>
            <th>Hired By</th>
            <th>Hired Date</th>
            <th>Change Urgency</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((data, index) => (
            <tr key={data._id}>
              <td>{data.firstName}</td>
              <td>{data.middleName}</td>
              <td>{data.department}</td>
              <td>{data.phoneNumber}</td>
              <td>{data.location}</td>
              <td>{data.gender}</td>
              <td >{data.urgency}</td>
              <td>{data.hired}</td>
              {/* <td>{data.experience === 'experienced' ? data.yearsOfExperience : '-'}</td> */}
              <td>{ data.yearsOfExperience}</td>
              <td>{data.createdAt}</td>
              <td>{data.hiredBy || '-'}</td>
              <td>{data.hireDate || '-'}</td>
              <td>
                <select
                  value={data.urgency}
                  onChange={(e) => handleUrgencyChange(index, e.target.value)}
                >
                  <option value="not urgent">Not Urgent</option>
                  <option value="urgent">Urgent</option>
                </select>
              </td>
              <td>
                {data.hired === 'not hired' ? (
                  <button onClick={() => handleHire(data._id)}>Hire</button>
                ) : (
                  <button onClick={() => handleHire(data._id)}>Hired</button>
                )}
                <button onClick={() => handleDelete(data._id)}>Delete</button>
                <button onClick={() => handleEditClick(data)}>Update</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editingRowId && (
        <div className="update-form">
          <h2>Update Data</h2>
          <form onSubmit={(e) => {
            e.preventDefault();
            applyUpdate();
          }}>
            <label>
              First Name:
              <input
                type="text"
                name="firstName"
                value={updatedData.firstName || ''}
                onChange={handleUpdateChange}
                required
              />
            </label>
            <label>
              Middle Name:
              <input
                type="text"
                name="middleName"
                value={updatedData.middleName || ''}
                onChange={handleUpdateChange}
                required
              />
            </label>
            <label>
              Department:
              <input
                type="text"
                name="department"
                value={updatedData.department || ''}
                onChange={handleUpdateChange}
                required
              />
            </label>
            <label>
              Phone Number:
              <input
                type="text"
                name="phoneNumber"
                value={updatedData.phoneNumber || ''}
                onChange={handleUpdateChange}
                required
              />
            </label>
            <label>
              Location:
              <input
                type="text"
                name="location"
                value={updatedData.location || ''}
                onChange={handleUpdateChange}
                required
              />
            </label>
            <label>
              Gender:
              <select
                name="gender"
                value={updatedData.gender || ''}
                onChange={handleUpdateChange}
                required
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </label>
            <label>
              Urgency:
              <select
                name="urgency"
                value={updatedData.urgency || ''}
                onChange={handleUpdateChange}
                required
              >
                <option value="not urgent">Not Urgent</option>
                <option value="urgent">Urgent</option>
              </select>
            </label>
            <label>
              Hire Status:
              <select
                name="hired"
                value={updatedData.hired || ''}
                onChange={handleUpdateChange}
                required
              >
                <option value="not hired">Not Hired</option>
                <option value="hired">Hired</option>
              </select>
            </label>
            <button type="submit">Apply Update</button>
            <button type="button" onClick={() => setEditingRowId(null)}>Cancel</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default DataTable;
