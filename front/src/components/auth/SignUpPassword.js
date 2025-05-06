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

const Input = styled.input`
  width: 40vh;
  height: 6vh;
  font-size: 2vh;
  padding: 1vh;
  margin-bottom: 2vh;
  border: 1px solid #b9b9b9;
  border-radius: 0.7vh;
`;

const Button = styled.button`
  width: 40vh;
  height: 6vh;
  font-size: 2vh;
  border-radius: 0.7vh;
  background-color: black;
  color: white;
  margin-bottom: 3vh;
`;

const KakaoButton = styled(Button)`
  background-color: #fee500;
  color: #000;
`;

const StyledLink = styled.p`
  font-size: 1.6vh;
  color: #8f8f8f;
  margin-top: 1vh;
  text-decoration: underline;
  cursor: pointer;
`;

const SignUpPassword = () => {
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  const email = new URLSearchParams(location.search).get('email');

  const handleContinue = () => {
    if (!password || !passwordCheck) {
      alert('모든 항목을 입력해주세요.');
      return;
    }

    if (password !== passwordCheck) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }

    // 다음 단계로 이동 (포지션 선택 페이지)
    navigate(`/signup/position?email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`);
  };

  return (
    <Container>
      <Title>Ground Hub</Title>
      <Subtitle>Sign Up</Subtitle>
      <Input
        type="password"
        placeholder="비밀번호 입력"
        onChange={(e) => setPassword(e.target.value)}
      />
      <Input
        type="password"
        placeholder="비밀번호 확인"
        onChange={(e) => setPasswordCheck(e.target.value)}
      />
      <Button onClick={handleContinue}>Continue</Button>
      <StyledLink onClick={() => navigate('/')}>로그인 페이지로 이동</StyledLink>
      <KakaoButton>카카오 계정으로 로그인</KakaoButton>
      <StyledLink>
        By clicking continue, you agree to our Terms of Service and Privacy Policy
      </StyledLink>
    </Container>
  );
};

export default SignUpPassword;
