import dayjs from 'dayjs';

const Calender = ({ currentDate, setCurrentDate, games, selectedDay, setSelectedDay }) => {

  // 이번 달 날짜 배열 생성
  const getDaysInMonth = () => {
    const start = currentDate.startOf('month').day();
    const end = currentDate.daysInMonth();
    const days = [];
    for (let i = 0; i < start; i++) days.push('');
    for (let i = 1; i <= end; i++) days.push(i);
    return days;
  };

  // 날짜별 경기 색상 저장
  const gamesByDate = games.reduce((acc, game) => {
    const gameDate = dayjs(game.date);
    if (gameDate.month() === currentDate.month() && gameDate.year() === currentDate.year()) {
      const day = gameDate.date();
      if (!acc[day]) acc[day] = [];
      if (!acc[day].includes(game.team.firstColor)) {
        acc[day].push(game.team.firstColor);
      }
    }
    return acc;
  }, {});

  return (
    <div className="mt-[3vh]">
      {/* 달력 헤더 */}
      <div className="flex justify-between items-center mb-[1.5vh]">
        <button onClick={() => setCurrentDate(currentDate.subtract(1, 'month'))} className="text-[2vh]">◀</button>
        <h3 className="text-[2vh] font-bold">{currentDate.format('YYYY년 M월')}</h3>
        <button onClick={() => setCurrentDate(currentDate.add(1, 'month'))} className="text-[2vh]">▶</button>
      </div>

      {/* 요일 헤더 */}
      <div className="grid grid-cols-7 text-center text-[1.6vh] text-gray-500 mb-[1vh] border-b border-gray-300 pb-[1vh]">
        {['일', '월', '화', '수', '목', '금', '토'].map((day) => (
          <div key={day} className={day === '일' ? 'text-red-400' : day === '토' ? 'text-blue-400' : ''}>
            {day}
          </div>
        ))}
      </div>

      {/* 날짜 그리드 */}
      <div className="grid grid-cols-7 gap-y-[1.2vh] text-center w-full">
        {getDaysInMonth().map((d, i) => {
          if (d === '') return <div key={i}></div>;

          const isToday = d === dayjs().date() && currentDate.isSame(dayjs(), 'month') && currentDate.isSame(dayjs(), 'year');
          const isSelected = d === selectedDay.date && currentDate.month() === selectedDay.month && currentDate.year() === selectedDay.year;

          return (
            <div
              key={i}
              onClick={() => setSelectedDay({ year: currentDate.year(), month: currentDate.month(), date: d })}
              className={`
                aspect-square min-h-[6vh] flex flex-col items-center justify-center relative cursor-pointer
                ${isSelected ? 'text-green-500 font-bold' : isToday ? 'text-black font-bold' : 'text-black font-normal'}
              `}
            >
              {/* 오늘 날짜 표시 */}
              {isToday && (
                <div className="absolute -top-[0vh] text-[1.2vh] text-gray-500 leading-none">today</div>
              )}

              {/* 날짜 숫자 */}
              <div className="text-[1.7vh]">{d}</div>

              {/* 경기 점 표시 */}
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
  );
};

export default Calender;
