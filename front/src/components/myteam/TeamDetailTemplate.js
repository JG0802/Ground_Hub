import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import TeamInfo from './TeamInfo';
import TeamJoin from './TeamJoin';

const TeamDetailPage = () => {
  const { id } = useParams(); // ← URL에서 ID 추출
  const [team, setTeam] = useState(null);
  const [games, setGames] = useState(null);
  const userMail = sessionStorage.getItem('userMail');
  sessionStorage.setItem('teamId', id);

  useEffect(() => {
    const fetchTeam = async () => {
      const res = await fetch(`/api/teams/${id}/users-in-team`);
      const data = await res.json();
      setTeam(data);
      console.log(data);
    };

    const fetchGame = async () => {
      const res = await fetch(`/api/games/team/${id}`);
      const data = await res.json();
      setGames(data);
      console.log(data);
      console.log(id);
    };

    fetchTeam();
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
      {isInTeam ? <TeamInfo games={games} /> : <TeamJoin />}
    </div>
  );
};

export default TeamDetailPage;
