import { useState, useEffect} from 'react';
import { Card, Form, Button, Image, Collapse } from 'react-bootstrap';
import { useAuthContext } from '../hooks/useAuthContext';
import { useCommentContext } from '../hooks/useCommentContext';
import { useUserContext } from '../hooks/useUserContext';
import deleteIcon from '../assets/delete.svg';

// date fns
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const StoryDetails = ({ story }) => {
    const { comments, dispatchComment } = useCommentContext();
    const [newComment, setNewComment] = useState('');
    const [showComments, setShowComments] = useState(false);

    const { user } = useAuthContext();
    const { userData,dispatchUser } = useUserContext();

    const handleCommentSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/comments/${story._id}/createComment`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`,
                },
                body: JSON.stringify({ comment: newComment }),
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            dispatchComment({ type: 'ADD_COMMENT', payload: data });
            setNewComment('');
        } 
        catch (error) {
            console.error("Error posting comment:", error);
        }
    };

    const handleDeleteComment = async (comment) => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/comments/${comment._id}`, {
                method: 'DELETE',
                headers: {'Authorization': `Bearer ${user.token}`},
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            dispatchComment({ type: 'DELETE_COMMENT', payload: comment });
        } 
        catch (error) {
            console.error("Error deleting comment:", error);
        }
    };
    
    useEffect(() => {
        const fetchUserDataAndComments = async () => {
          try {
            const [userResponse, commentsResponse] = await Promise.all([
              fetch(`${process.env.REACT_APP_API_URL}/api/user/details`, {
                headers: { 'Authorization': `Bearer ${user.token}` },
              }),
              fetch(`${process.env.REACT_APP_API_URL}/api/comments/${story._id}`, {
                headers: { 'Authorization': `Bearer ${user.token}` }
              })
            ]);
    
            const userDetails = await userResponse.json();
            const comments = await commentsResponse.json();
    
            if (!userResponse.ok) throw new Error(userDetails.error);
            if (!commentsResponse.ok) throw new Error(comments.error);
    
            dispatchUser({ type: 'SET_USER', payload: userDetails });
            dispatchComment({ type: 'SET_COMMENTS', payload: comments });
          } 
          catch (error) {
            console.error('Error fetching data:', error.message);
          }
        }
        if (user) {
          fetchUserDataAndComments();
        }
      }, [dispatchUser, dispatchComment, user, story._id]);
        

    return (
        <div className="container-xl">
            <div className="d-flex justify-content-center align-items-center p-0 pb-5 p-md-4">
                <Card className="story-card p-1 p-md-3 mt-4 border-primary border-1 rounded">
                    <Card.Body>
                        <Card.Title className="story-title fs-1 mb-3">{story.title}</Card.Title>
                        <Card.Text className="story-content">{story.content}</Card.Text>

                        <Button variant="secondary" onClick={() => setShowComments(!showComments)} aria-controls="comments-collapse" aria-expanded={showComments} className="mb-3" >
                            {showComments ? 'Hide Comments' : 'Show Comments'}
                        </Button>

                        <Collapse in={showComments}>
                            <div id="comments-collapse" className="bg-light bg-gradient p-4 rounded shadow-lg mt-4">
                                <h3 className="mb-3">Comments</h3>
                                <Form onSubmit={handleCommentSubmit} className="mb-4">
                                    <Form.Group controlId="newComment" className="mb-3">
                                        <Form.Control type="text" placeholder="Write a comment..." value={newComment} onChange={(e) => setNewComment(e.target.value)} className="p-2 rounded-3 shadow-sm" />
                                    </Form.Group>
                                    <Button variant="dark" type="submit">Add Comment</Button>
                                </Form>
                                {comments.length === 0 ? (
                                    <h5 className='fw-light fst-italic'>Be the first one to comment !</h5>
                                ) : (
                                comments.map((comment, index) => (
                                <Card key={index} className="mb-2 rounded-4 shadow-sm">
                                    <Card.Body>
                                        <div>
                                            <strong>{comment.user_name}</strong>
                                            <Card.Text className="comment-content pt-2">{comment.comment}</Card.Text>
                                            <small className="text-muted comment-date">{formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}</small>
                                            {user && comment.user_id === userData._id && (
                                                <Image role="button" className="position-absolute end-0 me-2 border border-dark rounded" src={deleteIcon} onClick={() => handleDeleteComment(comment)} />
                                            )}
                                        </div>
                                    </Card.Body>
                                </Card>
                                ))
                                )}
                            </div>
                        </Collapse>
                    </Card.Body>
                </Card>
            </div>
        </div>
    );
};

export default StoryDetails;
