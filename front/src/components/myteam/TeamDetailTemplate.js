import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

const TeamDetailPage = () => {
  const { id } = useParams(); // ← URL에서 ID 추출
  const [team, setTeam] = useState(null);
  const [games, setGames] = useState(null);

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

  if (!team) return <div>로딩 중...</div>;
  if (!games) return <div>로딩 중...</div>;

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
      <h2>포메이션 목록</h2>
      <ul>
        {(() => {
          const items = [];
          for (let i = 0; i < games.length; i++) {
            const game = games[i];
            items.push(
              <li key={game.gameName}>
                <Link to={`/game/${game.gameId}`}>
                  {game.gameName} ({game.date.slice(0, 10)})
                </Link>
              </li>,
            );
          }
          return items;
        })()}
      </ul>
    </div>
  );
};

export default TeamDetailPage;
