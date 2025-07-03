import styled from 'styled-components';
import SignUp from '../../components/auth/SignUp';
import { useNavigate } from 'react-router-dom';

const SignUpContainer = styled.div`
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

const StyledLink = styled.p`
  font-size: 1.6vh;
  color: #8f8f8f;
  text-decoration: none;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;

const SignUpPage = () => {
  const navigate = useNavigate();
  return (
    <SignUpContainer>
      <StyledLogo>Ground Hub</StyledLogo>
      <StyledTitle>회원가입</StyledTitle>
      <SignUp />
      <StyledLink onClick={() => navigate('/')}>
        로그인 페이지로 이동
      </StyledLink>
      <StyledLink style={{ width: '90%', textDecoration: 'underline' }}>
        계속 버튼 클릭 시 당사 서비스 약관 및 개인정보 보호정책에 동의합니다.
      </StyledLink>
    </SignUpContainer>
  );
}

export default SignUpPage;