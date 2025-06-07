import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import altImage from '../img/alt_image.png';
import TeamCreateModal from '../components/team/TeamCreateModal';

const Container = styled.div`
  padding: 7vh 2vw 3vh;
  background-color: #f9f9f9;
`;

const Title = styled.h1`
  font-size: 2.4vh;
  font-weight: 700;
  margin-bottom: 3vh;
  text-align: center;
`;

const SearchRow = styled.div`
  display: flex;
  gap: 1vh;
  margin-bottom: 3vh;
`;

const SearchInput = styled.input`
  flex: 1;
  height: 5vh;
  font-size: 1.8vh;
  padding: 0 1.5vh;
  border-radius: 1vh;
  border: 1px solid #ccc;
`;

const IconButton = styled.button`
  width: 5vh;
  height: 5vh;
  font-size: 2.2vh;
  background-color: #eee;
  border: none;
  border-radius: 50%;
  cursor: pointer;
`;

const Card = styled.div`
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  display: flex;
  align-items: flex-start;
  padding: 2vh;
  margin-bottom: 2vh;
`;

const TeamLogo = styled.img`
  width: 8vh;
  height: 8vh;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 2vh;
`;

const Info = styled.div`
  flex: 1;
`;

const TeamName = styled.div`
  font-size: 1.9vh;
  font-weight: bold;
  margin-bottom: 1vh;
`;

const TagRow = styled.div`
  font-size: 1.5vh;
  color: #555;
  margin-bottom: 0.5vh;
`;

const Tag = styled.span`
  background-color: #ddd;
  color: #222;
  font-size: 1.3vh;
  padding: 0.2vh 1vh;
  border-radius: 1vh;
  margin-right: 0.7vh;
`;

const ColorColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 1vh;
`;

const DotRow = styled.div`
  display: flex;
  align-items: center;
  gap: 1vh;
`;

const Dot = styled.div`
  width: 2vh;
  height: 2vh;
  border-radius: 50%;
  background-color: ${(props) => props.color};
  border: ${(props) =>
    props.color === 'white' ? '1px solid black' : `1px solid ${props.color}`};
`;

const DotLabel = styled.div`
  font-size: 1.5vh;
  width: 5vh;
  text-align: right;
`;

const TeamListPage = () => {
  const [teams, setTeams] = useState(null);
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);

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
        setTeams(data);
      } else {
        alert(await response.text());
      }
    } catch (err) {
      console.error(err);
      alert('서버와 통신 중 오류가 발생했습니다.');
    }
  };

  const handleAddTeam = async (newTeam, finalLogoFile) => {
    try {
      const formData = new FormData();
      formData.append(
        'team',
        new Blob([JSON.stringify(newTeam)], { type: 'application/json' }),
      );
      formData.append('logo', finalLogoFile);

      const response = await fetch('/api/teams/create-team', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        alert('팀 생성 완료!');
        window.location.reload();
      } else {
        const err = await response.text();
        alert(err || '팀 생성 실패');
      }
    } catch (error) {
      console.error('서버 요청 중 오류:', error);
      alert('서버 요청 중 문제가 발생했습니다.');
    }
    setShowModal(false);
  };

  if (!teams) return <div>로딩중</div>;

  return (
    <Container>
      <Title>Team List</Title>
      <SearchRow>
        <IconButton onClick={() => setShowModal(true)}>＋</IconButton>
        <SearchInput
          placeholder="Search Team name"
          onChange={(e) => setSearch(e.target.value)}
        />
        <IconButton onClick={() => searchTeam(search)}>🔍</IconButton>
      </SearchRow>

      {teams.map((team, i) => (
        <Link
          key={i}
          to={`/teams/${team.teamId}`}
          style={{ textDecoration: 'none', color: 'inherit' }}
        >
          <Card>
            <TeamLogo
              src={`/logos/${team.logo}`}
              onError={(e) => {
                e.target.src = altImage;
              }}
            />
            <Info>
              <TeamName>{team.teamName}</TeamName>
              <TagRow>
                <Tag>회원</Tag> {team.users.length}명
              </TagRow>
              <TagRow>
                <Tag>위치</Tag> {team.location}
              </TagRow>
            </Info>
            <ColorColumn>
              <DotRow>
                <DotLabel>HOME</DotLabel>
                <Dot color={team.firstColor} />
              </DotRow>
              <DotRow>
                <DotLabel>AWAY</DotLabel>
                <Dot color={team.secondColor} />
              </DotRow>
            </ColorColumn>
          </Card>
        </Link>
      ))}

      {showModal && (
        <TeamCreateModal
          onClose={() => setShowModal(false)}
          onCreate={handleAddTeam}
        />
      )}
    </Container>
  );
};

export default TeamListPage;
