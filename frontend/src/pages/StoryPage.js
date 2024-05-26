import { useEffect,useState } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';
//components
import StoryDetails from '../components/storyDetails';

const StoryPage = () => {
  const { user } = useAuthContext();
  const [story, setStory] = useState([]);

  useEffect(() => {
    const fetchStory = async () => {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/stories/${window.location.pathname}` ,{
      headers: {'Authorization': `Bearer ${user.token}`},});
      const json = await response.json();
      if(response.ok) {
        setStory(json);
      }
    };

    if (user) {
    fetchStory();
    }
    }, [user]);

  return (
    <StoryDetails story={story} key={story._id} />
  );
};

export default StoryPage;
