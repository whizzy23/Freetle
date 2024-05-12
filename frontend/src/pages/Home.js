import React, { useEffect , useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';

// components
import StoryCardsDetails from "../components/storyCardsDetails"

const Home = () => {

  const [stories, setStories] = useState([]);

  const [visibleStories, setVisibleStories] = useState(16); // Show 16 stories initially

  const [bookmarkIds, setBookmarkIds] = useState([]);

  const loadMoreStories = () => {
    setVisibleStories(prevVisibleStories => prevVisibleStories + 20); // Load 20 more stories
  };

  useEffect(() => {
  const fetchStories = async () => {
    const response = await fetch('/api/stories');
    const json = await response.json();
    if(response.ok) {
      setStories(json);
    }
  };
  fetchStories();
  }, []);

  useEffect(() => {
    const fetchBookmarks = async () => {
      const response = await fetch('/api/bookmarks');
      const json = await response.json();
      if(response.ok) {
        setBookmarkIds(json.map(bookmark => bookmark.bookmarkStory._id));
      }
    };
    fetchBookmarks();
    }, []);

  return (
    <div className="home">
        <div className="stories">
            <Container className='py-5'>
                <Row xs={1} sm={2} md={3} lg={4} className="g-4">
                    {stories && stories.slice(0, visibleStories).map(story => (
                        <Col key={story._id}>
                            <a href={`/story/${story._id}`} className="card-link">
                                <StoryCardsDetails story={story} key={story._id} bookmarkIds={bookmarkIds} />
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
        </div>
    </div>
  );
};

export default Home;
