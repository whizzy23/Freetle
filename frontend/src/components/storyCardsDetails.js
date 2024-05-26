import { useState } from 'react';
import { Card,Button } from 'react-bootstrap';
import { useBookmarkContext } from '../hooks/useBookmarkContext';
import { useStoriesContext } from '../hooks/useStoriesContext';
import { useAuthContext } from '../hooks/useAuthContext';
import bookmark from '../assets/bookmark.svg';
import bookmarkFilled from '../assets/bookmarkfilled.svg';

const StoryCardsDetails = ({ story,isPublicationPage,isUserStory }) => {
  const { bookmarkIds, dispatchBookmark } = useBookmarkContext();
  const [isBookmarked, setIsBookmarked] = useState(bookmarkIds.includes(story._id));
  const { user } = useAuthContext();
  const { dispatchStory } = useStoriesContext();

  const handleBookmarkClick = async (e) => {
    e.preventDefault();
    try {
      const response = isBookmarked
        ? await fetch(`${process.env.REACT_APP_API_URL}/api/bookmarks/${story._id}`, {
            method: 'DELETE' ,
            headers: {'Authorization': `Bearer ${user.token}`} 
          })
        : await fetch(`${process.env.REACT_APP_API_URL}/api/bookmarks/add`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json','Authorization': `Bearer ${user.token}` },
            body: JSON.stringify({ bookmarkStory: story._id }),
          });

      const json = await response.json();
      if (!response.ok) throw new Error(json.error);
      
      dispatchBookmark({ type: isBookmarked ? 'DELETE_BOOKMARK' : 'ADD_BOOKMARK', payload: json });
      dispatchBookmark({ type: 'SET_BOOKMARKS', payload: await fetch(`${process.env.REACT_APP_API_URL}/api/bookmarks`,{           //updating bookmark status
        headers: {'Authorization': `Bearer ${user.token}`},})
        .then(res => res.json()) 
      });
      setIsBookmarked(!isBookmarked); 
    } catch (error) {
      console.error(`Error ${isBookmarked ? 'removing' : 'adding'} bookmark:`, error.message);
    }
  }

  const handleDeleteStory = async (e) => {
    e.preventDefault();
    try {
      //first remove bookmark
      if (isBookmarked) {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/bookmarks/${story._id}`, {
          method: 'DELETE' ,
          headers: {'Authorization': `Bearer ${user.token}`} 
        })
        const json = await response.json();
      if (!response.ok) throw new Error(json.error);
      
      dispatchBookmark({ type: isBookmarked ? 'DELETE_BOOKMARK' : 'ADD_BOOKMARK', payload: json });
      }

      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/stories/story/${story._id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${user.token}` },
      });
      const json = await response.json();
      if (!response.ok) throw new Error(json.error);
      dispatchStory({ type: 'DELETE_STORY', payload: json });
      dispatchStory({ type: 'SET_STORIES', payload: await fetch(`${process.env.REACT_APP_API_URL}/api/stories`,{           //updating stories
        headers: {'Authorization': `Bearer ${user.token}`},})
        .then(res => res.json())
      });
      dispatchStory({ type: 'SET_USER_STORIES', payload: await fetch(`${process.env.REACT_APP_API_URL}/api/stories/userStories`,{           //updating stories
        headers: {'Authorization': `Bearer ${user.token}`},})
        .then(res => res.json()) 
      });
    } 
    catch (error) {
      console.error('Failed to delete story:', error.message);
    }
  }

  return (
    <Card className="story-cards h-100 card-hover">
      { <img
          src={isBookmarked ? bookmarkFilled : bookmark} //to show bookmark icon acording to bookmarked or not
          alt="bookmark-icon"
          onClick={handleBookmarkClick}
          className="bookmark img-fluid position-absolute end-0 mt-3 me-2 p-1 border border-dark rounded-3"
        />
      }
      <Card.Body className="me-3">
        <Card.Title className="pe-3">{story.title}</Card.Title>
        <Card.Text>{story.description}</Card.Text>
      </Card.Body>
      <Card.Footer className='d-flex justify-content-between'>
        <span>Author: {story.author}</span>
        {isPublicationPage && isUserStory && (                  // show delete button only on user's story and on publication page
        <Button variant="secondary gradient" size="sm" onClick={handleDeleteStory}>Remove</Button>
        )}
      </Card.Footer>
    </Card>
  );
};

export default StoryCardsDetails;
