import { useState } from 'react';
import FeedList from '../../components/feed/FeedList';
import FeedCreate from '../../components/feed/FeedCreate';

const FeedPage = () => {
  const [category, setCategory] = useState('매칭');
  const [showModal, setShowModal] = useState(false);
  const userMail = sessionStorage.getItem('userMail');

  return (
    <div className="p-[8vh_2vw_10vh] max-w-[768px] mx-auto bg-[#f9f9f9]">
      {/* 카테고리 탭 */}
      <div className="flex justify-around mb-[2vh] border-b border-gray-300">
        {['매칭', '팀원 모집'].map(tab => (
          <div
            key={tab}
            className={`text-[2vh] p-[1vh_2vh] cursor-pointer ${
              category === tab ? 'font-bold border-b-[3px] border-black' : 'font-normal'
            }`}
            onClick={() => setCategory(tab)}
          >
            {tab}
          </div>
        ))}
      </div>

      {/* 게시글 목록 */}
      <FeedList category={category} />

      {/* 글쓰기 버튼 */}
      <button
        onClick={() => setShowModal(true)}
        className="fixed bottom-[10vh] right-[calc(clamp(1vh,(100vw-50vh)/2+1vh,100vw))] w-[6.5vh] h-[6.5vh] bg-gradient-to-br from-green-400 to-green-600 text-white rounded-full border-none cursor-pointer shadow-lg z-[1000] flex items-center justify-center hover:scale-110 active:scale-95 transition-transform"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-[3vh] h-[3vh]">
          <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 3.487a2.32 2.32 0 113.281 3.281L7.5 19.41l-4.245 1.06 1.06-4.244L16.862 3.487z" />
        </svg>
      </button>

      {/* 글쓰기 모달 */}
      {showModal && (
        <FeedCreate
          userMail={userMail}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
};

export default FeedPage;
