import { useState } from 'react';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useSignup } from '../hooks/useSignup';
import { useLogin } from '../hooks/useLogin';

const SignUp = () => {
  const {signup, error: signupError , isLoading: isSignupLoading } = useSignup();
  const {login, error: loginError, isLoading: isLoginLoading} = useLogin();
  const [loginFormData, setLoginFormData] = useState({ email: '', password: '' });
  const [signupFormData, setSignupFormData] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [activeTab, setActiveTab] = useState('login')

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
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = loginFormData;
    await login(email, password);
  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    const {name,email,password,confirmPassword}=signupFormData;
    await signup(name, email, password,confirmPassword);
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
                {loginError && <Alert variant="danger">{loginError}</Alert>}
                <Button disabled={isLoginLoading} variant="dark" type="submit" className='mt-2'>Login</Button>
              </Form>
            ) : (
              <Form onSubmit={handleSignupSubmit}>
                <Form.Group controlId="signupFormName" className='my-2'>
                  <Form.Label>Name</Form.Label>
                  <Form.Control type="text" name="name" value={signupFormData.name} onChange={handleSignupInputChange} placeholder="Enter name" />
                </Form.Group>
                <Form.Group controlId="signupFormEmail" className='my-2'>
                  <Form.Label>Email address</Form.Label>
                  <Form.Control type="email" name="email" value={signupFormData.email} onChange={handleSignupInputChange} placeholder="Enter email" />
                </Form.Group>
                <Form.Group controlId="signupFormPassword" className='my-2'>
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" name="password" value={signupFormData.password} onChange={handleSignupInputChange} placeholder="Enter password" />
                </Form.Group>
                <Form.Group controlId="signupFormConfirmPassword" className='my-2'>
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control type="password" name="confirmPassword" value={signupFormData.confirmPassword} onChange={handleSignupInputChange} placeholder="Confirm Password" />
                </Form.Group>
                {signupError && <Alert variant="danger">{signupError}</Alert>}
                <Button disabled={isSignupLoading} variant="dark" type="submit" className='mt-2'>Signup</Button>
              </Form>
            )}
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default SignUp;
