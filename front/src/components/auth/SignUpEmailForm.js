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

const SignUpEmail = () => {
  const [userMail, setUserMail] = useState('');
  const navigate = useNavigate();

  const handleContinue = async () => {
    if (!userMail.includes('@')) {
      alert('이메일 형식이 올바르지 않습니다.');
      return;
    }
    try {
      const response = await fetch(
        `/api/users/userMail-check?userMail=${encodeURIComponent(userMail)}`,
        {
          method: 'GET',
        },
      );

      if (response.ok) {
        alert('사용자가 존재합니다.');
        navigate('/signup');
      } else {
        sessionStorage.setItem('userMail', userMail);
        navigate(`/signup/password`);
      }
    } catch (error) {
      console.error('서버 요청 중 오류:', error);
      alert('서버 요청 중 문제가 발생했습니다.');
    }
  };

  return (
    <Container>
      <StyledLogo>Ground Hub</StyledLogo>
      <StyledTitle>Sign Up</StyledTitle>
      <StyledInput
        type="email"
        placeholder="email@domain.com"
        value={userMail}
        onChange={(e) => setUserMail(e.target.value)}
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

export default SignUpEmail;
