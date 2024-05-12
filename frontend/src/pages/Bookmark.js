import { useState , useEffect } from 'react';
import { Container, Row, Col, Alert } from 'react-bootstrap';
import BookmarkCards from '../components/bookmarkCards';

const BookmarkPage = () => {
  const [bookmarks, setBookmarks] = useState([]);

  useEffect(() => {
    const fetchBookmarks = async () => {
      const response = await fetch('/api/bookmarks');
      const json = await response.json();
      if(response.ok) {
        setBookmarks(json);
      }
    };
    fetchBookmarks();
    }, []);

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
                <Col key={bookmark.bookmarkStory._id}>
                  <a href={`/story/${bookmark.bookmarkStory._id}`} className="card-link">
                    <BookmarkCards story={bookmark.bookmarkStory} key={bookmark.bookmarkStory._id} />
                  </a>
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
