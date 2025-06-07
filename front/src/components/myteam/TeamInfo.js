import dayjs from 'dayjs';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import altImage from '../../img/alt_image.png';

const Section = styled.div`
  margin-top: 4vh;
`;

const SectionTitle = styled.h2`
  font-size: 2.2vh;
  margin-bottom: 2vh;
`;

const MatchCard = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5vh;
  margin-bottom: 1.5vh;
  border-radius: 1vh;
  background-color: #f8f8f8;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.05);
`;

const TeamBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 25%;
`;

const Logo = styled.img`
  width: 6vh;
  height: 6vh;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 0.5vh;
`;

const TeamName = styled.div`
  font-size: 1.6vh;
  font-weight: bold;
  text-align: center;
`;

const CenterInfo = styled.div`
  text-align: center;
  font-size: 1.6vh;
  width: 30%;
`;

const VsText = styled.div`
  font-size: 2.6vh;
  font-weight: bold;
  margin: 1vh 0;
`;

const ButtonBox = styled.div`
  display: flex;
  justify-content: center;
  gap: 2vh;
  margin-top: 3vh;
`;

const StyledButton = styled.button`
  background-color: black;
  color: white;
  width: 100%;
  height: 6vh;
  font-size: 2vh;
  border-radius: 0.7vh;
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
    if (!teamId || !userMail) return alert('정보 누락');
    try {
      const res = await fetch(`/api/teams/${teamId}/remove-user`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userMail }),
      });
      if (res.ok) {
        alert('팀 탈퇴 완료');
        sessionStorage.removeItem('teamId');
        window.location.reload();
      } else {
        alert(`탈퇴 실패: ${await res.text()}`);
      }
    } catch (err) {
      console.error(err);
      alert('서버 오류');
    }
  };

  const sortedGames = [...games].sort((a, b) =>
    dayjs(a.date).isAfter(dayjs(b.date)) ? 1 : -1
  );

  return (
    <Section>
      <SectionTitle>📅 경기 일정</SectionTitle>
      {games.length === 0 ? (
        <div style={{ fontSize: '1.6vh', color: '#888' }}>
          예정된 경기가 없습니다.
        </div>
      ) : (
        sortedGames.map((game) => (
          <Link
            key={game.gameId}
            to={`/position/view/${game.gameId}`}
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            <MatchCard>
              <TeamBox>
                <Logo
                  src={`/logos/${game.team.logo}`}
                  onError={(e) => (e.target.src = altImage)}
                />
                <TeamName>{game.team.teamName}</TeamName>
              </TeamBox>
              <CenterInfo>
                <div>{game.gameName}</div>
                <div>{dayjs(game.date).format('YYYY.MM.DD')}</div>
                <VsText>VS</VsText>
              </CenterInfo>
              <TeamBox>
                <Logo
                  src={`/logos/${game.logo}`}
                  onError={(e) => (e.target.src = altImage)}
                />
                <TeamName>{game.versus}</TeamName>
              </TeamBox>
            </MatchCard>
          </Link>
        ))
      )}

      <ButtonBox>
        {userMail === teamManagerMail ? (
          <Link to="/game/create" style={{ width: '100%' }}>
            <StyledButton>경기 추가</StyledButton>
          </Link>
        ) : (
          <StyledButton onClick={handleLeave}>팀 탈퇴하기</StyledButton>
        )}
      </ButtonBox>
    </Section>
  );
};

export default TeamInfo;
