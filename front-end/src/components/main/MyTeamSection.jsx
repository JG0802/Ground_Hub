import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import altImage from '../../img/alt_image.png';
import ScrollContainer from 'react-indiana-drag-scroll';

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
      <div className="py-[0.5vh]">
        <div className="flex justify-between items-center mb-[1.5vh] mt-[1vh]">
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
      <div className="flex justify-between items-center mb-[1.5vh] mt-[1vh]">
        <h2 className="text-[2.2vh] font-bold pl-[1vh] border-l-4 border-green-500 pb-[0.7vh] inline-block">
          My Team
        </h2>
        <Link to="/my-team" className="text-[1.5vh] text-gray-400 no-underline">
          더보기
        </Link>
      </div>

      {teams.length === 0 ? (
        <div className="text-[1.8vh] text-gray-500 py-[1vh]">소속된 팀이 없습니다.</div>
      ) : (
        <ScrollContainer
          className="flex gap-[0.5vh] overflow-x-auto pb-[1vh] cursor-grab active:cursor-grabbing scrollbar-hide"
          horizontal
        >
          {teams.map((team) => (
            <Link
              key={team.teamId}
              to={`/team/${team.teamId}`}
              className="flex-shrink-0 bg-white border border-gray-300 p-[0.6vh] no-underline text-black flex flex-col items-center hover:border-green-500 transition box-border rounded-[1.2vh] w-[12vh] min-w-[12vh]"
            >
              <img
                src={`http://52.78.12.127:8080/logos/${team.logo}`}
                onError={(e) => {
                  e.target.src = altImage;
                }}
                className="w-[7vh] h-[7vh] rounded-full object-cover mb-[0.5vh]"
                alt="team logo"
              />
              <div className="text-[1.6vh] font-semibold text-center whitespace-nowrap overflow-hidden text-ellipsis max-w-[12vh]">
                {team.teamName}
              </div>
            </Link>
          ))}
        </ScrollContainer>
      )}
    </div>
  );
};

export default MyTeamSection;
