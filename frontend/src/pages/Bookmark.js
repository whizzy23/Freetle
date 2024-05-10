import { useState } from 'react';
import { Container, Row, Col, Card, Button, Alert } from 'react-bootstrap';

const BookmarkPage = () => {
  //dummy bookmarks
  const [bookmarks, setBookmarks] = useState([
    { id: 1, title: 'Story 1', description: 'This is a short description of the story with above title.' , content : 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat .' ,author: "Eena Meena" },
    { id: 2, title: 'Story 1', description: 'This is a short description of the story with above title.' , content : 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat .' ,author: "Eena Meena" },
    { id: 3, title: 'Story 1', description: 'This is a short description of the story with above title.' , content : 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat .' ,author: "Eena Meena" },
    { id: 4, title: 'Story 1', description: 'This is a short description of the story with above title.' , content : 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat .' ,author: "Eena Meena" },
    { id: 5, title: 'Story 1', description: 'This is a short description of the story with above title.' , content : 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat .' ,author: "Eena Meena" },
  ]);

  // Function to remove a bookmark
  const handleRemoveBookmark = (id) => {
    setBookmarks(bookmarks.filter(bookmark => bookmark.id !== id));
  };

  return (
    <Container className="pt-5 pb-5">
      <Row>
        <Col>
          <h1 className="text-center mb-4">My Bookmarks</h1>
          {bookmarks.length === 0 ? (
            <Alert variant="info" className="text-center">You have no bookmarks yet.</Alert>
          ) : (
            <Row xs={1} md={2} lg={3} className="g-4">
              {bookmarks.map(bookmark => (
                <Col key={bookmark.id}>
                  <Card className="story-cards h-100 card-hover">
                    <a href={`/story/${bookmark.id}`} className="card-link">
                      <Card.Body>
                        <Card.Title>{bookmark.title}</Card.Title>
                        <Card.Text>{bookmark.description}</Card.Text>
                      </Card.Body>
                    </a>
                    <Card.Footer>
                      <Button variant="secondary gradient" size="sm" onClick={() => handleRemoveBookmark(bookmark.id)}>Remove</Button>
                    </Card.Footer>
                  </Card>
                </Col>
              ))}
            </Row>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default BookmarkPage;
