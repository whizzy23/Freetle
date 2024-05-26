import { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { useAuthContext } from '../hooks/useAuthContext';

const Contact = () => {
  const [messageData,setMessageData] = useState({ userName: '' , userEmail: '' , userMessage: '' });
  const [emptyFields,setEmptyFields] = useState([]);
  const [error,setError] = useState(null)
  const { user } = useAuthContext()

  const handleMessageInputChange = (e) => {
    const { name , value } = e.target;
    setMessageData({ ...messageData, [name]: value });
  };

  const handleMessageSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/contact/sendMessage` , {
        method:"POST",
        body:JSON.stringify(messageData),
        headers:{ 'Content-Type' : 'application/json' , 'Authorization' : `Bearer ${user.token}`}
    })
    const json = await response.json()
    
    if (!response.ok) {
        setError(json.error)
        setEmptyFields(json.emptyFields)
    }
    else{
        setError(null)
        setEmptyFields([])
        setMessageData({ ...messageData, userName:'' , userEmail:'' , userMessage:'' });
    }

  };
  
  return (
    <div>
      <Container className="py-5">
        <Row className="justify-content-center">
          <Col md={6}>
            <h2 className="text-center mb-4">Contact Us</h2>
            <Form onSubmit={handleMessageSubmit}>
              <Form.Group controlId="user_Name" className="my-3">
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" name="userName" placeholder="Enter your name" className={emptyFields.includes('userName') ? 'emptyFieldError' : '' } onChange={handleMessageInputChange} value={messageData.userName} />
              </Form.Group>
              <Form.Group controlId="user_Email" className="my-3">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" name="userEmail" placeholder="Enter your email" className={emptyFields.includes('userEmail') ? 'emptyFieldError' : '' } onChange={handleMessageInputChange} value={messageData.userEmail} />
              </Form.Group>
              <Form.Group controlId="user_Message" className="my-3">
                <Form.Label>Message</Form.Label>
                <Form.Control as="textarea" rows={5} name="userMessage" placeholder="Enter your message" className={emptyFields.includes('userMessage') ? 'emptyFieldError' : '' } onChange={handleMessageInputChange} value={messageData.userMessage} />
              </Form.Group>
              <Button variant="dark" type="submit">Submit</Button>
              {error && <div className="dispEmptyError">{error}</div>}
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Contact;
