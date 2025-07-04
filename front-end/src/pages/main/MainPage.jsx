// src/pages/main/MainPage.jsx
import FormationCarousel from '../../components/main/FormationCarousel';
import MyTeamSection from '../../components/main/MyTeamSection';
import ScheduleSection from '../../components/main/ScheduleSection';
import styled from 'styled-components';

const PageWrapper = styled.div`
  padding-top: 8vh; /* ✅ 헤더 고정 여유 공간 */
  padding-bottom: 2vh;
  background: linear-gradient(to bottom, #f0f4f8, #f9f9f9);
  min-height: 100vh;
  box-sizing: border-box;
`;

const SectionWrapper = styled.div`
  padding: 2vh 2vw;
  margin-bottom: 4vh;
  background-color: #ffffff;
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s, box-shadow 0.3s;

  &:hover {
    transform: scale(1.02);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.1);
  }

  @media (max-width: 768px) {
    padding: 1.5vh 3vw;
  }

  @media (max-width: 480px) {
    padding: 1vh 4vw;
  }
`;

const MainPage = () => {
  return (
    <PageWrapper>
      <SectionWrapper>
        <FormationCarousel />
      </SectionWrapper>

      <SectionWrapper>
        <MyTeamSection />
      </SectionWrapper>

      <SectionWrapper>
        <ScheduleSection />
      </SectionWrapper>
    </PageWrapper>
  );
};

export default MainPage;
