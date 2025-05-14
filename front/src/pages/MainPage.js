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
      <h2>Ground Hub</h2>
      <FormationCarousel />
      <MyTeamSection />
      <ScheduleSection />
      {/* <Calendar /> ❌ 제거 */}
    </PageWrapper>
  );
};

export default MainPage;
