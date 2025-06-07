import Line from '../components/common/Line';
import FormationCarousel from '../components/main/FormationCarousel';
import MyTeamSection from '../components/main/MyTeamSection';
import ScheduleSection from '../components/main/ScheduleSection';
import styled from 'styled-components';

const PageWrapper = styled.div`
  padding: 2vh;
`;

const MainPage = () => {
  return (
    <PageWrapper>
      <FormationCarousel />
      <Line />
      <MyTeamSection />
      <Line />
      <ScheduleSection />
    </PageWrapper>
  );
};

export default MainPage;
