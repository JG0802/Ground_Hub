import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FeedCard from './FeedCard';

const FeedList = ({ category }) => {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCommunity = async () => {
      try {
        const res = await fetch(`/api/community/category/${category}`);
        const data = await res.json();
        setPosts(data);
      } catch (err) {
        console.error('커뮤니티 불러오기 실패:', err);
      }
    };

    fetchCommunity();
  }, [category]);

  return (
    <>
      {posts.map(post => (
        <FeedCard key={post.contentId} post={post} onClick={() => navigate(`/feed/${post.contentId}`)} />
      ))}
    </>
  );
};

export default FeedList;
