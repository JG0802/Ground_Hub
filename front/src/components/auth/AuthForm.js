import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const AuthFormContainer = styled.form`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const StyledTitle = styled.p`
  font-size: 2.2vh;
  font-weight: bold;
  margin-bottom: 5vh;
`;

const StyledInput = styled.input`
  width: 40vh;
  height: 3vh;
  font-size: 2vh;
  border-radius: 0.7vh;
  border: 1px solid #b9b9b9;
  padding: 1vh;
  margin-bottom: 2vh;
  box-sizing: content-box;
`;

const StyledButton = styled.button`
  background-color: black;
  color: white;
  width: 40vh;
  height: 3vh;
  font-size: 2vh;
  border-radius: 0.7vh;
  padding: 1vh;
  margin-bottom: 2vh;
  box-sizing: content-box;
  &:hover {
    cursor: pointer;
  }
`;

const LinkContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 40vh;
`;

const StyledLink = styled.a`
  font-size: 1.8vh;
  color: #8f8f8f;
`;

const AuthForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginCheck, setLoginCheck] = useState(false);
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();

    if (!username || !password) {
      alert('아이디와 비밀번호를 입력하세요.');
      return;
    }

    await new Promise((r) => setTimeout(r, 1000));

    const response = await fetch('http://192.168.55.12:8080/api/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        password,
      }),
    }).catch((error) => {
      console.error('로그인 중 문제가 발생했습니다:', error);
      alert('로그인 중 문제가 발생했습니다.');
    });

    if (response.ok) {
      const data = await response.json();
      setUserData(data);
      sessionStorage.setItem('userData', JSON.stringify(data));
      console.log(data);
      setLoginCheck(true);
      navigate('/main'); // 로그인 성공시 main으로 이동합니다.
    } else {
      const errorText = await response.text();
      alert(errorText || '로그인 실패: 아이디나 비밀번호를 확인하세요.');
    }
  };

  return (
    <AuthFormContainer onSubmit={handleLogin}>
      <StyledTitle>Sign In</StyledTitle>
      <StyledInput
        placeholder="email@domain.com"
        onChange={(e) => setUsername(e.target.value)}
      />
      <StyledInput
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <StyledButton type="submit">로그인</StyledButton>
      <LinkContainer>
        <StyledLink>회원가입</StyledLink>
        <StyledLink>아이디 비밀번호 찾기</StyledLink>
      </LinkContainer>
    </AuthFormContainer>
  );
};

export default AuthForm;
