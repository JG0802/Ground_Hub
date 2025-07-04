import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const FeedEdit = ({ post, onUpdate, onClose }) => {
  const navigate = useNavigate()
  const [title, setTitle] = useState(post.title);
  const [content, setContent] = useState(post.content);

  const handleEdit = async () => {
    const res = await fetch(`/api/community/${post.contentId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, content }),
    });
    if (res.ok) {
      const updated = await res.json();
      onUpdate(updated);
      alert('수정 완료');
      onClose();
      navigate('/feed')
    } else {
      alert('수정 실패');
    }
  };

  return (
    <div className="fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-50 flex justify-center items-center z-[9999]">
      <div onClick={(e) => e.stopPropagation()} className="bg-white rounded-[2vh] p-[4vh_3vh] w-[90%] max-w-[360px] box-border shadow-lg relative">
        <div className="flex justify-between items-center mb-[3vh]">
          <h3 className="text-[2.4vh] font-bold">게시글 수정</h3>
          <button onClick={onClose}>✖</button>
        </div>
        <textarea value={title} onChange={e => setTitle(e.target.value)} className="w-full mb-[2vh] p-2 border" />
        <textarea value={content} onChange={e => setContent(e.target.value)} className="w-full h-[10vh] p-2 border" />
        <button onClick={handleEdit} className="w-full mt-[2vh] p-2 bg-green-500 text-white">수정</button>
      </div>
    </div>
  );
};

export default FeedEdit;
