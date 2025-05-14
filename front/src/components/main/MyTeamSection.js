// src/components/home/MyTeamSection.js
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

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
  const [teams, setTeams] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const userMail = sessionStorage.getItem('userMail');

  // 데이터 불러오기
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
      } finally {
        setIsLoading(false); // ✅ 무조건 로딩 끝내기
      }
    };

    fetchTeams();
  }, [userMail]);

  // ✅ 로딩 중일 때 별도 UI 출력
  if (isLoading) {
    return (
      <SectionWrapper>
        <TitleWrapper>
          <Title>Schedule</Title>
        </TitleWrapper>
        <div style={{ textAlign: 'center', padding: '2vh', fontSize: '1.8vh' }}>
          불러오는 중...
        </div>
      </SectionWrapper>
    );
  }

  return (
    <SectionWrapper>
      <TitleWrapper>
        <Title>My Team</Title>
        <Link
          to="/myteam"
          style={{ fontSize: '2vh', textDecoration: 'none', color: 'inherit' }}
        >
          {'>'}
        </Link>
      </TitleWrapper>
      <TeamList>
        {teams.map((team, index) => (
          <Link
            to={`/teams/${team.teamId}`}
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            <TeamItem key={index}>
              <TeamImage src={team.img} alt={team.teamId} />
              <TeamName>
                {team.teamName}({team.teamId})
              </TeamName>
            </TeamItem>
          </Link>
        ))}
      </TeamList>
    </SectionWrapper>
  );
};

export default MyTeamSection;
