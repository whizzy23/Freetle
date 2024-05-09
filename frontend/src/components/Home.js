import React, { useState } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const Home = () => {
  const [stories, setStories] = useState([
    { id: 1, title: 'Story 1', description: 'This is a short description of the story with above title.' , content : 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.' ,author: "Eena Meena" },
    { id: 2, title: 'Story 1', description: 'This is a short description of the story with above title.' , content : 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.' ,author: "Eena Meena" },
    { id: 3, title: 'Story 1', description: 'This is a short description of the story with above title.' , content : 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.' ,author: "Eena Meena" },
    { id: 4, title: 'Story 1', description: 'This is a short description of the story with above title.' , content : 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.' ,author: "Eena Meena" },
    { id: 5, title: 'Story 1', description: 'This is a short description of the story with above title.' , content : 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.' ,author: "Eena Meena" },
    { id: 6, title: 'Story 1', description: 'This is a short description of the story with above title.' , content : 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.' ,author: "Eena Meena" },
    { id: 7, title: 'Story 1', description: 'This is a short description of the story with above title.' , content : 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.' ,author: "Eena Meena" },
    { id: 8, title: 'Story 1', description: 'This is a short description of the story with above title.' , content : 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.' ,author: "Eena Meena" },
    { id: 9, title: 'Story 1', description: 'This is a short description of the story with above title.' , content : 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.' ,author: "Eena Meena" },
    { id: 10, title: 'Story 1', description: 'This is a short description of the story with above title.' , content : 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.' ,author: "Eena Meena" },
    { id: 11, title: 'Story 1', description: 'This is a short description of the story with above title.' , content : 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.' ,author: "Eena Meena" },
    { id: 12, title: 'Story 1', description: 'This is a short description of the story with above title.' , content : 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.' ,author: "Eena Meena" },
    { id: 13, title: 'Story 1', description: 'This is a short description of the story with above title.' , content : 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.' ,author: "Eena Meena" },
    { id: 14, title: 'Story 1', description: 'This is a short description of the story with above title.' , content : 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.' ,author: "Eena Meena" },
    { id: 15, title: 'Story 1', description: 'This is a short description of the story with above title.' , content : 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.' ,author: "Eena Meena" },
    { id: 16, title: 'Story 1', description: 'This is a short description of the story with above title.' , content : 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.' ,author: "Eena Meena" },
    { id: 17, title: 'Story 1', description: 'This is a short description of the story with above title.' , content : 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.' ,author: "Eena Meena" },
    { id: 18, title: 'Story 1', description: 'This is a short description of the story with above title.' , content : 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.' ,author: "Eena Meena" },
    { id: 19, title: 'Story 1', description: 'This is a short description of the story with above title.' , content : 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.' ,author: "Eena Meena" },
    { id: 20, title: 'Story 1', description: 'This is a short description of the story with above title.' , content : 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.' ,author: "Eena Meena" },
    { id: 21, title: 'Story 1', description: 'This is a short description of the story with above title.' , content : 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.' ,author: "Eena Meena" },
    ]);

  const [visibleStories, setVisibleStories] = useState(16); // Show 16 stories initially

  const loadMoreStories = () => {
    setVisibleStories(prevVisibleStories => prevVisibleStories + 20); // Load 20 more stories
  };

  return (
    <Container className='py-5'>
      <Row xs={1} sm={2} md={3} lg={4} className="g-4">
        {stories.slice(0, visibleStories).map(story => (
          <Col key={story.id}>
          <a href={`/story/${story.id}`} className="card-link">
            <Card className="story-cards h-100 card-hover">
              <Card.Body>
                <Card.Title>{story.title}</Card.Title>
                <Card.Text>{story.description}</Card.Text>
              </Card.Body>
              <Card.Footer>
                <span>Author : {story.author}</span>
              </Card.Footer>
            </Card>
          </a>
          </Col>
        ))}
      </Row>
      {visibleStories < stories.length && (
        <div className="text-center py-5">
          <Button onClick={loadMoreStories} variant='dark'>Load More</Button>
        </div>
      )}
    </Container>
  );
};

export default Home;
