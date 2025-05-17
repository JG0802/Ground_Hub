import { useState, useEffect } from 'react';
import styled from 'styled-components';

// TeamListPage에서 사용한 styled-components 재사용
const Container = styled.div`
  padding: 2vh;
`;

const Header = styled.h2`
  font-size: 2.4vh;
  font-weight: bold;
  margin-bottom: 2vh;
`;

const TeamCard = styled.div`
  display: flex;
  align-items: center;
  padding: 1.5vh 0;
  border-bottom: 1px solid #eee;
`;

const TeamLogo = styled.img`
  width: 8vh;
  height: 8vh;
  border-radius: 1vh;
  object-fit: cover;
  margin-right: 2vh;
`;

const TeamInfo = styled.div`
  flex: 1;
`;

const TeamName = styled.div`
  font-size: 2vh;
  font-weight: bold;
  margin-bottom: 1vh;
`;

const Tag = styled.span`
  background-color: #ccc;
  color: #000;
  border-radius: 0.5vh;
  font-size: 1.4vh;
  padding: 0.2vh 1vh;
  margin-right: 1vh;
`;

const ColorDots = styled.div`
  display: flex;
  gap: 1vh;
`;

const Dot = styled.div`
  width: 2vh;
  height: 2vh;
  border-radius: 50%;
  background-color: ${(props) => props.color};
`;

const MyTeamsPage = () => {
  const [teams, setTeams] = useState([]);

  const userMail = localStorage.getItem('userMail');

  useEffect(() => {
    if (!userMail) {
      setTeams([]);
      return;
    }
    // 대충 여기 API
    fetch(`/teams/mail/${userMail}`)
      .then(res => {
        if (!res.ok) throw new Error("사용자가 속한 팀을 찾을 수 없습니다.");
        return res.json();
      })
      .then(data => setTeams(data))
      .catch(() => setTeams([]))
  }, [userMail]);

  return (
    <Container>
      <Header>나의 팀 목록</Header>
      {teams.length === 0 ? (
        <div>참여 중인 팀이 없습니다.</div>
      ) : (
        teams.map((team, i) => (
          <TeamCard key={i}>
            <TeamLogo src={team.logo} alt="team logo" />
            <TeamInfo>
              <TeamName>{team.name}</TeamName>
              <div>
                <Tag>회원</Tag>{team.members}명
              </div>
              <div>
                <Tag>위치</Tag>{team.location}
              </div>
            </TeamInfo>
            <ColorDots>
              {team.colors && team.colors.map((c, j) => (
                <Dot key={j} color={c} />
              ))}
            </ColorDots>
          </TeamCard>
        ))
      )}
    </Container>
  );
};

export default MyTeamsPage;