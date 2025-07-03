import { useEffect, useState } from 'react';
import styled from 'styled-components';
import TeamUpdate from '../../components/teams/TeamUpdate';
import TeamMemberList from '../../components/teams/TeamMemberList';

const Container = styled.div`
  padding: 10vh 2vw 10vh;
  max-width: 768px;
  margin: 0 auto;
  background-color: #f9f9f9;
`;

const TeamUpdatePage = () => {
  const [team, setTeam] = useState(null);
  const teamId = sessionStorage.getItem('teamId');

  useEffect(() => {
    const fetchTeam = async () => {
      const res = await fetch(`/api/teams/${teamId}`);
      const data = await res.json();
      setTeam(data);
    };
    fetchTeam();
  }, [teamId]);

  if (!team) return <div>로딩 중...</div>;

  return (
    <Container>
      <TeamUpdate team={team} />
      <TeamMemberList teamId={teamId} />
    </Container>
  );
};

export default TeamUpdatePage;