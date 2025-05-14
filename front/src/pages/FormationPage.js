import { useNavigate } from 'react-router-dom';

const formations = [
  { id: 1, title: '4-2-3-1', description: '미드필더 5명을 바탕으로 한 만능 포메이션' },
  { id: 2, title: '4-4-2', description: '전통적인 수비 안정형 포메이션' },
  { id: 3, title: '3-5-2', description: '미드필더 활용 극대화 포메이션' },
];

const FormationPage = () => {
  const navigate = useNavigate();

  return (
    <div style={{ padding: '2vh' }}>
      <h2>Formation Lib.</h2>
      {formations.map((form) => (
        <div
          key={form.id}
          onClick={() => navigate(`/formation/${form.id}`)}
          style={{
            marginBottom: '2vh',
            backgroundColor: '#f5f5f5',
            borderRadius: '2vh',
            padding: '2vh',
            cursor: 'pointer',
          }}
        >
          <p>{form.description}</p>
          <h3>{form.title}</h3>
          <img
            src="/images/formation.png"
            alt={form.title}
            style={{ width: '100%', borderRadius: '1vh' }}
          />
        </div>
      ))}
    </div>
  );
};

export default FormationPage;
