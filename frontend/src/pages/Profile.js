import { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button, Image, Modal, Form } from 'react-bootstrap';
import { useUserContext } from '../hooks/useUserContext';
import { useAuthContext } from '../hooks/useAuthContext';
import { toast } from 'react-toastify';

const Profile = () => {
  const [showModal , setShowModal] = useState(false)
  const [userDetails , setUserDetails] = useState({ name:'', penName:'', bio:'' });
  const [nameError , setNameError] = useState('');
  const { userData , dispatchUser } = useUserContext();
  const { user } = useAuthContext();

  const handleCloseModal = () => setShowModal(false);
  
  const handleShowModal = () => {
    setShowModal(true);
    setUserDetails(userData);
    setNameError('');
  }

  const handleInputChanges = (e) => {
    const { name, value } = e.target;
    setUserDetails({ ...userDetails , [name]: value });
  }

  const handleSaveChanges = async (e) => {
    e.preventDefault();
    if (!userDetails.name.trim()) {
      setNameError('Please enter your name');
    }
    else{
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/user/update`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`
        },
        body: JSON.stringify(userDetails)
      });

      const json = await response.json();
      
      if (!response.ok) {
        console.error('Error updating user profile:', json.error);
      }
      else {
        dispatchUser({ type: 'UPDATE_USER', payload: json });
        dispatchUser({ type: 'SET_USER', payload: json });
        toast.success('Profile updated successfully');
        setNameError('')
        handleCloseModal();
      }
    }
  }

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/user/details`, {
          headers: { 'Authorization': `Bearer ${user.token}` },
        });
        const json = await response.json();
        if (!response.ok) throw new Error(json.error);
        dispatchUser({ type: 'SET_USER', payload: json });
        setUserDetails(json);
      }
      catch (error) {
        console.error('Error fetching user data:', error.message);
      }
    }
    if (user) {
      fetchUserDetails();
    }
  } , [dispatchUser,user]);

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
              <Form.Control type="text" name="name" placeholder="Enter your name" onChange={handleInputChanges} value={userDetails.name} required />
              {nameError && <Form.Text className="text-danger">{nameError}</Form.Text>}
            </Form.Group>
            <Form.Group controlId="profileFormPenName">
              <Form.Label>Pen Name</Form.Label>
              <Form.Control type="text" name="penName" placeholder="Enter your pen name" onChange={handleInputChanges} value={userDetails.penName} required />
            </Form.Group>
            <Form.Group controlId="profileFormDescription">
              <Form.Label>Bio</Form.Label>
              <Form.Control as="textarea" rows={3} name="bio" placeholder="Enter a brief description about yourself" onChange={handleInputChanges} value={userDetails.bio} required />
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

