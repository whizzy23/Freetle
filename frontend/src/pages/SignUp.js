import { useState } from 'react';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';
import { useSignup } from '../hooks/useSignup';
import { useLogin } from '../hooks/useLogin';
import { toast } from 'react-toastify';
import ReCAPTCHA from 'react-google-recaptcha';
import 'bootstrap/dist/css/bootstrap.min.css';

const SignUp = () => {
  const { signup, error: signupError, isLoading: isSignupLoading } = useSignup();
  const { login, error: loginError, isLoading: isLoginLoading } = useLogin();
  const [loginFormData, setLoginFormData] = useState({ email: '', password: '' });
  const [signupFormData, setSignupFormData] = useState({ name: '', email: '', password: '', confirmPassword: '', otp: '' });
  const [activeTab, setActiveTab] = useState('login');
  const [captchaVerified, setCaptchaVerified] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [countdown, setCountdown] = useState(60);
  const [otpError, setOtpError] = useState('');
  const [isSendingOtp, setIsSendingOtp] = useState(false); 

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
    const { name, email, password, confirmPassword } = signupFormData;
    try {
      await signup(name, email, password, confirmPassword);
    }
    catch (error) {
      console.log(error);
    }
  };

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(signupFormData.email)) {
      setOtpError('Invalid email');
      return;
    }
    setIsSendingOtp(true); // Set OTP sending state to true
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/user/generateotp`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: signupFormData.email }),
    });

    const data = await response.json();
    if (response.ok) {
      setOtpSent(true);
      startCountdown();
      setOtpError('');
    } 
    else {
      setOtpError(data.error);
    }
    setIsSendingOtp(false); // Set OTP sending state to false
  };

  const handleOtpVerification = async (e) => {
    e.preventDefault();
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/user/verifyotp`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: signupFormData.email, otp: signupFormData.otp }),
    });

    if (response.ok) {
      setOtpVerified(true); // OTP is successfully verified
      toast.success('Email verified successfully');
      setOtpError('');
    } else {
      setOtpError('Invalid OTP');
    }
  };

  const startCountdown = () => {
    setCountdown(60); // 60-second countdown
    const interval = setInterval(() => {
      setCountdown((prevCount) => {
        if (prevCount <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prevCount - 1;
      });
    }, 1000);
  };

  const onCaptchaChange = () => {
    setCaptchaVerified(true);
  };

  return (
    <Container className="pb-5">
      <Row className="justify-content-md-center mt-5">
        <Col xs={12} md={6}>
          <div className="login-signup-form">
            <div className="tabs">
              <Button variant={activeTab === 'login' ? 'dark' : 'light'} onClick={() => handleTabChange('login')}>Login</Button>
              <Button variant={activeTab === 'signup' ? 'dark' : 'light'} onClick={() => handleTabChange('signup')}>Signup</Button>
            </div>

            {activeTab === 'login' ? (
              <Form onSubmit={handleLoginSubmit}>
                <Form.Group controlId="loginFormEmail" className="my-2">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control type="email" name="email" value={loginFormData.email} onChange={handleLoginInputChange} placeholder="Enter Email" />
                </Form.Group>
                <Form.Group controlId="loginFormPassword" className="my-2">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" name="password" value={loginFormData.password} onChange={handleLoginInputChange} placeholder="Password" />
                </Form.Group>
                <ReCAPTCHA sitekey={process.env.REACT_APP_RECAPTCHA_KEY} onChange={onCaptchaChange} />
                {loginError && <Alert className='mt-2' variant="danger">{loginError}</Alert>}
                <Button disabled={isLoginLoading || !captchaVerified} variant="dark" type="submit" className="mt-2">Login</Button>
              </Form>
            ) : (
              <Form onSubmit={otpVerified ? handleSignupSubmit : handleOtpVerification}>
                <Form.Group controlId="signupFormEmail" className="my-2">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control type="email" name="email" value={signupFormData.email} onChange={handleSignupInputChange} placeholder="Enter Email" disabled={otpVerified} />
                </Form.Group>

                {!otpVerified && (
                  <>
                    <Button variant="dark" onClick={handleEmailSubmit} disabled={isSendingOtp || (otpSent && countdown > 0)}>
                      {isSendingOtp ? 'Sending OTP' : otpSent ? countdown ? `Resend OTP in ${countdown}s` : 'Resend OTP' : 'Send OTP'}
                    </Button>

                    <Form.Group controlId="signupFormOTP" className="my-2">
                      <Form.Label>Enter OTP</Form.Label>
                      <Form.Control type="text" name="otp" value={signupFormData.otp} onChange={handleSignupInputChange} placeholder="Enter OTP" />
                    </Form.Group>
                    <ReCAPTCHA sitekey={process.env.REACT_APP_RECAPTCHA_KEY} onChange={onCaptchaChange} />
                  </>
                )}

                {otpVerified && (
                  <>
                    <Form.Group controlId="signupFormName" className="my-2">
                      <Form.Label>Name</Form.Label>
                      <Form.Control type="text" name="name" value={signupFormData.name} onChange={handleSignupInputChange} placeholder="Enter Name" />
                    </Form.Group>

                    <Form.Group controlId="signupFormPassword" className="my-2">
                      <Form.Label>Password</Form.Label>
                      <Form.Control type="password" name="password" value={signupFormData.password} onChange={handleSignupInputChange} placeholder="Password" />
                    </Form.Group>

                    <Form.Group controlId="signupFormConfirmPassword" className="my-2">
                      <Form.Label>Confirm Password</Form.Label>
                      <Form.Control type="password" name="confirmPassword" value={signupFormData.confirmPassword} onChange={handleSignupInputChange} placeholder="Confirm Password" />
                    </Form.Group>
                  </>
                )}
                
                {otpError && <Alert className="mt-2" variant="danger">{otpError}</Alert>}
                {signupError && <Alert className="mt-2" variant="danger">{signupError}</Alert>}

                <Button disabled={isSignupLoading || !captchaVerified || (!otpVerified && !otpSent)} variant="dark" type="submit" className="mt-2">
                  {otpVerified ? 'Sign Up' : 'Verify OTP'}
                </Button>
              </Form>
            )}
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default SignUp;
