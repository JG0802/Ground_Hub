// src/pages/MySchedulePage.js
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import altImage from '../img/alt_image.png';

const Container = styled.div`
  width: 90%;
  margin: 0 auto;
  padding: 6vh 2vw 6vh 2vw;
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
  margin-bottom: 2vh;
`;

const GameCard = styled.div`
  background-color: #fff;
  border-radius: 16px;
  box-shadow: 0 7px 8px rgba(0, 0, 0, 0.08);
  padding: 2vh 2vh;
  margin-bottom: 3vh;
  cursor: pointer;
  transition: box-shadow 0.3s ease;

  &:hover {
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.3);
  }

  @media (max-width: 768px) {
    &:hover {
      box-shadow: 0 10px 20px rgba(0, 0, 0, 0.25);
    }
  }

  @media (max-width: 480px) {
    &:hover {
      box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
    }
  }
`;

const MatchTitle = styled.h3`
  font-size: 1.8vh;
  font-weight: 600;
  margin-bottom: 0.7vh;
  margin-top: 0vh;
`;

const MatchInfo = styled.p`
  font-size: 1.5vh;
  color: #666;
  margin-bottom: 0.7vh;
`;

const MatchCard = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 2vh;
`;

const TeamCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TeamLogo = styled.img`
  width: 9vh;
  height: 9vh;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 1vh;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.1);
  border: 2px solid white;
`;

const TeamName = styled.div`
  font-size: 1.6vh;
  font-weight: bold;
  text-align: center;
  max-width: 10vh;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const VsText = styled.div`
  font-size: 2.4vh;
  font-weight: bold;
  margin-bottom: 1vh;
`;

const QuarterInfo = styled.div`
  font-size: 1.4vh;
  color: #666;
  text-align: center;
  margin-top: 1vh; // ✅ 글자 아래로 내리기
`;

const MySchedulePage = () => {
  const userMail = sessionStorage.getItem('userMail');
  const [teams, setTeams] = useState([]);
  const [games, setGames] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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
        <StyledTitle>경기 일정</StyledTitle>
        {games.length === 0 ? (
          <div style={{ textAlign: 'center', fontSize: '1.8vh' }}>
            예정된 경기가 없습니다.
          </div>
        ) : (
          sortedGames.map((game) => (
            <Link
              key={game.gameId}
              to={`/position/view/${game.gameId}`}
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              <GameCard>
                <MatchTitle>
                  {game.team.teamName} VS {game.versus}
                </MatchTitle>
                <MatchInfo>{dayjs(game.date).format('YYYY-MM-DD')}</MatchInfo>
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
                  <div style={{ textAlign: 'center' }}>
                    <VsText>VS</VsText>
                    <QuarterInfo>{game.gameName}</QuarterInfo>
                  </div>
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
