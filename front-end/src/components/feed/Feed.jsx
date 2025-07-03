import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const Feed = ({ onLoaded }) => {
  const { contentId } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      const res = await fetch(`/api/community/${contentId}`);
      if (res.ok) {
        const data = await res.json();
        setPost(data);
        onLoaded(data); // 상위 컴포넌트로 전달
      } else {
        alert('게시글 불러오기 실패');
      }
    };
    fetchPost();
  }, [contentId, onLoaded]);

  if (!post) return <div>로딩 중...</div>;

  return (
    <div className="bg-white rounded-[2vh] shadow p-[3vh]">
      {post.category === '매칭' ? (
        <div className="bg-green-50 p-[2vh] rounded-[1vh] mb-[2vh]">
          <div className="flex justify-between mb-[1vh]">
            <span className="text-gray-500">🕒 매칭 날짜</span>
            <span className="text-green-600 font-bold">{post.matchDay.replace('T', ' ').slice(0, 16)}</span>
          </div>
          <div className="flex justify-between mb-[1vh]">
            <span className="text-gray-500">팀 이름</span>
            <span className="text-gray-700 font-medium">{post.team.teamName}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">지역</span>
            <span className="text-gray-700 font-medium">{post.team.location}</span>
          </div>
        </div>
      ) : (
        <div className="bg-blue-50 p-[2vh] rounded-[1vh] mb-[2vh]">
          <div className="flex justify-between mb-[1vh]">
            <span className="text-gray-500">팀 이름</span>
            <span className="text-gray-700 font-medium">{post.team.teamName}</span>
          </div>
          <div className="flex justify-between mb-[1vh]">
            <span className="text-gray-500">지역</span>
            <span className="text-gray-700 font-medium">{post.team.location}</span>
          </div>
        </div>
      )}

      <div className="flex justify-between mb-[1.5vh] text-[1.7vh]">
        <span className="text-gray-500">작성자</span>
        <span className="text-gray-700">{post.user.userName}</span>
      </div>
      <div className="flex justify-between mb-[1.5vh] text-[1.7vh]">
        <span className="text-gray-500">작성일</span>
        <span className="text-gray-700">{post.createTime.slice(0, 10)}</span>
      </div>
      <div className="flex justify-between mb-[1.5vh] text-[1.7vh]">
        <span className="text-gray-500">조회수</span>
        <span className="text-gray-700">{post.views}</span>
      </div>

      <div className="bg-gray-100 p-[2vh] rounded-[1vh] mb-[3vh] text-[1.8vh] min-h-[8vh]">
        {post.content}
      </div>
    </div>
  );
};

export default Feed;
