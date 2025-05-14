import { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  padding: 2vh;
`;

const Header = styled.h2`
  font-size: 2.4vh;
  font-weight: bold;
  margin-bottom: 2vh;
`;

const SearchRow = styled.div`
  display: flex;
  align-items: center;
  gap: 1vh;
  margin-bottom: 3vh;
`;

const SearchInput = styled.input`
  flex: 1;
  height: 4.5vh;
  padding: 0 1vh;
  font-size: 1.8vh;
  border: 1px solid #ccc;
  border-radius: 1vh;
`;

const AddButton = styled.button`
  width: 4.5vh;
  height: 4.5vh;
  font-size: 3vh;
  border-radius: 50%;
  background-color: #eee;
  border: none;
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

const TeamListPage = () => {
  const [teams] = useState([
    {
      name: '불도저 (Bool-Dozer)',
      members: 51,
      location: '단국대학교 대운동장',
      logo: '/images/logo.png',
      colors: ['#f24b4b', '#000000'],
    },
    // 여러 팀 데이터 추가 가능
  ]);

  return (
    <Container>
      <Header>Team List</Header>
      <SearchRow>
        <AddButton>+</AddButton>
        <SearchInput placeholder="Type the Team name" />
      </SearchRow>
      {teams.map((team, i) => (
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
            {team.colors.map((c, j) => (
              <Dot key={j} color={c} />
            ))}
          </ColorDots>
        </TeamCard>
      ))}
    </Container>
  );
};

export default TeamListPage;
