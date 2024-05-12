import { Card , Button } from 'react-bootstrap'

const BookmarkCards = ({story}) => {
  
    const deleteBookmark = async (e) => {
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
            <Card.Body>
                <Card.Title>{story.title}</Card.Title>
                <Card.Text>{story.description}</Card.Text>
            </Card.Body>
            <Card.Footer className='d-flex justify-content-between'>
                <span>Author : {story.author}</span>
                <Button variant="secondary gradient" size="sm" onClick={deleteBookmark}>Remove</Button>
            </Card.Footer>
        </Card>
    );
}
  
export default BookmarkCards