import { useEffect,useState } from 'react';

//components
import StoryDetails from '../components/storyDetails';

const StoryPage = () => {

  const [story, setStory] = useState([]);

  useEffect(() => {
    const fetchStory = async () => {
      const response = await fetch(`/api/stories/${window.location.pathname}`);
      const json = await response.json();
      if(response.ok) {
        setStory(json);
      }
    };
    fetchStory();
    }, []);

  return (
    <StoryDetails story={story} key={story._id} />
  );
};

export default StoryPage;
