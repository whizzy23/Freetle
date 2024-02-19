import React,{ useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';

const Contact = () => {
  const [messageData,setMessageData] = useState({ name: '', email: '' ,message: '' });

  const handleMessageInputChange = (e) => {
    const { name, value } = e.target;
    // To implement message ref code
    setMessageData({ ...messageData, [name]: value });
  };

  const handleMessageSubmit = (e) => {
    e.preventDefault();
    // To implement message ref code
    console.log('Message submitted:', messageData);
    setMessageData({ ...messageData, name:'' , email:'' , message:'' });
  };
  
  return (
    <div>
      <Container className="py-5">
        <Row className="justify-content-center">
          <Col md={6}>
            <h2 className="text-center mb-4">Contact Us</h2>
            <Form onSubmit={handleMessageSubmit}>
              <Form.Group controlId="user_Name" className="my-2">
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" name="name" placeholder="Enter your name" onChange={handleMessageInputChange} value={messageData.name} required />
              </Form.Group>
              <Form.Group controlId="user_Email" className="my-2">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" name="email" placeholder="Enter your email" onChange={handleMessageInputChange} value={messageData.email} required />
              </Form.Group>
              <Form.Group controlId="user_Message" className="my-2">
                <Form.Label>Message</Form.Label>
                <Form.Control as="textarea" rows={5} name="message" placeholder="Enter your message" onChange={handleMessageInputChange} value={messageData.message} required />
              </Form.Group>
              <Button variant="dark" type="submit">Submit</Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Contact;
