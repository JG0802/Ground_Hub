import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import TeamInfo from './TeamInfo';
import TeamJoin from './TeamJoin';

const TeamDetailPage = () => {
  const { id } = useParams(); // ← URL에서 ID 추출
  const [team, setTeam] = useState(null);
  const [games, setGames] = useState([]);
  const userMail = sessionStorage.getItem('userMail');
  const [teamManagerMail, setTeamManagerMail] = useState('');
  sessionStorage.setItem('teamId', id);

  useEffect(() => {
    const fetchTeam = async () => {
      const res = await fetch(`/api/teams/${id}/users-in-team`);
      const data = await res.json();
      setTeam(data);
    };

    const fetchTeamInfo = async () => {
      const res = await fetch(`/api/teams/${id}`);
      const teamRes = await res.json();
      setTeamManagerMail(teamRes.teamManager.userMail); // 💡 여기!
    };

    const fetchGame = async () => {
      const res = await fetch(`/api/games/team/${id}`);
      if (res.ok) {
        const text = await res.text();
        const data = text ? JSON.parse(text) : []; // 또는 null
        setGames(data);
      } else {
        console.error('서버 오류:', res.status);
        setGames([]);
      }
    };

    fetchTeam();
    fetchTeamInfo();
    fetchGame();
  }, [id]);

  if (!team || !games) return <div>로딩 중...</div>;

  const isInTeam = team.some((user) => user.userMail === userMail);
  return (
    <div>
      <h2>팀 명단</h2>
      <ul>
        {(() => {
          const items = [];
          for (let i = 0; i < team.length; i++) {
            const user = team[i];
            items.push(
              <li key={user.userName}>
                {user.userName} ({user.firstPosition}, {user.secondPosition},{' '}
                {user.thirdPosition})
              </li>,
            );
          }
          return items;
        })()}
      </ul>
      {isInTeam ? (
        <div>
          <TeamInfo games={games} teamManagerMail={teamManagerMail} />
        </div>
      ) : (
        <TeamJoin />
      )}
    </div>
  );
};

export default TeamDetailPage;
