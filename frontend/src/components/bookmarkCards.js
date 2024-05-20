import { Card , Button } from 'react-bootstrap'
import { useBookmarkContext } from '../hooks/useBookmarkContext'
import { useAuthContext } from '../hooks/useAuthContext'

const BookmarkCards = ({story}) => {
    const { user } = useAuthContext()
    const { dispatchBookmark } = useBookmarkContext()
  
    const deleteBookmark = async (e) => {
        e.preventDefault()
        const response = await fetch('/api/bookmarks/' + story._id , {
            method:"DELETE",
            headers: {'Authorization' : `Bearer ${user.token}`}
        })

        const json = await response.json()

        if (!response.ok) {
            console.log(json.error)
        }
        else{
            dispatchBookmark({ type: 'DELETE_BOOKMARK', payload: json })
            dispatchBookmark({ type: 'SET_BOOKMARKS', payload: await fetch('/api/bookmarks',{
                headers: {'Authorization': `Bearer ${user.token}`},})
                .then(res => res.json()) 
            }); // Update bookmarks so that globally bookmarked stories are updated
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