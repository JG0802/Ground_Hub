import { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import altImage from '../img/alt_image.png';

const FormContainer = styled.div`
  max-width: 480px;
  margin: 6vh auto;
  padding: 7vh 5vh;
  border-radius: 1.5vh;
  background-color: #ffffff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  padding-top: 7vh
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
  width: 100%;
  padding: 1.2vh;
  font-size: 1.8vh;
  border: 1px solid #ccc;
  border-radius: 0.7vh;
  &:focus {
    outline: none;
    border-color: #888;
  }
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
  transition: background-color 0.2s;

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
  const [oppoLogo, setOppoLogo] = useState();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const teamId = sessionStorage.getItem('teamId');
    if (!teamId) {
      alert('팀 ID가 존재하지 않습니다.');
      return;
    }

    let finalLogoFile = oppoLogo;
    if (!oppoLogo) {
      try {
        const response = await fetch(altImage);
        const blob = await response.blob();
        finalLogoFile = new File([blob], 'default-logo.png', {
          type: blob.type,
        });
      } catch (err) {
        console.error('기본 로고 로딩 실패:', err);
        alert('기본 로고 파일을 불러오는 데 실패했습니다.');
        return;
      }
    }

    try {
      const formData = new FormData();
      formData.append('versus', versus);
      formData.append('gameName', gameName);
      formData.append('startDate', startDate);
      formData.append('teamId', teamId);
      formData.append('oppoLogo', finalLogoFile);

      const response = await fetch('/api/games/create-game', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        alert('경기가 성공적으로 추가되었습니다.');
        navigate(`/teams/${teamId}`);
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
      <Title>경기 추가</Title>
      <form onSubmit={handleSubmit}>
        <InputField>
          <Label htmlFor="versus">상대팀명</Label>
          <Input
            type="text"
            id="versus"
            value={versus}
            onChange={(e) => setVersus(e.target.value)}
            required
          />
        </InputField>
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
          <Label htmlFor="startDate">날짜</Label>
          <Input
            type="datetime-local"
            id="startDate"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            required
          />
        </InputField>
        <InputField>
          <Label htmlFor="img">상대팀 로고 (비워둘 시 기본 로고 사용)</Label>
          <Input
            type="file"
            id="img"
            onChange={(e) => setOppoLogo(e.target.files[0])}
            accept="image/*"
          />
        </InputField>
        <SubmitButton type="submit">경기 추가</SubmitButton>
      </form>
    </FormContainer>
  );
};

export default CreateGamePage;
