import styled from 'styled-components';
import AuthForm from './AuthForm';

const AuthTemplateContainer = styled.div`
  text-align: center;
`;

const StyledLogo = styled.h1`
  margin-top: 10vh;
  margin-bottom: 8vh;
  font-family: 'MarinesBold', sans-serif;
  font-size: 4.5vh;
`;

const AuthTemplate = () => {
  return (
    <AuthTemplateContainer>
      <StyledLogo>Ground Hub</StyledLogo>
      <AuthForm />
    </AuthTemplateContainer>
  );
};

export default AuthTemplate;
