import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledLogo = styled.h1`
  margin-top: 10vh;
  margin-bottom: 8vh;
  font-family: 'MarinesBold', sans-serif;
  font-size: 4.5vh;
`;

const StyledTitle = styled.h1`
  font-size: 2.4vh;
  font-weight: bold;
  margin-bottom: 4vh;
`;

const StyledInput = styled.input`
  width: 90%;
  height: 6vh;
  font-size: 2vh;
  border-radius: 6px;
  border: 1px solid #b9b9b9;
  padding: 1vh;
  margin-bottom: 2vh;
  box-sizing: border-box;
`;

const StyledButton = styled.button`
  background-color: black;
  color: white;
  width: 90%;
  height: 6vh;
  font-size: 2vh;
  border-radius: 6px;
  margin-bottom: 2vh;
  box-sizing: border-box;
  border: none;
  &:hover {
    cursor: pointer;
  }
`;

const StyledLink = styled.p`
  font-size: 1.6vh;
  color: #8f8f8f;
  text-decoration: none;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;

const SignUpInfo = ({ value, onChange, onNext }) => {
  const handleInputChange = (field) => (e) => {
    onChange({ ...value, [field]: e.target.value });
  }
  const [passwordCheck, setPasswordCheck] = useState('');
  const navigate = useNavigate();

  const handleContinue = () => {
    if (!value.password || !passwordCheck || !value.tel || !value.userName) {
      alert('모든 항목을 입력해주세요.');
      return;
    }

    if (value.password !== passwordCheck) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }

    onNext();
  };

  return (
    <Container>
      <StyledInput
        type="password"
        placeholder="비밀번호 입력"
        value={value.password}
        onChange={handleInputChange('password')}
      />
      <StyledInput
        type="password"
        placeholder="비밀번호 확인"
        onChange={(e) => setPasswordCheck(e.target.value)}
      />
      <StyledInput
        placeholder="이름"
        value={value.userName}
        onChange={handleInputChange('userName')}
      />
      <StyledInput
        type="tel"
        placeholder="010-1234-5678"
        value={value.tel}
        onChange={handleInputChange('tel')}
      />
      <StyledButton onClick={handleContinue}>계속</StyledButton>
    </Container>
  );
};

export default SignUpInfo;
