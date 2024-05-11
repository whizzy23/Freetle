import { Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../custom.css';

const StoryDetails = ({story}) => {
  return (
    <div className="container-xl ">
      <div className="d-flex justify-content-center align-items-center p-4 ">
        <Card className="story-card p-3 mt-4 border-primary border-1 rounded">
          <Card.Body>
            <Card.Title className="story-title fs-1 mb-3">{story.title}</Card.Title>
            <Card.Text className="story-content fs-5">{story.content}</Card.Text>
          </Card.Body>
        </Card>
      </div>
    </div>
  );

  }
  
export default StoryDetails