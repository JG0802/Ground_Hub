import { Link } from 'react-router-dom';

const TeamInfo = ({ games, teamManagerMail }) => {
  const userMail = sessionStorage.getItem('userMail');
  const teamId = sessionStorage.getItem('teamId');

  const handleLeave = async () => {
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
        sessionStorage.removeItem('teamId');
        window.location.reload();
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
        {games && Array.isArray(games) && games.length > 0 ? (
          games.map((game) => (
            <li key={game.gameId}>
              <Link to={`/position/view/${game.gameId}`}>
                {game.gameName} ({game.date.slice(0, 10)})
              </Link>
            </li>
          ))
        ) : (
          <p>포메이션 목록이 없습니다.</p>
        )}
      </ul>

      {userMail === teamManagerMail ? (
        <div>
          <Link to="/game/create">경기 추가</Link>
          <Link to={`/team/update/${teamId}`}>
            <button>팀 정보 수정</button>
          </Link>
        </div>
      ) : (
        <button onClick={handleLeave}>팀 탈퇴하기</button>
      )}
    </div>
  );
};

export default TeamInfo;
