import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import { Link } from 'react-router-dom';
import altImage from '../../img/alt_image.png';

dayjs.locale('ko');

const ScheduleSection = () => {
  const [currentDate] = useState(dayjs());
  const [teams, setTeams] = useState([]);
  const [games, setGames] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const userMail = sessionStorage.getItem('userMail');

  const getDaysInMonth = () => {
    const start = currentDate.startOf('month').day();
    const end = currentDate.daysInMonth();
    const days = [];
    for (let i = 0; i < start; i++) days.push('');
    for (let i = 1; i <= end; i++) days.push(i);
    return days;
  };

  const gamesByDate = games.reduce((acc, game) => {
    const gameDate = dayjs(game.date);
    if (
      gameDate.month() === currentDate.month() &&
      gameDate.year() === currentDate.year()
    ) {
      const day = gameDate.date();
      if (!acc[day]) acc[day] = [];
      if (!acc[day].includes(game.team.firstColor)) {
        acc[day].push(game.team.firstColor);
      }
    }
    return acc;
  }, {});

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
      }
    };
    fetchTeams();
  }, [userMail]);

  useEffect(() => {
    if (teams.length === 0) {
      setIsLoading(false);
      return;
    }

    const fetchGamesForAllTeams = async () => {
      try {
        const allGames = [];
        for (const team of teams) {
          const res = await fetch(`/api/games/team/${team.teamId}`);
          if (res.ok) {
            const data = await res.json();
            const gamesWithTeam = data.map((game) => ({ ...game, team }));
            allGames.push(...gamesWithTeam);
          }
        }
        setGames(allGames);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    if (teams.length > 0) {
      fetchGamesForAllTeams();
    }
  }, [teams]);

  if (isLoading) {
    return (
      <div className="py-[0.5vh]">
        <div className="flex justify-between items-center mb-[1.5vh]">
          <h2 className="text-[2.2vh] font-bold pl-[1vh] border-l-4 border-green-500 pb-[0.7vh]">
            Schedule
          </h2>
        </div>
        <div className="text-center py-[2vh] text-[1.8vh]">불러오는 중...</div>
      </div>
    );
  }

  const sortedGames = [...games].sort((a, b) =>
    dayjs(a.date).isAfter(dayjs(b.date)) ? 1 : -1
  );

  return (
    <div className="py-[0.5vh]">
      <div className="flex justify-between items-center mb-[1.5vh]">
        <h2 className="text-[2.2vh] font-bold pl-[1vh] border-l-4 border-green-500 pb-[0.7vh]">
          Schedule
        </h2>
        <Link to="/my-schedule" className="text-[1.7vh] text-gray-500 no-underline">
          더보기
        </Link>
      </div>

      <div className="flex gap-[2vh] overflow-x-auto pb-[1vh] scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-transparent">
        {games.length === 0 ? (
          <div className="text-[1.8vh] text-gray-500">예정된 경기가 없습니다.</div>
        ) : (
          sortedGames.map((game) => (
            <Link
              key={game.gameId}
              to={`/position/view/${game.gameId}`}
              className="no-underline text-black"
            >
              <div className="flex flex-col items-center w-[16vh] min-w-[16vh] bg-white border border-gray-200 rounded-[1.2vh] shadow-md p-[1.5vh] text-center cursor-pointer transition hover:border-green-500 hover:shadow-lg">
                <div className="text-[1.6vh] font-bold mb-[0.5vh] truncate w-full min-w-0">
                  {dayjs(game.date).format('MM/DD (ddd)')}
                </div>
                <img
                  src={`/logos/${game.oppoLogo}`}
                  onError={(e) => {
                    e.target.src = altImage;
                  }}
                  className="w-[7vh] h-[7vh] rounded-full object-cover mb-[1vh]"
                  alt="match logo"
                />
                <div className="text-[1.6vh] truncate w-full min-w-0 whitespace-nowrap">
                  {`${game.team.teamName} VS ${game.versus}`}
                </div>
                <div className="text-[1.5vh] text-gray-600 truncate w-full min-w-0 whitespace-nowrap">
                  {game.gameName}
                </div>
              </div>

            </Link>
          ))
        )}
      </div>

      <div className="mt-[3vh]">
        <div className="flex justify-between items-center mb-[1.5vh]">
          <h3 className="text-[2vh] font-bold mt-[2vh]">{currentDate.format('YYYY년 M월')}</h3>
          <Link to="/schedule" className="text-[1.7vh] text-gray-500 no-underline">
            더보기
          </Link>
        </div>

        <div className="grid grid-cols-7 text-center text-[1.6vh] text-gray-500 mb-[1vh]">
          {['일', '월', '화', '수', '목', '금', '토'].map((day) => (
            <div key={day}>{day}</div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-y-[1.2vh] text-center w-full">
          {getDaysInMonth().map((d, i) => {
            if (d === '') return <div key={i}></div>;

            const isToday = d === currentDate.date();

            return (
              <div
                key={i}
                className={`aspect-square min-h-[4.5vh] flex flex-col items-center justify-center relative rounded-[0.7vh] ${
                  isToday ? 'bg-green-100 font-bold' : 'bg-gray-100 font-normal'
                }`}
              >
                {d}
                {gamesByDate[d] && (
                  <div className="flex justify-center gap-[0.3vh] absolute bottom-[0.5vh] left-1/2 transform -translate-x-1/2">
                    {gamesByDate[d].map((color, idx) => (
                      <div
                        key={idx}
                        className="w-[0.8vh] h-[0.8vh] rounded-full"
                        style={{ backgroundColor: color }}
                      ></div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ScheduleSection;
