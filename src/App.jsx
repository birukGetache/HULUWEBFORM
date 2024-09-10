// App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginForm from './Component/Pages/Login'; 
import HomePage from './Component/Pages/Home';
import BlogPage from './Component/Pages/BlogPage';
import AuthRoute from './Component/Routes/AuthRoute';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/" element={<AuthRoute element={HomePage} />} />
        <Route path="/blog" element={<AuthRoute element={BlogPage} />} />
      </Routes>
    </Router>
  );
}

export default App;
