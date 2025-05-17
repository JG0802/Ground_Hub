import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import altImage from '../img/alt_image.png';

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
  font-size: 2vh;
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
  flex-direction: column;
  gap: 1vh;
`;

const Dot = styled.div`
  width: 2vh;
  height: 2vh;
  border-radius: 50%;
  background-color: ${(props) => props.color};
`;

const TeamListPage = () => {
  const [teams, setTeams] = useState(null);
  const [search, setSearch] = useState();

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const response = await fetch(`/api/teams/`);
        if (response.ok) {
          const data = await response.json();
          setTeams(data);
        } else {
          alert(await response.text());
        }
      } catch (err) {
        console.error(err);
        alert('서버와 통신 중 오류가 발생했습니다.');
      }
    };

    fetchTeams();
  }, []);

  const searchTeam = async (teamName) => {
    try {
      const response = await fetch(`/api/teams/name/${teamName}`);
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setTeams(data);
      } else {
        alert(await response.text());
      }
    } catch (err) {
      console.error(err);
      alert('서버와 통신 중 오류가 발생했습니다.');
    }
  };

  if (!teams) return <div>로딩중</div>;

  return (
    <Container>
      <Header>Team List</Header>
      <SearchRow>
        <SearchInput
          placeholder="Search Team name"
          onChange={(e) => setSearch(e.target.value)}
        />
        <AddButton onClick={() => searchTeam(search)}>🔎</AddButton>
      </SearchRow>
      {teams.map((team, i) => (
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
      ))}
    </Container>
  );
};

export default TeamListPage;
