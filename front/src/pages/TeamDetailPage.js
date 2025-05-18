import { useParams } from 'react-router-dom';
import styled from 'styled-components';

const Wrapper = styled.div`
  max-width: 430px;
  margin: 0 auto;
  padding: 2vh;
  background-color: #fff;
  min-height: 100vh;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 2vh;
`;

const Logo = styled.img`
  width: 10vh;
  height: 10vh;
  border-radius: 50%;
  object-fit: cover;
  margin: 0 auto;
`;

const TeamName = styled.h2`
  font-size: 2.4vh;
  margin: 1vh 0;
`;

const InfoBox = styled.div`
  margin-top: 2vh;
  padding: 2vh;
  border: 1px solid #ddd;
  border-radius: 1vh;
  font-size: 1.8vh;
`;

const SectionTitle = styled.h3`
  font-size: 2vh;
  margin-top: 3vh;
  margin-bottom: 1vh;
`;

const Placeholder = styled.div`
  height: 20vh;
  background-color: #f5f5f5;
  border-radius: 1vh;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #999;
`;

const TeamDetailPage = () => {
  const { id } = useParams();

  // TODO: 추후 teamId 기반으로 데이터 fetch 예정
  const dummyTeam = {
    id,
    name: '불도저 FC',
    location: '단국대학교 운동장',
    logo: '/images/default-logo.png',
    memberCount: 17,
  };

  return (
    <Wrapper>
      <Header>
        <Logo src={dummyTeam.logo} alt="team-logo" />
        <TeamName>{dummyTeam.name}</TeamName>
      </Header>

      <InfoBox>
        <div><strong>📍 위치:</strong> {dummyTeam.location}</div>
        <div><strong>👥 인원:</strong> {dummyTeam.memberCount}명</div>
      </InfoBox>

      <SectionTitle>📌 팀 소개 / 공지</SectionTitle>
      <Placeholder>추후 콘텐츠 영역</Placeholder>

      <SectionTitle>📅 팀 일정</SectionTitle>
      <Placeholder>추후 일정 콘텐츠</Placeholder>
    </Wrapper>
  );
};

export default TeamDetailPage;
