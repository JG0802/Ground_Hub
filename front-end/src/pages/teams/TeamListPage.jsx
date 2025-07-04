import { useState } from 'react';
import TeamCreateModal from '../../components/teams/TeamCreateModal';
import TeamSearch from '../../components/teams/TeamSearch';
import TeamList from '../../components/teams/TeamList';

const TeamListPage = () => {
  const [showModal, setShowModal] = useState(false);
  const [refreshFlag, setRefreshFlag] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState('');

  const handleRefresh = () => setRefreshFlag((prev) => !prev);

  const handleSearch = (keyword) => {
    setSearchKeyword(keyword);
    handleRefresh();
  };

  return (
    <div className="min-h-screen bg-[#f9f9f9] flex flex-col items-center pt-[4vh] px-4">
      {/* 로고 */}
      <img src="/logo.png" alt="OVERLAB" className="h-[4vh] mb-[2vh]" />

      {/* 타이틀 */}
      <div className="text-center mb-[4vh]">
        <h1 className="text-[3.2vh] font-bold">Team List</h1>
        <p className="text-[1.6vh] text-gray-500 mt-[0.7vh]">모든 팀을 조회할 수 있어요</p>
      </div>

      {/* 검색창 */}
      <div className="w-full max-w-[500px] mb-[3vh]">
        <TeamSearch onSearch={handleSearch} />
      </div>

      {/* 팀 리스트 */}
      <div className="flex-1 w-full max-w-[500px] overflow-y-auto pb-[15vh]">
        <TeamList key={refreshFlag} keyword={searchKeyword} />
      </div>

      {/* 팀 생성 버튼 */}
      <div className="fixed bottom-[10vh] right-[calc(clamp(1vh,(100vw-50vh)/2+1vh,100vw))] z-[1000] group">
        <button
          onClick={() => setShowModal(true)}
          className="w-[6.5vh] h-[6.5vh] bg-gradient-to-br from-green-400 to-green-600 text-white rounded-full border-none cursor-pointer shadow-lg flex items-center justify-center hover:scale-110 active:scale-95 transition-transform"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-[3vh] h-[3vh]">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
        </button>

        {/* 툴팁 */}
        <div className="absolute right-[calc(100%+1.5vh)] top-1/2 -translate-y-1/2 bg-gray-200 text-gray-800 text-[1.6vh] px-[1.2vh] py-[0.7vh] rounded-[1vh] shadow group-hover:opacity-100 opacity-0 transition-opacity duration-300 whitespace-nowrap">
          팀 생성
          <div className="absolute top-1/2 left-full -translate-y-1/2 w-0 h-0 border-t-[8px] border-t-transparent border-b-[8px] border-b-transparent border-l-[8px] border-l-gray-200"></div>
        </div>
      </div>

      {/* My Teams 버튼 */}
      <div className="fixed bottom-[18vh] right-[calc(clamp(1vh,(100vw-50vh)/2+1vh,100vw))] z-[1000] group">
        <button
          onClick={() => window.location.href = '/my-team'}
          className="w-[6.5vh] h-[6.5vh] bg-gradient-to-br from-green-400 to-green-600 text-white rounded-full border-none cursor-pointer shadow-lg flex items-center justify-center hover:scale-110 active:scale-95 transition-transform"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-[3vh] h-[3vh]">
            <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l2.094 6.419a1 1 0 00.95.69h6.732c.969 0 1.371 1.24.588 1.81l-5.445 3.952a1 1 0 00-.364 1.118l2.094 6.42c.3.92-.755 1.688-1.538 1.118l-5.445-3.951a1 1 0 00-1.176 0l-5.445 3.951c-.783.57-1.838-.197-1.538-1.118l2.094-6.42a1 1 0 00-.364-1.118L2.292 11.846c-.783-.57-.38-1.81.588-1.81h6.732a1 1 0 00.95-.69l2.094-6.419z" />
          </svg>
        </button>

        {/* 툴팁 */}
        <div className="absolute right-[calc(100%+1.5vh)] top-1/2 -translate-y-1/2 bg-gray-200 text-gray-800 text-[1.6vh] px-[1.2vh] py-[0.7vh] rounded-[1vh] shadow group-hover:opacity-100 opacity-0 transition-opacity duration-300 whitespace-nowrap">
          내 팀 보기
          <div className="absolute top-1/2 left-full -translate-y-1/2 w-0 h-0 border-t-[8px] border-t-transparent border-b-[8px] border-b-transparent border-l-[8px] border-l-gray-200"></div>
        </div>
      </div>

      {showModal && (
        <TeamCreateModal
          onClose={() => setShowModal(false)}
          onSuccess={handleRefresh}
        />
      )}
    </div>
  );
};

export default TeamListPage;
