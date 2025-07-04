import dayjs from 'dayjs';
import styled from 'styled-components';

const CalendarWrapper = styled.div`
  padding: 2vh 0;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 2vh;
  font-weight: bold;
  margin-bottom: 2vh;
`;

const Arrow = styled.span`
  font-size: 3vh;
  cursor: pointer;
`;

const WeekDays = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 1.6vh;
  color: #888;
  margin-bottom: 1vh;
`;

const DaysGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1vh;
  font-size: 1.8vh;
`;

const DayBox = styled.div`
  width: 12.3%;
  height: 5vh;
  text-align: center;
  position: relative;
  background-color: ${({ isSelected }) => (isSelected ? '#d5f5e3' : '#fff')};
  border-radius: 0.7vh;

  &:hover {
    background-color: #f0f0f0;
    cursor: pointer;
  }
`;

const DotGroup = styled.div`
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

const Calender = ({ currentDate, setCurrentDate, games, selectedDay, setSelectedDay }) => {
  const daysInMonth = () => {
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

  return (
    <CalendarWrapper>
      <Header>
        <Arrow onClick={() => setCurrentDate(currentDate.subtract(1, 'month'))}>{'<'}</Arrow>
        <span>{currentDate.format('MMMM YYYY')}</span>
        <Arrow onClick={() => setCurrentDate(currentDate.add(1, 'month'))}>{'>'}</Arrow>
      </Header>

      <WeekDays>
        {['일', '월', '화', '수', '목', '금', '토'].map((d) => (
          <div key={d} style={{ width: '12.3%', textAlign: 'center' }}>{d}</div>
        ))}
      </WeekDays>

      <DaysGrid>
        {daysInMonth().map((d, i) => (
          <DayBox
            key={i}
            onClick={() => d && setSelectedDay({ year: currentDate.year(), month: currentDate.month(), date: d })}
            isSelected={
              selectedDay.year === currentDate.year() &&
              selectedDay.month === currentDate.month() &&
              selectedDay.date === d
            }
          >
            {d}
            {gamesByDate[d] && (
              <DotGroup>
                {gamesByDate[d].map((color, idx) => (
                  <Dot key={idx} style={{ backgroundColor: color }} />
                ))}
              </DotGroup>
            )}
          </DayBox>
        ))}
      </DaysGrid>
    </CalendarWrapper>
  );
};

export default Calender;
