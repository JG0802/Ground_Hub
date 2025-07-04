import { useEffect, useState } from 'react';
import MyTeam from './MyTeam';

const MyTeamList = () => {
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

  if (teams.length === 0) {
    return <div className="text-[1.6vh] text-center">참여 중인 팀이 없습니다.</div>;
  }

  return (
    <div className="flex flex-col gap-[2vh]">
      {teams.map((team, index) => (
        <MyTeam key={index} team={team} />
      ))}
    </div>
  );
};

export default MyTeamList;
