import { Card , Button } from 'react-bootstrap'
import { useBookmarkContext } from '../hooks/useBookmarkContext'
import { useAuthContext } from '../hooks/useAuthContext'
import { toast } from 'react-toastify'

const BookmarkCards = ({story}) => {
    const { user } = useAuthContext()
    const { dispatchBookmark } = useBookmarkContext()
  
    const deleteBookmark = async (e) => {
        e.preventDefault()
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/bookmarks/` + story._id , {
            method:"DELETE",
            headers: {'Authorization' : `Bearer ${user.token}`}
        })

        const json = await response.json()

        if (!response.ok) {
            console.log(json.error)
        }
        else{
            dispatchBookmark({ type: 'DELETE_BOOKMARK', payload: json })
            dispatchBookmark({ type: 'SET_BOOKMARKS', payload: await fetch(`${process.env.REACT_APP_API_URL}/api/bookmarks`,{
                headers: {'Authorization': `Bearer ${user.token}`},})
                .then(res => res.json()) 
            }); // Update bookmarks so that globally bookmarked stories are updated
            toast.success('Bookmark removed')
        }
    }

    return (
        <Card className="story-cards h-100 card-hover">
            {story.coverImageUrl && (
                <Card.Img
                variant="top"
                src={story.coverImageUrl}
                style={{ objectFit: 'cover', height: '150px', width: '100%' }}
                />
            )}
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