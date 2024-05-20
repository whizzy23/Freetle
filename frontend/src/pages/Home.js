import { useEffect , useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useStoriesContext } from '../hooks/useStoriesContext';
import { useBookmarkContext } from '../hooks/useBookmarkContext';
import { useAuthContext } from '../hooks/useAuthContext';
import { Link } from 'react-router-dom';

// components
import StoryCardsDetails from "../components/storyCardsDetails"

const Home = () => {

  const {user} = useAuthContext();

  const {dispatchBookmark} = useBookmarkContext();

  const {stories,dispatchStory} = useStoriesContext();

  const [visibleStories, setVisibleStories] = useState(16); // Show 16 stories initially

  const loadMoreStories = () => {
    setVisibleStories(prevVisibleStories => prevVisibleStories + 20); // Load 20 more stories
  };

  useEffect(() => {
    const fetchBookmarksAndStories = async () => {
      try {
        const bookmarksResponse = await fetch('/api/bookmarks', {
        headers: {'Authorization': `Bearer ${user.token}`},})
        const bookmarksJson = await bookmarksResponse.json();
        if (bookmarksResponse.ok) {
          dispatchBookmark({ type: 'SET_BOOKMARKS', payload: bookmarksJson });

          const storiesResponse = await fetch('/api/stories' , {
            headers: {'Authorization': `Bearer ${user.token}`},});
          const storiesJson = await storiesResponse.json();
          if (storiesResponse.ok) {
            dispatchStory({ type: 'SET_STORIES', payload: storiesJson });
          } 
          else {
            console.error('Error fetching stories:', storiesJson);
          }
        } 
        else {
          console.error('Error fetching bookmarks:', bookmarksJson);
        }
      } 
      catch (error) {
        console.error('Fetch error:', error);
      }
    };
  
    if (user){
      fetchBookmarksAndStories();
    }
  }, [dispatchBookmark, dispatchStory,user]);

  return (
    <div className="home">
        <div className="stories">
            <Container className='py-5'>
                <Row xs={1} sm={2} md={3} lg={4} className="g-4">
                    {stories && stories.slice(0, visibleStories).map(story => (
                        <Col key={story._id}>
                            <Link to={`/story/${story._id}`} className="card-link">
                                <StoryCardsDetails story={story} key={story._id}  />
                            </Link>
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
