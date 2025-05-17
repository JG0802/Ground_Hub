import { useState } from 'react';
import styled from 'styled-components';
import dayjs from 'dayjs';

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
  width: 12.5%;
  text-align: center;
`;

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(dayjs());

  const getDaysInMonth = () => {
    const start = currentDate.startOf('month').day();
    const end = currentDate.daysInMonth();
    const days = [];

    for (let i = 0; i < start; i++) days.push('');
    for (let i = 1; i <= end; i++) days.push(i);

    return days;
  };

  const goToPrevMonth = () => {
    setCurrentDate(currentDate.subtract(1, 'month'));
  };

  const goToNextMonth = () => {
    setCurrentDate(currentDate.add(1, 'month'));
  };

  return (
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
          <DayCell key={i}>{d}</DayCell>
        ))}
      </DaysRow>
    </CalendarContainer>
  );
};

export default Calendar;
