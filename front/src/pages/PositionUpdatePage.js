import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

const PositionUpdatePage = () => {
  const { id } = useParams();

  useEffect(() => {
    console.log('✅ PositionUpdatePage 진입됨:', id);

    return () => {
      console.log('🧼 PositionUpdatePage 언마운트됨');
    };
  }, []);

  return <p>포지션 업데이트</p>;
};

export default PositionUpdatePage;
