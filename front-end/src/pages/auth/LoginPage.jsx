import styled from "styled-components";
import AuthForm from "../../components/auth/LoginForm";
import { Link } from "react-router-dom";

const LoginPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`
const StyledLogo = styled.h1`
  margin-top: 10vh;
  margin-bottom: 8vh;
  font-family: 'MarinesBold', sans-serif;
  font-size: 4.5vh;
`;

const LinkContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 90%;
  font-size: 1.6vh;
`;

const StyledLink = styled(Link)`
  color: #8f8f8f;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

const LoginPage = () => {
  return (
  <LoginPageContainer>
    <StyledLogo>Ground Hub</StyledLogo>
    <AuthForm />
    <LinkContainer>
      <StyledLink to="/signup">회원가입</StyledLink>
      <StyledLink to="/">아이디 비밀번호 찾기</StyledLink> 
    </LinkContainer>
  </LoginPageContainer>
  );
};

export default LoginPage;
