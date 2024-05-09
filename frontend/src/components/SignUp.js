import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const SignUp = () => {
  const [loginFormData, setLoginFormData] = useState({ email: '', password: '' });
  const [signupFormData, setSignupFormData] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [activeTab, setActiveTab] = useState('login');
  const [loginFormError, setLoginFormError] = useState('');
  const [signupFormError, setSignupFormError] = useState('');

  const handleLoginInputChange = (e) => {
    const { name, value } = e.target;
    setLoginFormData({ ...loginFormData, [name]: value });
  };

  const handleSignupInputChange = (e) => {
    const { name, value } = e.target;
    setSignupFormData({ ...signupFormData, [name]: value });
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    // Clear form error when switching tabs
    if (tab === 'login') {
      setSignupFormError('');
    }
    else {
      setLoginFormError('');
    }
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (!loginFormData.email.trim() || !loginFormData.password.trim()) {
      setLoginFormError('All fields are required');
      return;
    }
    // To implement login ref code
    console.log('Login form submitted:', loginFormData);
    setLoginFormData({ email: '', password: '' });
    // Clear form error after successful submission
    setLoginFormError('');
  };

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    if (!signupFormData.name || !signupFormData.email || !signupFormData.password || !signupFormData.confirmPassword) {
      setSignupFormError('All fields are required.');
      return;
    }
    // To implement signup ref code
    console.log('Signup form submitted:', signupFormData);
    setSignupFormData({ name: '', email: '', password: '', confirmPassword: '' });
    // Clear form error after successful submission
    setSignupFormError('');
  };

  return (
    <Container className='pb-5'>
      <Row className="justify-content-md-center mt-5">
        <Col xs={12} md={6}>
          <div className="login-signup-form">
            <div className="tabs">
              <Button variant={activeTab === 'login' ? 'dark' : 'light'} onClick={() => handleTabChange('login')}>Login</Button>
              <Button variant={activeTab === 'signup' ? 'dark' : 'light'} onClick={() => handleTabChange('signup')}>Signup</Button>
            </div>
            {activeTab === 'login' ? (
              <Form onSubmit={handleLoginSubmit}>
                <Form.Group controlId="loginFormEmail" className='my-2'>
                  <Form.Label>Email address</Form.Label>
                  <Form.Control type="email" name="email" value={loginFormData.email} onChange={handleLoginInputChange} placeholder="Enter Email" />
                </Form.Group>
                <Form.Group controlId="loginFormPassword" className='my-2'>
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" name="password" value={loginFormData.password} onChange={handleLoginInputChange} placeholder="Password" />
                </Form.Group>
                {loginFormError && <Alert variant="danger">{loginFormError}</Alert>}
                <Button variant="dark" type="submit" className='mt-2'>Login</Button>
              </Form>
            ) : (
              <Form onSubmit={handleSignupSubmit}>
                <Form.Group controlId="signupFormName" className='my-2'>
                  <Form.Label>Name</Form.Label>
                  <Form.Control type="text" name="name" value={signupFormData.name} onChange={handleSignupInputChange} placeholder="Enter Name" />
                </Form.Group>
                <Form.Group controlId="signupFormEmail" className='my-2'>
                  <Form.Label>Email address</Form.Label>
                  <Form.Control type="email" name="email" value={signupFormData.email} onChange={handleSignupInputChange} placeholder="Enter email" />
                </Form.Group>
                <Form.Group controlId="signupFormPassword" className='my-2'>
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" name="password" value={signupFormData.password} onChange={handleSignupInputChange} placeholder="Password" />
                </Form.Group>
                <Form.Group controlId="signupFormConfirmPassword" className='my-2'>
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control type="password" name="confirmPassword" value={signupFormData.confirmPassword} onChange={handleSignupInputChange} placeholder="Confirm Password" />
                </Form.Group>
                {signupFormError && <Alert variant="danger">{signupFormError}</Alert>}
                <Button variant="dark" type="submit" className='mt-2'>Signup</Button>
              </Form>
            )}
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default SignUp;
