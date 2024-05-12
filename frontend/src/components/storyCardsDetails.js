import { Card } from 'react-bootstrap';
import bookmark from '../assets/bookmark.svg';
import bookmarkFilled from '../assets/bookmarkfilled.svg';

const StoryCardsDetails = ({story , bookmarkIds}) => {

  const handleBookmarkClick_ADD = async (e) => {
    e.preventDefault();
    const response = await fetch('/api/bookmarks/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ bookmarkStory : story._id }),
    });
    const json = await response.json();
    if (!response.ok) {
      console.log(json.error);
    } else {
      console.log('Bookmark Added', json);
    }
  };

  const handleBookmarkClick_REMOVE = async (e) => {
    e.preventDefault()

    const response = await fetch('/api/bookmarks/' + story._id , {
        method:"DELETE"
    })

    const json = await response.json()

    if (!response.ok) {
        console.log(json.error)
    }
    else{
        // dispatch({ type: 'DELETE_WORKOUT', payload: json })
        console.log('Bookmark Removed' , json)
    }
}

  return (
    <Card className="story-cards h-100 card-hover">
    
    {bookmarkIds.includes(story._id) ? ( 
      <img src={bookmarkFilled} alt='bookmark-icon' onClick={handleBookmarkClick_REMOVE} className="bookmark img-fluid position-absolute end-0 mt-3 me-2 p-1 border border-dark rounded-3"/>
    ) : (
      <img src={bookmark} alt='bookmark-icon' onClick={handleBookmarkClick_ADD} className="bookmark img-fluid position-absolute end-0 mt-3 me-2 p-1 border border-dark rounded-3"/>    
    )} 

    <Card.Body className='me-3'>       
      <Card.Title className='pe-3'>{story.title}</Card.Title>
      <Card.Text>{story.description}</Card.Text>
    </Card.Body>
    <Card.Footer>
      <span>Author : {story.author}</span>
    </Card.Footer>
  </Card>
  );

}
  
export default StoryCardsDetails

