import dayjs from 'dayjs';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import altImage from '../../img/alt_image.png';

const MatchCard = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5vh 0;
  border-bottom: 1px solid #eee;
  width: 100%;
`;

const TeamCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1.5vh 0;
  margin: 1vh;
`;

const TeamLogo = styled.img`
  width: 8vh;
  height: 8vh;
  border-radius: 1vh;
`;

const TeamName = styled.div`
  font-size: 2vh;
  font-weight: bold;
`;

const StyledButton = styled.button`
  background-color: black;
  color: white;
  width: 100%;
  height: 6vh;
  font-size: 2vh;
  border-radius: 0.7vh;
  margin-bottom: 2vh;
  box-sizing: border-box;
  margin-top: 2vh;
  &:hover {
    cursor: pointer;
  }
  &:disabled {
    background-color: #999;
    cursor: not-allowed;
  }
`;

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

  const sortedGames = [...games].sort((a, b) =>
    dayjs(a.date).isAfter(dayjs(b.date)) ? 1 : -1,
  );

  return (
    <div>
      <h2>포메이션 목록</h2>
      {games.length === 0 ? (
        <div>예정된 경기가 없습니다.</div>
      ) : (
        sortedGames.map((game, i) => (
          <Link
            key={game.gameId}
            to={`/position/view/${game.gameId}`}
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            <MatchCard>
              <TeamCard key={i}>
                <TeamLogo
                  src={`/logos/${game.team.logo}`}
                  onError={(e) => {
                    e.target.src = altImage;
                  }}
                />
                <TeamName>{game.team.teamName}</TeamName>
              </TeamCard>
              <TeamCard key={i}>
                <TeamName>{game.date.slice(0, 10)}</TeamName>
                <TeamName style={{ fontSize: '5vh' }}>VS</TeamName>
              </TeamCard>
              <TeamCard key={i}>
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
      )}

      {userMail === teamManagerMail ? (
        <div>
          <Link to="/game/create">경기 추가</Link>
          <Link to={`/team/update/${teamId}`}>
            <StyledButton>팀 정보 수정</StyledButton>
          </Link>
        </div>
      ) : (
        <StyledButton onClick={handleLeave}>팀 탈퇴하기</StyledButton>
      )}
    </div>
  );
};

export default TeamInfo;
