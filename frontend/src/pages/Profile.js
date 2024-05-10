import { useState } from 'react';
import { Container, Row, Col, Card, Button, Image, Modal, Form } from 'react-bootstrap';

const Profile = () => {
  const [showModal , setShowModal] = useState(false);
  const [userData  , setUserData] = useState({name:'',penName:'',bio:''});
  const [nameError , setNameError] = useState('');
  const [penNameError , setPenNameError] = useState('');

  const handleCloseModal = () => {
    setShowModal(false);
    setNameError(''); // Clear any previous error message when modal is closed
  }

  const handleShowModal = () => setShowModal(true);

  const handleInputChanges = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData , [name]: value });
  }

  const handleSaveChanges = (e) => {
    e.preventDefault();
    if (!userData.name.trim() && !userData.penName.trim()) {
      setNameError('Please enter your name');
      setPenNameError('Please enter your pen name')
    }
    else if (!userData.name.trim()) {
      setNameError('Please enter your name');
      setPenNameError('')
    }
    else if (!userData.penName.trim() ) {
      setPenNameError('Please enter your pen name');
      setNameError('')
    }
    else{
      console.log("Changes submitted:",userData);
      setNameError('')
      setPenNameError('')
      handleCloseModal();
    }
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-md-center">
        <Col md={6}>
          <Card className="text-center">
            <Image variant="top" src="https://via.placeholder.com/150" className="rounded-circle mx-auto mt-4 border border-1 border-dark " width={150} height={150} />
            <Card.Body>
              <Card.Title>{userData.name}</Card.Title>
              <Card.Text className='lead fst-italic'>{userData.penName}</Card.Text>
              <Card.Text>{userData.bio}</Card.Text>
              <Button variant="dark" className="mb-3" onClick={handleShowModal}>Edit Profile</Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="profileFormName">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" name="name" placeholder="Enter your name" onChange={handleInputChanges} value={userData.name} required />
              {nameError && <Form.Text className="text-danger">{nameError}</Form.Text>}
            </Form.Group>
            <Form.Group controlId="profileFormPenName">
              <Form.Label>Pen Name</Form.Label>
              <Form.Control type="text" name="penName" placeholder="Enter your pen name" onChange={handleInputChanges} value={userData.penName} required />
              {penNameError && <Form.Text className="text-danger">{penNameError}</Form.Text>}
            </Form.Group>
            <Form.Group controlId="profileFormDescription">
              <Form.Label>Bio</Form.Label>
              <Form.Control as="textarea" rows={3} name="bio" placeholder="Enter a brief description about yourself" value={userData.bio} onChange={handleInputChanges} required />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>Cancel</Button>
          <Button variant="dark" onClick={handleSaveChanges}>Save Changes</Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Profile;

