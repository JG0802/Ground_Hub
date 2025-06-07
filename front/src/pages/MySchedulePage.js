import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import altImage from '../img/alt_image.png';

const Container = styled.div`
  width: 90%;
  margin: 0 auto;  /* ✅ 가운데 정렬 */
  padding: 8vh 2vw vh; /* ✅ 잘못된 vh 제거하고 하단 패딩 지정 */
  background-color: #f9f9f9;
  display: flex;
  flex-direction: column;
  align-items: center;
`;


const Wrapper = styled.div`
  width: 100%;
  max-width: 50vh;
`;

const StyledTitle = styled.h1`
  font-size: 2.4vh;
  font-weight: 700;
  text-align: center;
  margin-bottom: 3vh;
`;

const GameCard = styled.div`
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  padding: 2vh;
  margin-bottom: 3vh;
  
`;

const MatchTitle = styled.h3`
  font-size: 1.8vh;
  font-weight: 600;
  margin-bottom: 1vh;
`;

const MatchInfo = styled.p`
  font-size: 1.5vh;
  color: #666;
  margin-bottom: 1.5vh;
`;

const MatchCard = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const TeamCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TeamLogo = styled.img`
  width: 10vh;
  height: 10vh;
  border-radius: 50%;
  object-fit: cover;
`;

const TeamName = styled.div`
  font-size: 1.6vh;
  font-weight: bold;
  margin-top: 1vh;
`;

const VsText = styled.div`
  font-size: 2.4vh;
  font-weight: bold;
`;

const MySchedulePage = () => {
  const userMail = sessionStorage.getItem('userMail');
  const [teams, setTeams] = useState([]);
  const [games, setGames] = useState([]);
  const [isLoading, setIsLoading] = useState();

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const response = await fetch(`/api/teams/mail/${userMail}`);
        if (response.ok) {
          const data = await response.json();
          setTeams(data);
        } else {
          alert(await response.text());
        }
      } catch (err) {
        console.error(err);
        alert('서버와의 통신 중 오류가 발생했습니다.');
      }
    };

    fetchTeams();
  }, [userMail]);

  useEffect(() => {
    const fetchGamesForAllTeams = async () => {
      try {
        const allGames = [];
        for (const team of teams) {
          const res = await fetch(`/api/games/team/${team.teamId}`);
          if (res.ok) {
            const data = await res.json();
            const gamesWithTeam = data.map((game) => ({
              ...game,
              team,
            }));
            allGames.push(...gamesWithTeam);
          }
        }
        setGames(allGames);
      } catch (error) {
        console.error(error);
        alert('경기 데이터를 불러오는 중 오류 발생');
      } finally {
        setIsLoading(false);
      }
    };

    if (teams.length > 0) {
      fetchGamesForAllTeams();
    }
  }, [teams]);

  if (isLoading) {
    return (
      <div style={{ textAlign: 'center', padding: '2vh', fontSize: '1.8vh' }}>
        불러오는 중...
      </div>
    );
  }

  const sortedGames = [...games].sort((a, b) =>
    dayjs(a.date).isAfter(dayjs(b.date)) ? 1 : -1,
  );

  return (
    <Container>
      <Wrapper>
        <StyledTitle>Ground Hub</StyledTitle>
        {games.length === 0 ? (
          <div style={{ textAlign: 'center', fontSize: '1.8vh' }}>예정된 경기가 없습니다.</div>
        ) : (
          sortedGames.map((game) => (
            <Link
              key={game.gameId}
              to={`/position/view/${game.gameId}`}
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              <GameCard>
                <MatchTitle>
                  VS {game.versus} | {game.gameName}
                </MatchTitle>
                <MatchInfo>
                  {game.team.teamName} | {game.date.slice(0, 10)}
                </MatchInfo>
                <MatchCard>
                  <TeamCard>
                    <TeamLogo
                      src={`/logos/${game.team.logo}`}
                      onError={(e) => {
                        e.target.src = altImage;
                      }}
                    />
                    <TeamName>{game.team.teamName}</TeamName>
                  </TeamCard>
                  <VsText>VS</VsText>
                  <TeamCard>
                    <TeamLogo
                      src={`/logos/${game.oppoLogo}`}
                      onError={(e) => {
                        e.target.src = altImage;
                      }}
                    />
                    <TeamName>{game.versus}</TeamName>
                  </TeamCard>
                </MatchCard>
              </GameCard>
            </Link>
          ))
        )}
      </Wrapper>
    </Container>
  );
};

export default MySchedulePage;
