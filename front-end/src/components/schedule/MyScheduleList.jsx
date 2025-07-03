import { useEffect, useState } from 'react';
import MySchedule from './MySchedule';
import dayjs from 'dayjs';

const MyScheduleList = () => {
  const userMail = sessionStorage.getItem('userMail');
  const [teams, setTeams] = useState([]);
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTeams = async () => {
      const res = await fetch(`/api/teams/mail/${userMail}`);
      if (res.ok) {
        const data = await res.json();
        setTeams(data);
      }
    };
    fetchTeams();
  }, [userMail]);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const allGames = [];
        for (const team of teams) {
          const res = await fetch(`/api/games/team/${team.teamId}`);
          if (res.ok) {
            const data = await res.json();
            const gamesWithTeam = data.map(g => ({ ...g, team }));
            allGames.push(...gamesWithTeam);
          }
        }
        setGames(allGames);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };

    if (teams.length > 0) fetchGames();
  }, [teams]);

  if (loading) return <div className="text-center text-[1.8vh]">불러오는 중...</div>;
  if (games.length === 0) return <div className="text-center text-[1.8vh]">예정된 경기가 없습니다.</div>;

  const sortedGames = [...games].sort((a, b) =>
    dayjs(a.date).isAfter(dayjs(b.date)) ? 1 : -1
  );

  return (
    <div className="flex flex-col gap-[3vh]">
      {sortedGames.map(game => (
        <MySchedule key={game.gameId} game={game} />
      ))}
    </div>
  );
};

export default MyScheduleList;
