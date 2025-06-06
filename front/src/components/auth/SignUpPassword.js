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

const KakaoButton = styled(StyledButton)`
  background-color: #fee500;
  color: #000;
  border: 2px solid black;
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

const SignUpPassword = () => {
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');
  const [tel, setTel] = useState('');
  const [userName, setUserName] = useState('');
  const navigate = useNavigate();

  const handleContinue = () => {
    if (!password || !passwordCheck || !tel || !userName) {
      alert('모든 항목을 입력해주세요.');
      return;
    }

    if (password !== passwordCheck) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }
    sessionStorage.setItem('password', password);
    sessionStorage.setItem('tel', tel);
    sessionStorage.setItem('userName', userName);

    // 다음 단계로 이동 (포지션 선택 페이지)
    navigate(`/signup/position`);
  };

  return (
    <Container>
      <StyledLogo>Ground Hub</StyledLogo>
      <StyledTitle>Sign Up</StyledTitle>
      <StyledInput
        type="password"
        placeholder="비밀번호 입력"
        onChange={(e) => setPassword(e.target.value)}
      />
      <StyledInput
        type="password"
        placeholder="비밀번호 확인"
        onChange={(e) => setPasswordCheck(e.target.value)}
      />
      <StyledInput
        placeholder="이름"
        onChange={(e) => setUserName(e.target.value)}
      />
      <StyledInput
        type="tel"
        placeholder="010-1234-5678"
        onChange={(e) => setTel(e.target.value)}
      />
      <StyledButton onClick={handleContinue}>Continue</StyledButton>
      <StyledLink onClick={() => navigate('/')}>
        로그인 페이지로 이동
      </StyledLink>
      <KakaoButton>카카오 계정으로 로그인</KakaoButton>
      <StyledLink style={{ width: '90%', textDecoration: 'underline' }}>
        By clicking continue, you agree to our Terms of Service and Privacy
        Policy
      </StyledLink>
    </Container>
  );
};

export default SignUpPassword;
