import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import altImage from '../../img/alt_image.png';

const MyTeamSection = () => {
  const [teams, setTeams] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const userMail = sessionStorage.getItem('userMail');

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const response = await fetch(`/api/teams/mail/${userMail}`);
        if (response.ok) {
          const data = await response.json();
          setTeams(data);
        } else {
          console.log(await response.text());
        }
      } catch (err) {
        console.error(err);
        alert('서버와의 통신 중 오류가 발생했습니다.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchTeams();
  }, [userMail]);

  if (isLoading) {
    return (
      <div className="py-[1.5vh]">
        <div className="flex justify-between items-center mb-[1.5vh]">
          <h2 className="text-[2.2vh] font-bold pl-[1vh] border-l-4 border-green-500 pb-[0.7vh] inline-block">
            My Team
          </h2>
        </div>
        <div className="text-center py-[2vh] text-[1.8vh]">불러오는 중...</div>
      </div>
    );
  }

  return (
    <div className="py-[1.5vh]">
      <div className="flex justify-between items-center mb-[1.5vh]">
        <h2 className="text-[2.2vh] font-bold pl-[1vh] border-l-4 border-green-500 pb-[0.7vh] inline-block">
          My Team
        </h2>
        <Link to="/myteam" className="text-[1.7vh] text-gray-500 no-underline">
          더보기
        </Link>
      </div>

      {teams.length === 0 ? (
        <div className="text-[1.8vh] text-gray-500 py-[1vh]">소속된 팀이 없습니다.</div>
      ) : (
        <div className="flex gap-[1.5vh] overflow-x-auto pb-[1vh] scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-transparent">
          {teams.map((team) => (
            <Link
              key={team.teamId}
              to={`/teams/${team.teamId}`}
              className="bg-white border border-transparent rounded-[1.2vh] shadow-md p-[1vh] no-underline text-black flex flex-col items-center hover:border-green-500 hover:shadow-lg transition box-border w-[12vh] min-w-[12vh]"
            >
              <img
                src={`/logos/${team.logo}`}
                onError={(e) => {
                  e.target.src = altImage;
                }}
                className="w-[7vh] h-[7vh] rounded-full object-cover mb-[1vh]"
                alt="team logo"
              />
              <div className="text-[1.6vh] font-semibold text-center whitespace-nowrap overflow-hidden text-ellipsis max-w-[12vh]">
                {team.teamName}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyTeamSection;
