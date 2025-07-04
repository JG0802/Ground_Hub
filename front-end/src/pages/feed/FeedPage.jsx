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
      <div className="fixed bottom-[10vh] right-[calc(clamp(1vh,(100vw-50vh)/2+1vh,100vw))] z-[1000] group">
        <button
          onClick={() => setShowModal(true)}
          className="w-[6.5vh] h-[6.5vh] bg-gradient-to-br from-green-400 to-green-600 text-white rounded-full border-none cursor-pointer shadow-lg flex items-center justify-center hover:scale-110 active:scale-95 transition-transform"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-[3vh] h-[3vh]">
            <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 3.487a2.32 2.32 0 113.281 3.281L7.5 19.41l-4.245 1.06 1.06-4.244L16.862 3.487z" />
          </svg>
        </button>

        {/* 툴팁 - 카테고리에 따라 변경 */}
        <div className="absolute right-[calc(100%+1.5vh)] top-1/2 -translate-y-1/2 bg-gray-200 text-gray-800 text-[1.6vh] px-[1.2vh] py-[0.7vh] rounded-[1vh] shadow group-hover:opacity-100 opacity-0 transition-opacity duration-300 whitespace-nowrap">
          {category === '매칭' ? '매칭 신청' : '팀원 모집'}
          <div className="absolute top-1/2 left-full -translate-y-1/2 w-0 h-0 border-t-[8px] border-t-transparent border-b-[8px] border-b-transparent border-l-[8px] border-l-gray-200"></div>
        </div>
      </div>

      {/* 글쓰기 모달 */}
      {showModal && (
        <FeedCreate
          userMail={userMail}
          category={category} // 카테고리 전달
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
};

export default FeedPage;
