import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Form, Input, Button, ButtonContainer } from '../StyledComponent';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await response.json();
      console.log(response)
      if (response.ok) {
        localStorage.setItem('token', data.token);
        navigate('/'); // Redirect to a dashboard or home page
      } else {
        alert(data.error);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred');
    }
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <h2 style={{ textAlign: "center" }}>Login</h2>
        <Input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <Input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <ButtonContainer>
          <Button type="submit">Login</Button>
        </ButtonContainer>
      </Form>
    </Container>
  );
};

export default Login;
