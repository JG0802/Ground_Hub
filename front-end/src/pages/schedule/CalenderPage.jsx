import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import styled from 'styled-components';
import Calender from '../../components/schedule/Calender';
import MyCalenderList from '../../components/schedule/MyCalenderList';

const Container = styled.div`
  padding: 8vh 2vh 3vh;
  background-color: #fafafa;
`;

const Title = styled.h2`
  font-size: 2.4vh;
  font-weight: 600;
  margin-bottom: 2vh;
  border-bottom: 2px solid #ddd;
  display: inline-block;
`;

const CalenderPage = () => {
  const [currentDate, setCurrentDate] = useState(dayjs());
  const [teams, setTeams] = useState([]);
  const [games, setGames] = useState([]);
  const [selectedDay, setSelectedDay] = useState({ year: null, month: null, date: null });
  const [isLoading, setIsLoading] = useState(true);
  const userMail = sessionStorage.getItem('userMail');

  useEffect(() => {
    const fetchTeams = async () => {
      const res = await fetch(`/api/teams/mail/${userMail}`);
      if (res.ok) {
        const data = await res.json();
        setTeams(data);
      } else {
        alert(await res.text());
      }
    };
    fetchTeams();
  }, [userMail]);

  useEffect(() => {
    const fetchGames = async () => {
      const allGames = [];
      for (const team of teams) {
        const res = await fetch(`/api/games/team/${team.teamId}`);
        if (res.ok) {
          const data = await res.json();
          const filtered = data.filter((g) => dayjs(g.date).isSame(currentDate, 'month'));
          allGames.push(...filtered.map((g) => ({ ...g, team })));
        }
      }
      setGames(allGames);
      setIsLoading(false);
    };

    if (teams.length > 0) fetchGames();
  }, [teams, currentDate]);

  if (isLoading) return <div style={{ padding: '3vh', textAlign: 'center' }}>불러오는 중...</div>;

  return (
    <Container>
      <Title>전체 일정</Title>
      <Calender
        currentDate={currentDate}
        setCurrentDate={setCurrentDate}
        games={games}
        selectedDay={selectedDay}
        setSelectedDay={setSelectedDay}
      />
      <MyCalenderList games={games} selectedDay={selectedDay} />
    </Container>
  );
};

export default CalenderPage;
