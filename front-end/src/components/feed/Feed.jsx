// src/components/feed/Feed.jsx
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

const Feed = ({ onLoaded }) => {
  const { contentId } = useParams();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await fetch(`/api/community/${contentId}`);
        if (!res.ok) throw new Error('게시글 불러오기 실패');
        const data = await res.json();
        onLoaded(data);
      } catch (err) {
        console.error(err);
        alert(err.message);
      }
    };

    fetchPost();
  }, [contentId, onLoaded]);

  return null; // 데이터만 불러오고, 화면은 부모가 렌더링
};

export default Feed;
