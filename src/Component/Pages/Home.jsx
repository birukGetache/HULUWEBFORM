import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NavBar from '../NavBar';
import Form from '../Form';
import DataTable from '../DataTable';
import BlogPage from './BlogPage';
import './HomePage.css'; // Optional: For styling

const HomePage = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    middleName: '',
    department: '',
    phoneNumber: '',
    location: '',
    gender: '',
    hiredBy:'',
    urgency: 'not urgent',
    hired: 'not hired',
    experience: '', // To track the selected experience option
    yearsOfExperience: '' // To track the number of years of experience
  });

  const [dataList, setDataList] = useState([]);
  const [activeView, setActiveView] = useState('form'); // State to track active view

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const timestamp = new Date().toLocaleString();
    const dataToSend = { ...formData, createdAt: timestamp };

    try {
      await axios.post('http://localhost:5000/api/submit', dataToSend);
      setFormData({
        firstName: "",
        middleName: '',
        department: '',
        phoneNumber: '',
        location: '',
        gender: '',
        urgency: 'not urgent',
        hired: 'not hired',
        experience: '',
        yearsOfExperience: '',
      });
      setActiveView('table'); // Switch to the table view after submission
    } catch (error) {
      console.error('Error submitting form data:', error);
    }
  };

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/data');
      setDataList(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    if (activeView === 'table') {
      fetchData(); // Fetch data when switching to the table view
    }
  }, [activeView]);

  return (
    <div className="container">
      <NavBar setActiveView={setActiveView} />
      {activeView === 'form' && (
        <Form
          formData={formData}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
        />
      )}
      {activeView === 'table' && (
        <DataTable dataList={dataList} setDataList={setDataList} />
      )}
      {activeView === 'blog' && (
        <BlogPage />
      )}
    </div>
  );
};

export default HomePage;
