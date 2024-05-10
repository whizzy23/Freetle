import { useState } from 'react';
import { Container, Row, Col, Card, Button, Modal, Form, Alert } from 'react-bootstrap';

const PublishedStories = () => {
  //dummy data
  const [publishedStories, setPublishedStories] = useState([{ id: 1, title: 'Story 1', description: 'This is a short description of the story with above title.' , content : 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.' ,author: "Eena Meena" }]);
  const [showModal, setShowModal] = useState(false);
  const [newStory, setNewStory] = useState({ title: '', description: '', content: '' });
  const [emptyFieldError, setEmptyFieldError] = useState('');

  const handleAddStory = () => {
    if (!newStory.title.trim() || !newStory.description.trim() || !newStory.content.trim()) {
      setEmptyFieldError('All fields are required');
    }
    else{
      setPublishedStories([...publishedStories, { ...newStory, id: publishedStories.length + 1 }]);
      setNewStory({ title: '', description: '', content: '' });
      setEmptyFieldError('');
      setShowModal(false);
    }
  };

  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handleDeleteStory = (id) => {
    const updatedStories = publishedStories.filter(story => story.id !== id);
    setPublishedStories(updatedStories);
  };

  return (
    <Container className="mt-5">
      <h1 className="text-center mb-4">Your Published Stories</h1>
      <Row>
        <Col>
          {publishedStories.length === 0 ? (
            <Alert variant="info" className="text-center">You have not published any story yet.</Alert>
          ) : (
            <Row xs={1} md={2} lg={3} className="g-4">
              {publishedStories.map(story => (
                <Col key={story.id}>
                    <Card className="h-100 clickable story-cards card-hover">
                      <Card.Body>
                        <a href={`/publications/story/${story.id}`} className="card-link">
                          <Card.Title>{story.title}</Card.Title>
                          <Card.Text>{story.description}</Card.Text>
                        </a>
                        <Button variant="secondary" onClick={() => handleDeleteStory(story.id)} className="delete-button mt-3">Delete</Button>
                      </Card.Body>
                    </Card>
                </Col>
              ))}
            </Row>
          )}
        </Col>
      </Row>
      <div className="text-center">
        <Button variant="dark" className="mt-4" onClick={handleOpenModal}>Upload Story</Button>
      </div>
      
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Upload Story</Modal.Title>
        </Modal.Header>
        <Modal.Body className='p-4'>
          <Form>
            <Form.Group className='fw-bold' controlId="formTitle">
              <Form.Label>Title</Form.Label>
              <Form.Control type="text" placeholder="Enter title" value={newStory.title} onChange={(e) => setNewStory({ ...newStory, title: e.target.value })} required />
            </Form.Group>
            <Form.Group className='fw-bold' controlId="formDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control as="textarea" rows={3} placeholder="Enter description" value={newStory.description} onChange={(e) => setNewStory({ ...newStory, description: e.target.value })} required />
            </Form.Group>
            <Form.Group className='fw-bold' controlId="formContent">
              <Form.Label>Content</Form.Label>
              <Form.Control as="textarea" rows={5} placeholder="Enter content" value={newStory.content} onChange={(e) => setNewStory({ ...newStory, content: e.target.value })} required />
            </Form.Group>
            {emptyFieldError && <Alert variant="danger">{emptyFieldError}</Alert>}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>Cancel</Button>
          <Button variant="dark " onClick={handleAddStory}>Upload</Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default PublishedStories;
