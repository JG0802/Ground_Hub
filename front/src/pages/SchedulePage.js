import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import dayjs from 'dayjs';
import altImage from '../img/alt_image.png';
import 'dayjs/locale/ko';

dayjs.locale('ko');

const Container = styled.div`
  padding: 8vh 2vh 3vh;
  background-color: #fafafa;
`;

const TitleRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2vh;
`;

const Title = styled.h2`
  font-size: 2.4vh;
  font-weight: 600;
  padding-bottom: 0.7vh;
  border-bottom: 2px solid #ddd;
  display: inline-block;
`;

const CalendarContainer = styled.div`
  padding-top: 2vh;
`;

const CalendarHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 2vh;
  font-weight: 600;
  margin-bottom: 2vh;
`;

const Arrow = styled.span`
  font-size: 3vh;
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
  background-color: ${({ isSelected }) => (isSelected ? '#d5f5e3' : '#fff')};
  border-radius: 0.7vh;
  transition: background-color 0.2s;

  &:hover {
    background-color: #f0f0f0;
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
  padding-top: 3vh;
`;

const MatchCard = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2vh;
  border-radius: 1.5vh;
  margin-bottom: 3vh;
  background-color: #fff;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
  border: 1.5px solid transparent;
  transition: border 0.2s ease;

  &:hover {
    border: 1.5px solid #00c264;
  }
`;

const TeamCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const TeamLogo = styled.img`
  width: 7vh;
  height: 7vh;
  border-radius: 50%;
  object-fit: cover;
`;

const TeamName = styled.div`
  font-size: 1.6vh;
  font-weight: bold;
  margin-top: 0.5vh;
  text-align: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 12vh;
`;

const VsSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-weight: bold;
  gap: 1vh;
`;

const VsText = styled.div`
  font-size: 3vh;
`;

const VsDate = styled.div`
  font-size: 1.4vh;
  color: #666;
`;

const SchedulePage = () => {
  const [currentDate, setCurrentDate] = useState(dayjs());
  const [teams, setTeams] = useState([]);
  const [games, setGames] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedDay, setSelectedDay] = useState({ year: null, month: null, date: null });
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
    const day = dayjs(game.date).date();
    if (!acc[day]) acc[day] = [];
    if (!acc[day].includes(game.team.firstColor)) {
      acc[day].push(game.team.firstColor);
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
          alert(await response.text());
        }
      } catch (err) {
        console.error(err);
        alert('서버와의 통신 중 오류가 발생했습니다.');
      }
    };
    fetchTeams();
  }, [userMail]);

  useEffect(() => {
    const fetchGamesForAllTeams = async () => {
      try {
        const allGames = [];
        for (const team of teams) {
          const res = await fetch(`/api/games/team/${team.teamId}`);
          if (res.ok) {
            const data = await res.json();
            const filtered = data.filter((g) =>
              dayjs(g.date).isSame(currentDate, 'month'),
            );
            const gamesWithTeam = filtered.map((game) => ({
              ...game,
              team,
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

  const goToPrevMonth = () => setCurrentDate(currentDate.subtract(1, 'month'));
  const goToNextMonth = () => setCurrentDate(currentDate.add(1, 'month'));

  const sortedGames = [...games].sort((a, b) =>
    dayjs(a.date).isAfter(dayjs(b.date)) ? 1 : -1,
  );

  if (isLoading) {
    return (
      <Container>
        <TitleRow>
          <Title>전체 일정</Title>
        </TitleRow>
        <div style={{ textAlign: 'center', padding: '2vh', fontSize: '1.8vh' }}>
          불러오는 중...
        </div>
      </Container>
    );
  }

  return (
    <Container>
      <TitleRow>
        <Title>전체 일정</Title>
      </TitleRow>
      <CalendarContainer>
        <CalendarHeader>
          <Arrow onClick={goToPrevMonth}>{'<'}</Arrow>
          <span>{currentDate.format('MMMM YYYY')}</span>
          <Arrow onClick={goToNextMonth}>{'>'}</Arrow>
        </CalendarHeader>
        <WeekRow>
          {['일', '월', '화', '수', '목', '금', '토'].map((day) => (
            <div key={day} style={{ width: '12.3%', textAlign: 'center' }}>{day}</div>
          ))}
        </WeekRow>
        <DaysRow>
          {getDaysInMonth().map((d, i) => (
            <DayCell
              key={i}
              onClick={() =>
                setSelectedDay({
                  year: currentDate.year(),
                  month: currentDate.month(),
                  date: d,
                })
              }
              isSelected={
                selectedDay.year === currentDate.year() &&
                selectedDay.month === currentDate.month() &&
                selectedDay.date === d
              }
            >
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
        {selectedDay.date && (
          <div style={{ paddingTop: '3vh', fontSize: '1.8vh' }}>
            <h3>{dayjs(`${selectedDay.year}-${selectedDay.month + 1}-${selectedDay.date}`).format('YYYY-MM-DD')} 경기 일정</h3>
            {games.filter((g) =>
              dayjs(g.date).isSame(
                dayjs(`${selectedDay.year}-${selectedDay.month + 1}-${selectedDay.date}`),
                'day'
              )
            ).length > 0 ? (
              sortedGames
                .filter((g) =>
                  dayjs(g.date).isSame(
                    dayjs(`${selectedDay.year}-${selectedDay.month + 1}-${selectedDay.date}`),
                    'day'
                  )
                )
                .map((game) => (
                  <Link
                    key={game.gameId}
                    to={`/position/view/${game.gameId}`}
                    style={{ textDecoration: 'none', color: 'inherit' }}
                  >
                    <MatchCard>
                      <TeamCard>
                        <TeamLogo
                          src={`/logos/${game.team.logo}`}
                          onError={(e) => {
                            e.target.src = altImage;
                          }}
                        />
                        <TeamName>{game.team.teamName}</TeamName>
                      </TeamCard>

                      <VsSection>
                        <VsText>VS</VsText>
                        <VsDate>{game.date.slice(0, 10)}</VsDate>
                      </VsSection>

                      <TeamCard>
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
              <p style={{ textAlign: 'center', paddingTop: '1vh' }}>
                해당 날짜에 경기가 없습니다.
              </p>
            )}
          </div>
        )}
      </MatchContainer>
    </Container>
  );
};

export default SchedulePage;
