import { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const FormContainer = styled.div`
  max-width: 400px;
  margin: 5vh auto;
  padding: 3vh;
  border: 1px solid #ccc;
  border-radius: 1vh;
  background-color: #f9f9f9;
`;

const InputField = styled.div`
  margin-bottom: 2vh;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5vh;
`;

const Input = styled.input`
  width: 100%;
  padding: 1vh;
  font-size: 2vh;
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 1.5vh;
  font-size: 2vh;
  background-color: black;
  color: white;
  border: none;
  border-radius: 0.5vh;
  cursor: pointer;

  &:hover {
    background-color: #333;
  }
`;

const CreateGamePage = () => {
  const [gameName, setGameName] = useState('');
  const [date, setDate] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const teamId = sessionStorage.getItem('teamId');
    if (!teamId) {
      alert('팀 ID가 존재하지 않습니다.');
      return;
    }

    try {
      const response = await fetch('/api/games/create-game', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          gameName,
          date,
          team: { teamId: Number(teamId) },
        }),
      });

      if (response.ok) {
        alert('경기가 성공적으로 추가되었습니다.');
        navigate(`/teams/${teamId}`); // 팀 상세 페이지로 이동
      } else {
        const errText = await response.text();
        alert(`생성 실패: ${errText}`);
      }
    } catch (error) {
      console.error(error);
      alert('서버 오류가 발생했습니다.');
    }
  };

  return (
    <FormContainer>
      <h2>경기 추가</h2>
      <form onSubmit={handleSubmit}>
        <InputField>
          <Label htmlFor="gameName">경기 이름</Label>
          <Input
            type="text"
            id="gameName"
            value={gameName}
            onChange={(e) => setGameName(e.target.value)}
            required
          />
        </InputField>
        <InputField>
          <Label htmlFor="date">날짜</Label>
          <Input
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </InputField>
        <SubmitButton type="submit">경기 추가</SubmitButton>
      </form>
    </FormContainer>
  );
};

export default CreateGamePage;
