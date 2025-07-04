import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Feed from '../../components/feed/Feed';
import FeedEdit from '../../components/feed/FeedEdit';
import FeedMatch from '../../components/feed/FeedMatch';
import useFeedDelete from '../../components/feed/FeedDelete';

const FeedDetailPage = () => {
  const navigate = useNavigate();
  const userMail = sessionStorage.getItem('userMail');

  const [post, setPost] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showMatchModal, setShowMatchModal] = useState(false);

  const handleDelete = useFeedDelete(post?.contentId);

  const handleUpdate = (updatedPost) => {
    setPost(updatedPost);
    setShowEditModal(false);
  };

  return (
    <div className="p-[9vh_2vw_10vh] max-w-[768px] mx-auto bg-[#f9f9f9] min-h-[100vh]">
      {/* 상단 헤더 */}
      <div className="relative mb-[3vh] flex items-center justify-center h-[6vh]">
        <button onClick={() => navigate(-1)} className="absolute left-0 text-[3vh] ml-[1vh]">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-[3vh] h-[3vh]">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
        </button>
        <h2 className="text-[2.4vh] font-bold text-center whitespace-nowrap overflow-hidden text-ellipsis">
          {post ? (post.category === '매칭' ? '매칭' : '팀원 모집') : ''}
        </h2>
      </div>

      {/* 게시글 본문 */}
      <Feed onLoaded={setPost} />

      {/* 버튼 */}
      {post && (
        <div className="bg-white rounded-[2vh] shadow p-[3vh] mt-[2vh]">
          <div className="flex flex-col divide-y divide-gray-300">
            {post.category === '매칭' && (
              <button onClick={() => setShowMatchModal(true)} className="flex justify-between items-center p-[2vh] text-[1.8vh]">
                <span>매칭 신청</span>
                <span>➔</span>
              </button>
            )}

            <button onClick={() => navigate(`/teams/${post.team.teamId}`)} className="flex justify-between items-center p-[2vh] text-[1.8vh]">
              <span>팀 상세페이지</span>
              <span>➔</span>
            </button>

            {userMail === post.user.userMail && (
              <>
                <button onClick={() => setShowEditModal(true)} className="flex justify-between items-center p-[2vh] text-[1.8vh]">
                  <span>수정</span>
                  <span>➔</span>
                </button>
                <button onClick={handleDelete} className="flex justify-between items-center p-[2vh] text-[1.8vh] text-red-500">
                  <span>삭제</span>
                  <span>➔</span>
                </button>
              </>
            )}
          </div>
        </div>
      )}

      {/* 수정 모달 */}
      {post && showEditModal && (
        <FeedEdit post={post} onUpdate={handleUpdate} onClose={() => setShowEditModal(false)} />
      )}

      {/* 매칭 모달 */}
      {post && showMatchModal && (
        <FeedMatch post={post} userMail={userMail} onClose={() => setShowMatchModal(false)} />
      )}
    </div>
  );
};

export default FeedDetailPage;
