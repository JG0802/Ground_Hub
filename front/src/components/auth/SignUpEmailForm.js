import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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

const SignUpEmail = () => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleContinue = () => {
    if (!email.includes('@')) {
      alert('이메일 형식이 올바르지 않습니다.');
      return;
    }
    navigate(`/signup/password?email=${encodeURIComponent(email)}`);
  };

  return (
    <Container>
      <Title>Ground Hub</Title>
      <Subtitle>Sign Up</Subtitle>
      <Input
        type="email"
        placeholder="email@domain.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Button onClick={handleContinue}>Continue</Button>
      <StyledLink onClick={() => navigate('/')}>로그인 페이지로 이동</StyledLink>
      <KakaoButton>카카오 계정으로 로그인</KakaoButton>
      <StyledLink>By clicking continue, you agree to our Terms of Service and Privacy Policy</StyledLink>
    </Container>
  );
};

export default SignUpEmail;
