import { useParams, useNavigate } from 'react-router-dom';
import formations from '../data/formation.json';
import tactics from '../data/tactic.json';
import styled from 'styled-components';

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

const Title = styled.h2`
  font-size: 2.4vh;
  font-weight: 700;
  margin-bottom: 1.5vh;
  text-align: center;
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

const BackButton = styled.button`
  display: block;
  margin: 0 auto 2vh auto;
  padding: 0.7vh 2vw;
  background: #f5f5f5;
  border: none;
  border-radius: 1vh;
  font-size: 1.7vh;
  cursor: pointer;
  font-weight: 500;
  transition: background 0.2s;
  &:hover {
    background: #e0e0e0;
  }
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
        {/* 이전으로 버튼 */}
        <BackButton onClick={() => navigate(-1)}>이전 화면</BackButton>
        <Title>{data.title}</Title>
        <Summary>{data.summation}</Summary>
        <Description>{data.description1}</Description>
        {renderMedia()}
        <Description>{data.description2}</Description>
      </Card>
    </Container>
  );
};

export default FormationDetailPage;
