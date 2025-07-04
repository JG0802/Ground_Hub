// src/pages/games/CreateGamePage.jsx
import { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import CreateGame from '../../components/game/CreateGame';

const FormContainer = styled.div`
  max-width: 480px;
  margin: 6vh auto;
  padding: 7vh 5vh;
  background-color: #ffffff;
  border-radius: 1.5vh;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const InputField = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 2.5vh;
`;

const Label = styled.label`
  font-size: 1.6vh;
  margin-bottom: 0.8vh;
  font-weight: bold;
`;

const Input = styled.input`
  padding: 1.2vh;
  font-size: 1.8vh;
  border: 1px solid #ccc;
  border-radius: 0.7vh;
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 1.6vh;
  font-size: 1.9vh;
  font-weight: bold;
  background-color: black;
  color: white;
  border: none;
  border-radius: 0.7vh;
  cursor: pointer;

  &:hover {
    background-color: #222;
  }
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 4vh;
  font-size: 2.5vh;
`;

const CreateGamePage = () => {
  const [versus, setVersus] = useState('');
  const [gameName, setGameName] = useState('');
  const [startDate, setStartDate] = useState('');
  const [oppoLogo, setOppoLogo] = useState(null);
  const navigate = useNavigate();
  const teamId = sessionStorage.getItem('teamId');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const success = await CreateGame({ versus, gameName, startDate, oppoLogo, teamId });
      if (success) {
        alert('경기가 성공적으로 추가되었습니다.');
        navigate(`/team/${teamId}`);
      }
    } catch (err) {
      alert(`생성 실패: ${err.message}`);
    }
  };

  return (
    <FormContainer>
      <Title>경기 추가</Title>
      <form onSubmit={handleSubmit}>
        <InputField>
          <Label>상대팀명</Label>
          <Input
            type="text"
            value={versus}
            onChange={(e) => setVersus(e.target.value)}
            required
          />
        </InputField>
        <InputField>
          <Label>경기 이름</Label>
          <Input
            type="text"
            value={gameName}
            onChange={(e) => setGameName(e.target.value)}
            required
          />
        </InputField>
        <InputField>
          <Label>날짜</Label>
          <Input
            type="datetime-local"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            required
          />
        </InputField>
        <InputField>
          <Label>상대팀 로고 (비워두면 기본 이미지)</Label>
          <Input
            type="file"
            accept="image/*"
            onChange={(e) => setOppoLogo(e.target.files[0])}
          />
        </InputField>
        <SubmitButton type="submit">경기 추가</SubmitButton>
      </form>
    </FormContainer>
  );
};

export default CreateGamePage;
