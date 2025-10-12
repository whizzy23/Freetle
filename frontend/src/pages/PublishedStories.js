import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Alert } from 'react-bootstrap';
import { useUserContext } from '../hooks/useUserContext';
import { useAuthContext } from '../hooks/useAuthContext';
import { useStoriesContext } from '../hooks/useStoriesContext';
import StoryCardsDetails from '../components/storyCardsDetails';
import StoryForm from '../components/storyForm';

const PublishedStories = () => {
  const { userData,dispatchUser } = useUserContext();
  const { user } = useAuthContext();
  const { userStories,dispatchStory } = useStoriesContext();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const [userDetailsResponse, userStoriesResponse] = await Promise.all([
          fetch(`${process.env.REACT_APP_API_URL}/api/user/details`, {
            headers: { 'Authorization': `Bearer ${user.token}` },
          }),
          fetch(`${process.env.REACT_APP_API_URL}/api/stories/userStories`, {
            headers: { 'Authorization': `Bearer ${user.token}` },
          })
        ]);

        const userDetails = await userDetailsResponse.json();
        const userStories = await userStoriesResponse.json();

        if (!userDetailsResponse.ok) throw new Error(userDetails.error);
        if (!userStoriesResponse.ok) throw new Error(userStories.error);

        dispatchUser({ type: 'SET_USER', payload: userDetails });
        dispatchStory({ type: 'SET_USER_STORIES', payload: userStories });
      } 
      catch (error) {
        console.error('Error fetching data:', error.message);
      }
    }
    if (user) {
      fetchUserData();
    }
  }, [dispatchUser, dispatchStory, user]);

  return (
    <Container className='mb-5'>
      <h1 className="text-center mt-5">Your Published Stories</h1>
      <div className="d-flex justify-content-end mb-4">
        <StoryForm userData={userData} />
      </div>
      <Row>
        <Col>
          {userStories.length === 0 ? (
            <Alert variant="info" className="text-center">You have not published any story yet.</Alert>
          ) : (
            <Row xs={1} md={2} lg={3} className="g-4">
              {userStories.map(story => (
                <Col key={user._id+story._id}>
                  <Link to={`/story/${story._id}`} className="card-link">
                    <StoryCardsDetails story={story} key={story._id} isPublicationPage={true} isUserStory={story.user_id === userData._id}/>
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

export default PublishedStories;
