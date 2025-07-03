import { useNavigate } from 'react-router-dom';

const useFeedDelete = (contentId) => {
  const navigate = useNavigate();

  const handleDelete = async () => {
    if (!window.confirm('정말로 삭제하시겠습니까?')) return;
    const res = await fetch(`/api/community/${contentId}`, { method: 'DELETE' });
    if (res.status === 204) {
      alert('삭제 완료');
      navigate('/feed');
    } else {
      alert('삭제 실패');
    }
  };

  return handleDelete;
};

export default useFeedDelete;
