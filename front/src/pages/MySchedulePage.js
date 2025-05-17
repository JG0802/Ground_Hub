import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import altImage from '../img/alt_image.png';

const Container = styled.div`
  padding: 2vh;
  width: 80%;
`;

const StyledTitle = styled.h1`
  margin-top: 3vh;
  margin-bottom: 1vh;
  font-size: 2.7vh;
`;
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

  // 팀별 경기 정보 불러오기
  useEffect(() => {
    const fetchGamesForAllTeams = async () => {
      try {
        const allGames = [];

        for (const team of teams) {
          const res = await fetch(`/api/games/team/${team.teamId}`);
          if (res.ok) {
            const data = await res.json();
            // 각 game 객체에 team 정보를 주입
            const gamesWithTeam = data.map((game) => ({
              ...game,
              team, // team 정보 추가
            }));
            allGames.push(...gamesWithTeam);
          }
        }

        setGames(allGames);
      } catch (error) {
        console.error(error);
        alert('경기 데이터를 불러오는 중 오류 발생');
      } finally {
        setIsLoading(false); // ✅ 무조건 로딩 끝내기
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
      <StyledTitle>Schedule List</StyledTitle>
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
                  src={`/logos/${game.team.oppoLogo}`}
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
                  src={`/logos/${game.oppoLogo}`}
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
    </Container>
  );
};

export default MySchedulePage;
