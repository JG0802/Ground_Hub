import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import styled from 'styled-components';

const AuthFormContainer = styled.form`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const StyledTitle = styled.p`
  font-size: 2.4vh;
  font-weight: bold;
  margin-bottom: 4vh;
`;

const StyledInput = styled.input`
  width: 40vh;
  height: 6vh;
  font-size: 2vh;
  border-radius: 0.7vh;
  border: 1px solid #b9b9b9;
  padding: 1vh;
  margin-bottom: 2vh;
`;

const StyledButton = styled.button`
  background-color: black;
  color: white;
  width: 40vh;
  height: 6vh;
  font-size: 2vh;
  border-radius: 0.7vh;
  margin-bottom: 2vh;
  &:hover {
    cursor: pointer;
  }
  &:disabled {
    background-color: #999;
    cursor: not-allowed;
  }
`;

const LinkContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 40vh;
  font-size: 1.6vh;
  margin-bottom: 3vh;
`;

const StyledLink = styled(Link)`
  color: #8f8f8f;
  text-decoration: none;
`;

const AuthForm = () => {
  const [userMail, setUserMail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();

    if (!userMail || !password) {
      alert('아이디와 비밀번호를 입력하세요.');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('http://192.168.55.12:8080/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userMail, password }),
      });

      if (response.ok) {
        const data = await response.json();
        sessionStorage.setItem('userData', JSON.stringify(data));
        localStorage.setItem('userMail', data.userMail); // 추가: 이메일만 따로 저장
        navigate('/main');
      } else {
        const errMsg = await response.text();
        alert(errMsg || '로그인 실패: 아이디 또는 비밀번호를 확인하세요.');
      }
    } catch (err) {
      console.error('로그인 오류:', err);
      alert('서버와의 통신 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthFormContainer onSubmit={handleLogin}>
      <StyledTitle>Sign In</StyledTitle>
      <StyledInput
        type="email"
        placeholder="email@domain.com"
        onChange={(e) => setUserMail(e.target.value)}
      />
      <StyledInput
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <StyledButton type="submit" disabled={isLoading}>
        {isLoading ? '로그인 중...' : '로그인'}
      </StyledButton>

      <LinkContainer>
        <StyledLink to="/signup">회원가입</StyledLink>
        <StyledLink to="/find">아이디 비밀번호 찾기</StyledLink>
      </LinkContainer>
    </AuthFormContainer>
  );
};

export default AuthForm;
