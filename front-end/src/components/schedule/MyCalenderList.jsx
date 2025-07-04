import dayjs from 'dayjs';
import MyCalender from './MyCalender';

const MyCalenderList = ({ games, selectedDay }) => {
  const selectedDate = dayjs(`${selectedDay.year}-${selectedDay.month + 1}-${selectedDay.date}`);

  const filteredGames = games.filter((g) =>
    dayjs(g.date).isSame(selectedDate, 'day')
  );

  if (!selectedDay.date) return null;

  return (
    <div style={{ paddingTop: '3vh', fontSize: '1.8vh' }}>
      <h3>{selectedDate.format('YYYY-MM-DD')} 경기 일정</h3>
      {filteredGames.length > 0 ? (
        filteredGames.map((game) => (
          <MyCalender key={game.gameId} game={game} />
        ))
      ) : (
        <p style={{ textAlign: 'center', paddingTop: '1vh' }}>해당 날짜에 경기가 없습니다.</p>
      )}
    </div>
  );
};

export default MyCalenderList;
