import { useParams } from 'react-router-dom';

const formations = {
  1: { title: '4-2-3-1', description: '미드필더 5명을 바탕으로 한 만능 포메이션' },
  2: { title: '4-4-2', description: '전통적인 수비 안정형 포메이션' },
  3: { title: '3-5-2', description: '미드필더 활용 극대화 포메이션' },
};

const FormationDetailPage = () => {
  const { id } = useParams();
  const data = formations[id];

  if (!data) return <div style={{ padding: '2vh' }}>포메이션 정보를 찾을 수 없습니다.</div>;

  return (
    <div style={{ padding: '2vh' }}>
      <h2>{data.title}</h2>
      <p>{data.description}</p>
      <img
        src="/images/formation.png"
        alt={data.title}
        style={{ width: '100%', borderRadius: '1vh', marginTop: '2vh' }}
      />
    </div>
  );
};

export default FormationDetailPage;
