import { useEffect, useState } from 'react';
import styled from 'styled-components';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';

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

const Arrow = styled.span`
  font-size: 2vh;
  cursor: pointer;
`;

const MatchScroll = styled.div`
  display: flex;
  overflow-x: auto;
  gap: 1vh;
  padding-bottom: 1vh;
`;

const MatchCard = styled.div`
  min-width: 12vh;
  background-color: #eee;
  border-radius: 1vh;
  padding: 1vh;
  text-align: center;
`;

const MatchImage = styled.img`
  width: 8vh;
  height: 8vh;
  object-fit: cover;
  margin-bottom: 1vh;
`;

const MatchInfo = styled.div`
  font-size: 1.6vh;
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
  width: 12.5%;
  text-align: center;
`;

const ScheduleSection = () => {
  const [currentDate] = useState(dayjs());
  const [teams, setTeams] = useState([]);
  const [games, setGames] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
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
            allGames.push(...data);
          }
        }

        setGames(allGames);
      } catch (error) {
        console.error(error);
        alert('경기 데이터를 불러오는 중 오류 발생');
      } finally {
        setIsLoading(false); // ✅ 무조건 로딩 끝내기
      }
    };

    if (teams.length > 0) {
      fetchGamesForAllTeams();
    }
  }, [teams]);

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

  // ✅ 로딩 끝난 후에만 아래 렌더링
  return (
    <Container>
      <TitleRow>
        <Title>Schedule</Title>
        <Arrow>{'>'}</Arrow>
      </TitleRow>

      <MatchScroll>
        {games.map((game) => (
          <Link
            to={`/game/${game.gameId}`}
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            <MatchCard key={game.gameId}>
              <div style={{ fontSize: '1.6vh', fontWeight: 'bold' }}>
                {dayjs(game.date).format('MM/DD ddd')}
              </div>
              <MatchImage src="/images/logo.png" alt="team" />
              <MatchInfo>{game.gameName}</MatchInfo>
            </MatchCard>
          </Link>
        ))}
      </MatchScroll>

      <CalendarContainer>
        <CalendarHeader>
          <span>{currentDate.format('MMMM YYYY')}</span>
          <Arrow>{'>'}</Arrow>
        </CalendarHeader>
        <WeekRow>
          {['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'].map((day) => (
            <div key={day}>{day}</div>
          ))}
        </WeekRow>
        <DaysRow>
          {getDaysInMonth().map((d, i) => (
            <DayCell key={i}>{d}</DayCell>
          ))}
        </DaysRow>
      </CalendarContainer>
    </Container>
  );
};

export default ScheduleSection;
