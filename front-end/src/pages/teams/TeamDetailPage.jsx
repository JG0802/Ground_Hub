import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import TeamInfo from '../../components/teams/TeamInfo';

const PageWrapper = styled.div`
  padding: 8vh 2vh 2vh;
  background-color: #f9f9f9;
  min-height: 100vh;
`;

const TeamDetailPage = () => {
  const { teamId } = useParams();
  sessionStorage.setItem('teamId', teamId);

  return (
    <PageWrapper>
      <TeamInfo teamId={teamId} />
    </PageWrapper>
  );
};

export default TeamDetailPage;
