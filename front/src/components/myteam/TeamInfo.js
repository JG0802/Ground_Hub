import { Link } from 'react-router-dom';

const TeamInfo = (games) => {
  const handleLeave = async () => {
    const teamId = sessionStorage.getItem('teamId');
    const userMail = sessionStorage.getItem('userMail');

    if (!teamId || !userMail) {
      alert('팀 ID 또는 사용자 이메일이 존재하지 않습니다.');
      return;
    }

    try {
      const response = await fetch(`/api/teams/${teamId}/remove-user`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userMail }),
      });

      if (response.ok) {
        alert('팀에서 성공적으로 탈퇴하였습니다.');
        sessionStorage.removeItem('teamId'); // 탈퇴 후 팀 정보 제거
        window.location.reload(); // 필요 시 새로고침
      } else {
        const message = await response.text();
        alert(`탈퇴 실패: ${message}`);
      }
    } catch (err) {
      console.error('요청 중 오류:', err);
      alert('서버 요청 중 오류가 발생했습니다.');
    }
  };
  return (
    <div>
      <h2>포메이션 목록</h2>
      <ul>
        {(() => {
          const items = [];
          for (let i = 0; i < games.games.length; i++) {
            const game = games.games[i];
            items.push(
              <li key={game.gameName}>
                <Link to={`/position/view/${game.gameId}`}>
                  {game.gameName} ({game.date.slice(0, 10)})
                </Link>
              </li>,
            );
          }
          return items;
        })()}
      </ul>
      <button onClick={handleLeave}>팀 탈퇴하기</button>
    </div>
  );
};

export default TeamInfo;
