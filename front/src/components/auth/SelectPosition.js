import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h1`
  margin-top: 10vh;
  font-size: 3vh;
  font-family: 'MarinesBold', sans-serif;
`;

const Subtitle = styled.p`
  margin: 4vh 0 2vh;
  font-size: 2.2vh;
  font-weight: bold;
`;

const PositionBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 2vh;
  margin-bottom: 4vh;
`;

const PositionItem = styled.button`
  padding: 1.5vh 3vh;
  font-size: 2vh;
  border-radius: 1vh;
  border: 1px solid ${({ selected }) => (selected ? 'black' : '#ccc')};
  background-color: ${({ selected }) => (selected ? 'black' : 'white')};
  color: ${({ selected }) => (selected ? 'white' : 'black')};
  cursor: pointer;
`;

const SubmitButton = styled.button`
  width: 40vh;
  height: 6vh;
  font-size: 2vh;
  border-radius: 0.7vh;
  background-color: black;
  color: white;
`;

const POSITIONS = ['FW', 'MF', 'DF', 'GK', 'LW', 'RW', 'CM', 'CB', 'LB', 'RB', 'ST', 'AM'];

const SelectPosition = () => {
  const [selected, setSelected] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();

  const email = new URLSearchParams(location.search).get('email');

  const togglePosition = (position) => {
    if (selected.includes(position)) {
      setSelected(selected.filter((p) => p !== position));
    } else if (selected.length < 3) {
      setSelected([...selected, position]);
    } else {
      alert('최대 3개까지 선택 가능합니다.');
    }
  };

  const handleSubmit = async () => {
    if (selected.length !== 3) {
      alert('포지션을 3개 선택해주세요.');
      return;
    }

    try {
      const response = await fetch('http://192.168.55.12:8080/api/users/updatePositions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: email,
          positions: selected,
        }),
      });

      if (response.ok) {
        alert('회원가입 완료!');
        navigate('/main');
      } else {
        const err = await response.text();
        alert(err || '포지션 설정 실패');
      }
    } catch (error) {
      console.error('서버 요청 중 오류:', error);
      alert('서버 요청 중 문제가 발생했습니다.');
    }
  };

  return (
    <Container>
      <Title>Ground Hub</Title>
      <Subtitle>선호 포지션을 3개 선택하세요</Subtitle>
      <PositionBox>
        {POSITIONS.map((pos) => (
          <PositionItem
            key={pos}
            onClick={() => togglePosition(pos)}
            selected={selected.includes(pos)}
          >
            {pos}
          </PositionItem>
        ))}
      </PositionBox>
      <SubmitButton onClick={handleSubmit}>회원가입 완료</SubmitButton>
    </Container>
  );
};

export default SelectPosition;
