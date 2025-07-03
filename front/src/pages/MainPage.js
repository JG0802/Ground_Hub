import FormationCarousel from '../components/main/FormationCarousel';
import MyTeamSection from '../components/main/MyTeamSection';
import ScheduleSection from '../components/main/ScheduleSection';
import styled from 'styled-components';

const PageWrapper = styled.div`
  padding-top: 8vh; /* ✅ 헤더 고정을 위한 여유 공간 */
  padding-left: 2vw;
  padding-right: 2vw;
  padding-bottom: 2vh;
  background-color: #f9f9f9;
  min-height: 100vh;
  box-sizing: border-box;
`;

const SectionCard = styled.div`
  background-color: #ffffff;
  border-radius: 12px;
  padding: 1.5vh 1.5vw;
  margin-bottom: 2.5vh;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
`;

const MainPage = () => {
  return (
    <PageWrapper>
      <SectionCard>
        <FormationCarousel />
      </SectionCard>

      <SectionCard>
        <MyTeamSection />
      </SectionCard>

      <SectionCard>
        <ScheduleSection />
      </SectionCard>
    </PageWrapper>
  );
};

export default MainPage;