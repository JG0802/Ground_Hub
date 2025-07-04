import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import formations from '../../data/formation.json';
import tactics from '../../data/tactic.json';

const PageWrapper = styled.div`
  padding: 7vh 2vw 3vh;
  background-color: #f9f9f9;
`;

const LibCard = styled.div`
  background-color: #fff;
  border-radius: 12px;
  padding: 2vh;
  margin-bottom: 3vh;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  cursor: pointer;
  transition: transform 0.1s ease-in-out;

  &:hover {
    transform: scale(1.01);
  }
`;

const LibText = styled.p`
  font-size: 1.5vh;
  color: #555;
  margin: 0 0 0.5vh;
`;

const LibTitle = styled.h3`
  font-size: 1.8vh;
  font-weight: bold;
  margin: 0 0 1vh;
`;

const LibImage = styled.img`
  width: 100%;
  border-radius: 1vh;
  object-fit: cover;
`;

const TAB_LIST = [
  { key: 'formation', label: 'Formation Lib.' },
  { key: 'tactics', label: 'Tactics Lib.' },
];

const TabBanner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 12px;
  margin: 2vh 0 3vh 0;
  padding: 2vh 0;
  font-size: 2.5vh;
  font-weight: bold;
  gap: 4vh;
  background-color: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
`;

const TabItem = styled.span`
  cursor: pointer;
  color: ${({ active }) => (active ? '#222' : '#aaa')};
  padding: 0 1vh;
  transition: color 0.2s, border-bottom 0.2s;
`;

const LibPage = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const initialTab = searchParams.get('tab') || 'formation';
  const [activeTab, setActiveTab] = useState(initialTab);

  const handleTabChange = (key) => {
    setActiveTab(key);
    setSearchParams({ tab: key });
  };

  useEffect(() => {
    const tab = searchParams.get('tab') || 'formation';
    setActiveTab(tab);
  }, [searchParams]);

  return (
    <PageWrapper>
      {/* 상단 배너형 탭(타이틀 역할) */}
      <TabBanner>
        {TAB_LIST.map((tab) => (
          <TabItem
            key={tab.key}
            active={activeTab === tab.key}
            onClick={() => handleTabChange(tab.key)}
          >
            {tab.label}
          </TabItem>
        ))}
      </TabBanner>

      {/* 탭별 내용 */}
      {activeTab === 'formation' && (
        <>
          {formations.map((form) => (
            <div key={form.id}>
              <LibCard onClick={() => navigate(`/lib/detail/formation/${form.id}`)}>
                <LibText>{form.summation}</LibText>
                <LibTitle>{form.title}</LibTitle>
                <LibImage src={form.img} alt={form.title} />
              </LibCard>
            </div>
          ))}
        </>
      )}

      {activeTab === 'tactics' && (
        <>
          {tactics.map((tactic) => (
            <div key={tactic.id}>
              <LibCard onClick={() => navigate(`/lib/detail/tactic/${tactic.id}`)}>
                <LibTitle>{tactic.title}</LibTitle>
                <LibText>{tactic.summation}</LibText>
              </LibCard>
            </div>
          ))}
        </>
      )}
    </PageWrapper>
  );
};

export default LibPage;

