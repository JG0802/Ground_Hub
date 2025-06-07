import { useParams } from 'react-router-dom';
import formations from '../data/formation.json';
import tactics from '../data/tactic.json';

const FormationDetailPage = () => {
  const { type, id } = useParams();
  const data =
    type === 'formation'
      ? formations.find((f) => String(f.id) === id)
      : tactics.find((t) => String(t.id) === id);

  if (!data)
    return (
      <div style={{ padding: '2vh' }}>
        {type === 'formation' ? '포메이션 정보를 찾을 수 없습니다.' : '전술 정보를 찾을 수 없습니다.'}
      </div>
    );

  const renderMedia = () => {
    if (!data.img) return null;
    // mp4 동영상
    if (data.img.endsWith('.mp4')) {
      return (
        <video
          src={`/library/${data.img}`}
          controls
          style={{ width: '100%', borderRadius: '1vh', marginTop: '2vh' }}
        />
      );
    }
    // 이미지
    if (
      data.img.endsWith('.jpg') ||
      data.img.endsWith('.png') ||
      data.img.endsWith('.jpeg') ||
      data.img.endsWith('.gif')
    ) {
      return (
        <img
          src={data.img}
          alt={data.title}
          style={{ width: '100%', borderRadius: '1vh', marginTop: '2vh' }}
        />
      );
    }
    // html 파일
    if (data.img.endsWith('.html')) {
      return (
        <iframe
          src={data.img}
          title={data.title}
          style={{
            width: '100%',
            minHeight: '200px',
            border: 'none',
            borderRadius: '1vh',
            marginTop: '2vh',
          }}
        />
      );
    }
    return null;
  };

  return (
    <div style={{ padding: '2vh' }}>
      <h2>{data.title}</h2>
      <p>{data.summation}</p>
      <p>{data.description1}</p>
      {renderMedia()}
      <p>{data.description2}</p>
    </div>
  );
};

export default FormationDetailPage;
