import { Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const StoryCardsDetails = ({story}) => {
  
  return (
    <Card className="story-cards h-100 card-hover">
    <Card.Body>
      <Card.Title>{story.title}</Card.Title>
      <Card.Text>{story.description}</Card.Text>
    </Card.Body>
    <Card.Footer>
      <span>Author : {story.author}</span>
    </Card.Footer>
  </Card>
  );

  }
  
  export default StoryCardsDetails

