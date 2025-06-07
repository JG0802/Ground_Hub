import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import altImage from '../../img/alt_image.png';

const Container = styled.div`
  display: flex;
  width: 90%;
  flex-direction: column;
  gap: 2vh;
`;

const TeamCard = styled.div`
  display: flex;
  align-items: center;
  background-color: #fff;
  padding: 2vh;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
`;

const TeamLogo = styled.img`
  width: 8vh;
  height: 8vh;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 2vh;
`;

const TeamInfo = styled.div`
  flex: 1;
`;

const TeamName = styled.div`
  font-size: 1.8vh;
  font-weight: bold;
  margin-bottom: 1vh;
`;

const TagRow = styled.div`
  font-size: 1.4vh;
  color: #444;
  margin-bottom: 0.5vh;
`;

const Tag = styled.span`
  background-color: #ddd;
  color: #222;
  border-radius: 1vh;
  padding: 0.2vh 1vh;
  font-size: 1.3vh;
  margin-right: 0.7vh;
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
  border: ${(props) =>
    props.color === 'white' ? '1px solid #ccc' : `1px solid ${props.color}`};
`;

const MyTeamForm = () => {
  const [teams, setTeams] = useState([]);
  const userMail = sessionStorage.getItem('userMail');

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

  return (
    <Container>
      {teams.length === 0 ? (
        <div style={{ fontSize: '1.6vh', textAlign: 'center' }}>
          참여 중인 팀이 없습니다.
        </div>
      ) : (
        teams.map((team, i) => (
          <Link
            key={i}
            to={`/teams/${team.teamId}`}
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            <TeamCard>
              <TeamLogo
                src={`/logos/${team.logo}`}
                onError={(e) => {
                  e.target.src = altImage;
                }}
              />
              <TeamInfo>
                <TeamName>{team.teamName}</TeamName>
                <TagRow>
                  <Tag>회원</Tag>
                  {team.users.length}명
                </TagRow>
                <TagRow>
                  <Tag>위치</Tag>
                  {team.location}
                </TagRow>
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
