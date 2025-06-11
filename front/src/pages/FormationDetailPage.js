import { useParams, useNavigate } from 'react-router-dom';
import formations from '../data/formation.json';
import tactics from '../data/tactic.json';
import styled from 'styled-components';
import backImg from '../img/back.png';

const Container = styled.div`
  margin-top: 8vh;
  background-color: #f9f9f9;
  display: flex;
  justify-content: center;
`;

const Card = styled.div`
  width: 100%;
  max-width: 60vh;
  background-color: #fff;
  border-radius: 12px;
  padding: 3vh;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
`;

const BackRow = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 2vh;
  position: relative;
`;

const BackIcon = styled.img`
  width: 2.4vh;
  height: 2.4vh;
  cursor: pointer;
  user-select: none;
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
`;

const Title = styled.h2`
  font-size: 2.4vh;
  font-weight: 700;
  margin-bottom: 1.5vh;
  text-align: center;
  flex: 1;
`;

const Summary = styled.p`
  font-size: 1.7vh;
  font-weight: 500;
  color: #333;
  text-align: center;
  margin-bottom: 2vh;
`;

const Description = styled.p`
  font-size: 1.6vh;
  color: #555;
  line-height: 1.6;
  margin-bottom: 2vh;
`;

const MediaBox = styled.div`
  width: 100%;
  margin-bottom: 2vh;
`;

const FormationDetailPage = () => {
  const { type, id } = useParams();
  const navigate = useNavigate();
  const data =
    type === 'formation'
      ? formations.find((f) => String(f.id) === id)
      : tactics.find((t) => String(t.id) === id);

  if (!data) {
    return (
      <Container>
        <Card>
          <Description>
            {type === 'formation'
              ? '포메이션 정보를 찾을 수 없습니다.'
              : '전술 정보를 찾을 수 없습니다.'}
          </Description>
        </Card>
      </Container>
    );
  }

  const renderMedia = () => {
    if (!data.img) return null;
    // mp4 동영상
    if (data.img.endsWith('.mp4')) {
      return (
        <MediaBox>
          <video
            src={data.img}
            controls
            style={{ width: '100%', borderRadius: '1vh', marginTop: '2vh' }}
          />
        </MediaBox>
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
        <MediaBox>
          <img
            src={data.img}
            alt={data.title}
            style={{ width: '100%', borderRadius: '1vh', marginTop: '2vh' }}
          />
        </MediaBox>
      );
    }
    // html 파일
    if (data.img.endsWith('.html')) {
      return (
        <MediaBox>
          <iframe
            src={data.img}
            title={data.title}
            style={{
              width: '100%',
              minHeight: 'calc(min(100vw, 50vh) * 0.6)',
              border: 'none',
              borderRadius: '1vh',
              marginTop: '2vh',
            }}
          />
        </MediaBox>
      );
    }
    return null;
  };

  return (
    <Container>
      <Card>
        <BackRow>
          <BackIcon src={backImg} alt='◀' onClick={() => navigate(-1)} />
          <Title style={{ width: '100%' }}>{data.title}</Title>
        </BackRow>
        <Summary>{data.summation}</Summary>
        <Description>{data.description1}</Description>
        {renderMedia()}
        <Description>{data.description2}</Description>
      </Card>
    </Container>
  );
};

export default FormationDetailPage;
