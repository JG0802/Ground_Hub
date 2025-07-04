import { useEffect, useState } from 'react';
import MyTeamList from '../../components/myTeam/MyTeamList';
import { useNavigate } from 'react-router-dom';

const MyTeamListPage = () => {
  const navigate = useNavigate();
  const userMail = sessionStorage.getItem('userMail');

  const [teams, setTeams] = useState([]);
  const [totalGames, setTotalGames] = useState(0);

  // 소속 팀 불러오기
  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const response = await fetch(`/api/teams/mail/${userMail}`);
        if (response.ok) {
          const data = await response.json();
          setTeams(data);
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchTeams();
  }, [userMail]);

  // 총 경기 수 계산
  useEffect(() => {
    const fetchTotalGames = async () => {
      try {
        let total = 0;
        for (const team of teams) {
          const res = await fetch(`/api/games/team/${team.teamId}`);
          if (res.ok) {
            const data = await res.json();
            total += data.length;
          }
        }
        setTotalGames(total);
      } catch (err) {
        console.error(err);
      }
    };

    if (teams.length > 0) {
      fetchTotalGames();
    }
  }, [teams]);

  return (
    <div className="w-full max-w-[768px] mx-auto min-h-[calc(100vh-12vh)] bg-[#f9f9f9] p-[10vh_2vw_10vh]">
      <div className="w-full text-center mb-[3vh]">
        <h1 className="text-[3.2vh] font-bold">My Teams</h1>
        <p className="text-[1.6vh] text-gray-500 mt-[0.7vh]">내가 소속된 팀을 한눈에 볼 수 있어요</p>

        {/* 소속 팀 개수 & 총 경기 수 */}
        <div className="flex justify-center gap-[1.5vh] mt-[2vh]">
          <div className="bg-green-100 text-green-700 text-[1.6vh] px-[2vh] py-[1vh] rounded-full font-semibold">
            소속 팀: {teams.length}개
          </div>
          <div className="bg-yellow-100 text-yellow-700 text-[1.6vh] px-[2vh] py-[1vh] rounded-full font-semibold">
            총 경기: {totalGames}개
          </div>
        </div>
      </div>

      {/* 팀 목록 */}
      <MyTeamList />

      {/* 우측 하단 버튼 */}
      <div className="fixed bottom-[12vh] right-[calc(clamp(1vh,(100vw-50vh)/2+1vh,100vw))] z-[1000] group">
        <button
          onClick={() => navigate('/my-schedule')}
          className="w-[6.5vh] h-[6.5vh] bg-gradient-to-br from-purple-400 to-purple-600 text-white rounded-full border-none cursor-pointer shadow-lg flex items-center justify-center hover:scale-110 active:scale-95 transition-transform"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-[3vh] h-[3vh]">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12h.01M12 12h.01M9 12h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </button>

        {/* 툴팁 */}
        <div className="absolute right-[calc(100%+1.5vh)] top-1/2 -translate-y-1/2 bg-gray-200 text-gray-800 text-[1.6vh] px-[1.2vh] py-[0.7vh] rounded-[1vh] shadow group-hover:opacity-100 opacity-0 transition-opacity duration-300 whitespace-nowrap">
          내 경기 일정
          <div className="absolute top-1/2 left-full -translate-y-1/2 w-0 h-0 border-t-[8px] border-t-transparent border-b-[8px] border-b-transparent border-l-[8px] border-l-gray-200"></div>
        </div>
      </div>
    </div>
  );
};

export default MyTeamListPage;
