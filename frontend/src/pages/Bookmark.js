import { useEffect } from 'react';
import { Container, Row, Col, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useBookmarkContext } from '../hooks/useBookmarkContext';
import { useAuthContext } from '../hooks/useAuthContext';

//components
import BookmarkCards from '../components/bookmarkCards';

const BookmarkPage = () => {
  const { dispatchBookmark,bookmarks } = useBookmarkContext();

  const { user } = useAuthContext();

  useEffect(() => {
    const fetchBookmarks = async () => {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/bookmarks` ,{
        headers: {'Authorization': `Bearer ${user.token}`},});
      const json = await response.json();
      if(response.ok) {
        dispatchBookmark({ type: 'SET_BOOKMARKS', payload: json });
      }
    };
    if (user){
      fetchBookmarks();
    }
  }, [dispatchBookmark,user]);

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
                <Col key={bookmark._id}>
                  <Link to={`/story/${bookmark.bookmarkStory._id}`} className="card-link">
                    <BookmarkCards story={bookmark.bookmarkStory} key={bookmark.bookmarkStory._id} />
                  </Link>
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
