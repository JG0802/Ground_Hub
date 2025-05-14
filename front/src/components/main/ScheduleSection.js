import { useState } from 'react';
import styled from 'styled-components';
import dayjs from 'dayjs';

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

  const getDaysInMonth = () => {
    const start = currentDate.startOf('month').day();
    const end = currentDate.daysInMonth();
    const days = [];

    for (let i = 0; i < start; i++) days.push('');
    for (let i = 1; i <= end; i++) days.push(i);

    return days;
  };

  return (
    <Container>
      <TitleRow>
        <Title>Schedule</Title>
        <Arrow>{'>'}</Arrow>
      </TitleRow>

      <MatchScroll>
        {Array(5).fill().map((_, i) => (
          <MatchCard key={i}>
            <div style={{ fontSize: '1.6vh', fontWeight: 'bold' }}>5/9 Sat</div>
            <MatchImage src="/images/logo.png" alt="team" />
            <MatchInfo>
              불도저<br />vs 건축공학
            </MatchInfo>
          </MatchCard>
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
