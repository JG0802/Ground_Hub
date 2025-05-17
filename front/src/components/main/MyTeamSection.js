// src/components/home/MyTeamSection.js
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const SectionWrapper = styled.div`
  padding: 2vh;
`;

const TitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2vh;
`;

const Title = styled.h2`
  font-size: 2.2vh;
  font-weight: bold;
`;

const TeamList = styled.div`
  display: flex;
  gap: 2vh;
  overflow-x: auto;
`;

const TeamItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TeamImage = styled.img`
  width: 8vh;
  height: 8vh;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 1vh;
`;

const TeamName = styled.p`
  font-size: 1.6vh;
  text-align: center;
`;

const MyTeamSection = () => {
  const navigate = useNavigate();

  const teams = [
    { name: '불도저', img: '/images/team_booldozer.png' },
    { name: '팀 이름 1', img: '/images/team_1.png' },
    { name: '팀 이름 2', img: '/images/team_2.png' },
    { name: '팀 이름 3', img: '/images/team_3.png' },
  ];

  //클릭 시 /teams로 이동
  const handleTitleClick = () => {
    navigate('/teams/myTeams');
  };

  return (
    <SectionWrapper>
      <TitleWrapper onClick={handleTitleClick} style={{ cursor: 'pointer' }}>
        <Title>My Team</Title>
        <span style={{ fontSize: '2vh' }}>{'>'}</span>
      </TitleWrapper>
      <TeamList>
        {teams.map((team, index) => (
          <TeamItem key={index}>
            <TeamImage src={team.img} alt={team.name} />
            <TeamName>{team.name}</TeamName>
          </TeamItem>
        ))}
      </TeamList>
    </SectionWrapper>
  );
};

export default MyTeamSection;
