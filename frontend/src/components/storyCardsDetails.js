import { Card } from 'react-bootstrap';
import { useState } from 'react';
import { useBookmarkContext } from '../hooks/useBookmarkContext';
import { useAuthContext } from '../hooks/useAuthContext';
import bookmark from '../assets/bookmark.svg';
import bookmarkFilled from '../assets/bookmarkfilled.svg';

const StoryCardsDetails = ({ story }) => {
  const { bookmarkIds, dispatchBookmark } = useBookmarkContext();
  const [isBookmarked, setIsBookmarked] = useState(bookmarkIds.includes(story._id));
  const { user } = useAuthContext();

  const handleBookmarkClick = async (e) => {
    e.preventDefault();
    try {
      const response = isBookmarked
        ? await fetch(`/api/bookmarks/${story._id}`, {
            method: 'DELETE' ,
            headers: {'Authorization': `Bearer ${user.token}`} 
          })
        : await fetch('/api/bookmarks/add', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json','Authorization': `Bearer ${user.token}` },
            body: JSON.stringify({ bookmarkStory: story._id }),
          });

      const json = await response.json();
      if (!response.ok) throw new Error(json.error);
      
      dispatchBookmark({ type: isBookmarked ? 'DELETE_BOOKMARK' : 'ADD_BOOKMARK', payload: json });
      dispatchBookmark({ type: 'SET_BOOKMARKS', payload: await fetch('/api/bookmarks',{           //updating bookmark status
        headers: {'Authorization': `Bearer ${user.token}`},})
        .then(res => res.json()) 
      });
      setIsBookmarked(!isBookmarked); 
    } catch (error) {
      console.error(`Error ${isBookmarked ? 'removing' : 'adding'} bookmark:`, error.message);
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
      <Card.Footer>
        <span>Author: {story.author}</span>
      </Card.Footer>
    </Card>
  );
};

export default StoryCardsDetails;
