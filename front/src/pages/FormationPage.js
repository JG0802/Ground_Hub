import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import formations from '../data/formation.json';
import tactics from '../data/tactic.json';
import Line from '../components/common/Line.js';

const TAB_LIST = [
  { key: 'formation', label: 'Formation Lib.' },
  { key: 'tactics', label: 'Tactics Lib.' },
];

const FormationPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('formation');

  return (
    <div>
      {/* 상단 배너형 탭 */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          // background: '#f5f5f5',
          borderRadius: '2vh',
          margin: '2vh 0',
          padding: '2vh 0',
          fontSize: '2.5vh',
          fontWeight: 'bold',
          gap: '4vh',
        }}
      >
        {TAB_LIST.map((tab) => (
          <span
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            style={{
              cursor: 'pointer',
              color: activeTab === tab.key ? '#222' : '#aaa',
              // borderBottom: activeTab === tab.key ? '2px solid #222' : 'none',
              padding: '0 1vh',
              transition: 'color 0.2s, border-bottom 0.2s',
            }}
          >
            {tab.label}
          </span>
        ))}
      </div>
      <Line />

      {/* 탭별 내용 */}
      {activeTab === 'formation' && (
        <>
          {formations.map((form) => (
            <div key={form.id}>
              <div
                onClick={() => navigate(`/detail/formation/${form.id}`)}
                style={{
                  marginBottom: '2vh',
                  backgroundColor: '#eee',
                  borderRadius: '2vh',
                  padding: '2vh',
                  cursor: 'pointer',
                  marginTop: '2vh',
                }}
              >
                <p>{form.summation}</p>
                <h3>{form.title}</h3>
                <img
                  src={`/library/${form.img}`}
                  alt={form.title}
                  style={{ width: '100%', borderRadius: '1vh' }}
                />
              </div>
              <Line />
            </div>
          ))}
        </>
      )}

      {activeTab === 'tactics' && (
        <>
          {tactics.map((tactic) => (
            <div key={tactic.id}>
              <div
                onClick={() => navigate(`/detail/tactic/${tactic.id}`)}
                style={{
                  marginBottom: '2vh',
                  backgroundColor: '#eee',
                  borderRadius: '2vh',
                  padding: '2vh',
                  cursor: 'pointer',
                  marginTop: '2vh',
                }}
              >
                <h3>{tactic.title}</h3>
                <p>{tactic.summation}</p>
              </div>
              <Line />
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default FormationPage;
