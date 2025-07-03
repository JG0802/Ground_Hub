
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import altImage from '../../img/alt_image.png';
import UniformIcon from '../team/UniformIcon';

const MyTeamForm = () => {
  const [teams, setTeams] = useState([]);
  const userMail = sessionStorage.getItem('userMail');

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const response = await fetch(`/api/teams/mail/${userMail}`);
        if (response.ok) {
          const data = await response.json();
          setTeams(data);
        } else {
          alert(await response.text());
        }
      } catch (err) {
        console.error(err);
        alert('서버와의 통신 중 오류가 발생했습니다.');
      }
    };

    fetchTeams();
  }, [userMail]);

  return (
    <div className="w-full max-w-[768px] mx-auto min-h-[calc(100vh-12vh)] bg-[#f9f9f9] p-[7vh_2vw_10vh]">
      {teams.length === 0 ? (
        <div className="text-[1.6vh] md:text-[1.4vh] sm:text-[1.2vh] text-center">참여 중인 팀이 없습니다.</div>
      ) : (
        teams.map((team, i) => (
          <Link
            key={i}
            to={`/teams/${team.teamId}`}
            className="no-underline text-inherit"
          >
            <div className="flex items-center justify-between bg-white p-[2vh] rounded-[1.2vh] shadow-md transition hover:scale-[1.02] hover:shadow-lg mb-[2vh]">
              <img
                src={`/logos/${team.logo}`}
                onError={(e) => { e.target.src = altImage; }}
                className="w-[8vh] h-[8vh] md:w-[7vh] md:h-[7vh] sm:w-[6vh] sm:h-[6vh] rounded-full object-cover"
                alt="team logo"
              />
              <div className="flex-1 ml-[2vh]">
                <div className="text-[1.8vh] md:text-[1.6vh] sm:text-[1.4vh] font-bold mb-[1vh]">{team.teamName}</div>
                <div className="flex items-center gap-[0.7vh] text-[1.4vh] md:text-[1.2vh] sm:text-[1vh] text-gray-700 mb-[0.5vh]">
                  <span className="bg-gray-300 text-gray-800 rounded-[1vh] px-[1vh] text-[1.3vh] md:text-[1.1vh] sm:text-[0.9vh]">회원</span>
                  {team.users.length}명
                </div>
                <div className="flex items-center gap-[0.7vh] text-[1.4vh] md:text-[1.2vh] sm:text-[1vh] text-gray-700 mb-[0.5vh]">
                  <span className="bg-gray-300 text-gray-800 rounded-[1vh] px-[1vh] text-[1.3vh] md:text-[1.1vh] sm:text-[0.9vh]">위치</span>
                  {team.location}
                </div>
              </div>
              <div className="flex gap-[1vh]">
                <UniformIcon color={team.firstColor} type="home" />
                <UniformIcon color={team.secondColor} type="away" />
              </div>
            </div>
          </Link>
        ))
      )}
    </div>
  );
};

export default MyTeamForm;