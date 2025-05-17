import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import dayjs from 'dayjs';
import altImage from '../img/alt_image.png';

const Container = styled.div`
  padding: 2vh;
`;

const TitleRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2vh;
`;

const Title = styled.h2`
  font-size: 2.2vh;
  font-weight: bold;
`;

const CalendarContainer = styled.div`
  padding-top: 3vh;
`;

const CalendarHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 2vh;
  font-weight: bold;
  margin-bottom: 2vh;
`;

const Arrow = styled.span`
  font-size: 2vh;
  cursor: pointer;
`;

const WeekRow = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 1.6vh;
  color: #888;
  margin-bottom: 1vh;
`;

const DaysRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  font-size: 1.8vh;
  gap: 1vh;
`;

const DayCell = styled.div`
  width: 12.3%;
  height: 5vh;
  text-align: center;
  position: relative;
  &:hover {
    cursor: pointer;
  }
`;

const DotWrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 0.3vh;
  position: absolute;
  bottom: 0.5vh;
  left: 50%;
  transform: translateX(-50%);
`;

const Dot = styled.div`
  width: 0.8vh;
  height: 0.8vh;
  border-radius: 50%;
`;

const MatchContainer = styled.div`
  padding: 2vh;
  width: 80%;
`;

const MatchCard = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5vh 0;
  border-bottom: 1px solid #eee;
  width: 100%;
`;

const TeamCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1.5vh 0;
  margin: 1vh;
`;

const TeamLogo = styled.img`
  width: 8vh;
  height: 8vh;
  border-radius: 1vh;
`;

const TeamName = styled.div`
  font-size: 2vh;
  font-weight: bold;
`;

const SchedulePage = () => {
  const [currentDate, setCurrentDate] = useState(dayjs());
  const [teams, setTeams] = useState([]);
  const [games, setGames] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedDay, setSelectedDay] = useState(null); // 선택된 날짜
  const userMail = sessionStorage.getItem('userMail');

  // 캘린더 날짜 생성
  const getDaysInMonth = () => {
    const start = currentDate.startOf('month').day();
    const end = currentDate.daysInMonth();
    const days = [];

    for (let i = 0; i < start; i++) days.push('');
    for (let i = 1; i <= end; i++) days.push(i);

    return days;
  };

  const gamesByDate = games.reduce((acc, game) => {
    const day = dayjs(game.date).date();
    if (!acc[day]) acc[day] = [];
    if (!acc[day].includes(game.team.firstColor)) {
      acc[day].push(game.team.firstColor);
    }
    return acc;
  }, {});

  // 팀 목록 불러오기
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

  // 팀별 경기 정보 불러오기
  useEffect(() => {
    const fetchGamesForAllTeams = async () => {
      try {
        const allGames = [];

        for (const team of teams) {
          const res = await fetch(`/api/games/team/${team.teamId}`);
          if (res.ok) {
            const data = await res.json();
            // 💡 현재 달의 경기만 필터링
            const filtered = data.filter((g) =>
              dayjs(g.date).isSame(currentDate, 'month'),
            );
            const gamesWithTeam = filtered.map((game) => ({
              ...game,
              team, // team 정보 추가
            }));
            allGames.push(...gamesWithTeam);
          }
        }

        setGames(allGames);
      } catch (error) {
        console.error(error);
        alert('경기 데이터를 불러오는 중 오류 발생');
      } finally {
        setIsLoading(false);
      }
    };

    if (teams.length > 0) {
      fetchGamesForAllTeams();
    }
  }, [teams, currentDate]);

  const goToPrevMonth = () => {
    setCurrentDate(currentDate.subtract(1, 'month'));
  };

  const goToNextMonth = () => {
    setCurrentDate(currentDate.add(1, 'month'));
  };

  const sortedGames = [...games].sort((a, b) =>
    dayjs(a.date).isAfter(dayjs(b.date)) ? 1 : -1,
  );

  // ✅ 로딩 중일 때 별도 UI 출력
  if (isLoading) {
    return (
      <Container>
        <TitleRow>
          <Title>Schedule</Title>
        </TitleRow>
        <div style={{ textAlign: 'center', padding: '2vh', fontSize: '1.8vh' }}>
          불러오는 중...
        </div>
      </Container>
    );
  }

  return (
    <div>
      <h2>스케줄 전체 보기</h2>
      <CalendarContainer>
        <CalendarHeader>
          <Arrow onClick={goToPrevMonth}>{'<'}</Arrow>
          <span>{currentDate.format('MMMM YYYY')}</span>
          <Arrow onClick={goToNextMonth}>{'>'}</Arrow>
        </CalendarHeader>
        <WeekRow>
          {['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'].map((day) => (
            <div key={day}>{day}</div>
          ))}
        </WeekRow>
        <DaysRow>
          {getDaysInMonth().map((d, i) => (
            <DayCell key={i} onClick={() => setSelectedDay(d)}>
              {d}
              {gamesByDate[d] && (
                <DotWrapper>
                  {gamesByDate[d].map((color, idx) => (
                    <Dot key={idx} style={{ backgroundColor: color }} />
                  ))}
                </DotWrapper>
              )}
            </DayCell>
          ))}
        </DaysRow>
      </CalendarContainer>
      <MatchContainer>
        {selectedDay && (
          <div style={{ paddingTop: '2vh', fontSize: '1.8vh' }}>
            <h3>
              {currentDate.date(selectedDay).format('YYYY-MM-DD')} 경기 일정
            </h3>
            {games.filter((g) => dayjs(g.date).date() === selectedDay).length >
            0 ? (
              sortedGames
                .filter((g) => dayjs(g.date).date() === selectedDay)
                .map((game, i) => (
                  <Link
                    key={game.gameId}
                    to={`/position/view/${game.gameId}`}
                    style={{ textDecoration: 'none', color: 'inherit' }}
                  >
                    <MatchCard>
                      <TeamCard key={i}>
                        <TeamLogo
                          src={`/logos/${game.team.logo}`}
                          onError={(e) => {
                            e.target.src = altImage;
                          }}
                        />
                        <TeamName>{game.team.teamName}</TeamName>
                      </TeamCard>
                      <TeamCard key={i}>
                        <TeamName>{game.date.slice(0, 10)}</TeamName>
                        <TeamName style={{ fontSize: '5vh' }}>VS</TeamName>
                      </TeamCard>
                      <TeamCard key={i}>
                        <TeamLogo
                          src={`/logos/${game.logo}`}
                          onError={(e) => {
                            e.target.src = altImage;
                          }}
                        />
                        <TeamName>{game.gameName}</TeamName>
                      </TeamCard>
                    </MatchCard>
                  </Link>
                ))
            ) : (
              <p>해당 날짜에 경기가 없습니다.</p>
            )}
          </div>
        )}
      </MatchContainer>
    </div>
  );
};

export default SchedulePage;
