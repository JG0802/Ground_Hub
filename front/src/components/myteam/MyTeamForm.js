import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import altImage from '../../img/alt_image.png';

const Container = styled.div`
  padding: 2vh;
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
  flex-direction: column;
  gap: 1vh;
`;

const Dot = styled.div`
  width: 2vh;
  height: 2vh;
  border-radius: 50%;
  background-color: ${(props) => props.color};
`;

const MyTeamForm = () => {
  const [teams, setTeams] = useState([]);
  const userMail = sessionStorage.getItem('userMail');

  // 데이터 불러오기
  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const response = await fetch(`/api/teams/mail/${userMail}`);
        if (response.ok) {
          const data = await response.json();
          setTeams(data); // 화면에 보여주기 위해 저장
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

  return (
    <Container>
      {teams.length === 0 ? (
        <div>참여 중인 팀이 없습니다.</div>
      ) : (
        teams.map((team, i) => (
          <Link
            to={`/teams/${team.teamId}`}
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            <TeamCard key={i}>
              <TeamLogo
                src={`/logos/${team.logo}`}
                onError={(e) => {
                  e.target.src = altImage;
                }}
              />
              <TeamInfo>
                <TeamName>{team.teamName}</TeamName>
                <div>
                  <Tag>회원</Tag>
                  {team.users.length}명
                </div>
                <div>
                  <Tag>위치</Tag>
                  {team.location}
                </div>
              </TeamInfo>
              <ColorDots>
                <Dot color={team.firstColor} />
                <Dot color={team.secondColor} />
              </ColorDots>
            </TeamCard>
          </Link>
        ))
      )}
    </Container>
  );
};

export default MyTeamForm;
