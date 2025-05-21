import { useNavigate } from 'react-router-dom';
import formations from '../data/formation.json';
import Line from '../components/common/Line.js';

const FormationPage = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h2>Formation Lib.</h2>
      {formations.map((form) => (
        <>
          <Line />
          <div
            key={form.id}
            onClick={() => navigate(`/formation/${form.id}`)}
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
              src={form.img}
              alt={form.title}
              style={{ width: '100%', borderRadius: '1vh' }}
            />
          </div>
        </>
      ))}
    </div>
  );
};

export default FormationPage;
