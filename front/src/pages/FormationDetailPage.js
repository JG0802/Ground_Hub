import { useParams } from 'react-router-dom';
import formations from '../data/formation.json';

const FormationDetailPage = () => {
  const { id } = useParams();
  const data = formations[id];

  if (!data)
    return (
      <div style={{ padding: '2vh' }}>포메이션 정보를 찾을 수 없습니다.</div>
    );

  return (
    <div style={{ padding: '2vh' }}>
      <h2>{data.title}</h2>
      <p>{data.summation}</p>
      <p>{data.description1}</p>
      <img
        src={data.img}
        alt={data.title}
        style={{ width: '100%', borderRadius: '1vh', marginTop: '2vh' }}
      />
      <p>{data.description2}</p>
    </div>
  );
};

export default FormationDetailPage;
