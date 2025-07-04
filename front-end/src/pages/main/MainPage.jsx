import FormationCarousel from '../../components/main/FormationCarousel';
import MyTeamSection from '../../components/main/MyTeamSection';
import ScheduleSection from '../../components/main/ScheduleSection';
import styled from 'styled-components';

const PageWrapper = styled.div`
  padding-top: 8vh;
  padding-bottom: 2vh;
  background-color: #ffffff;
  min-height: 100vh;
`;

const SectionWrapper = styled.div`
  padding: 2vh 2vw;

  @media (max-width: 768px) {
    padding: 1.5vh 3vw;
  }

  @media (max-width: 480px) {
    padding: 1vh 4vw;
  }
`;

const Divider = styled.div`
  height: 2vh;
  background-color: #f2f2f2;
  margin: 2vh 0;
`;

const MainPage = () => {
  return (
    <PageWrapper>
      <SectionWrapper>
        <FormationCarousel />
      </SectionWrapper>

      <Divider />

      <SectionWrapper>
        <MyTeamSection />
      </SectionWrapper>

      <Divider />

      <SectionWrapper>
        <ScheduleSection />
      </SectionWrapper>
    </PageWrapper>
  );
};

export default MainPage;
