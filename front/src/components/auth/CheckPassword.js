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
  box-sizing: border-box;
`;

const StyledButton = styled.button`
  background-color: black;
  color: white;
  width: 40vh;
  height: 6vh;
  font-size: 2vh;
  border-radius: 0.7vh;
  margin-bottom: 2vh;
  box-sizing: border-box;
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

const CheckPassword = () => {
  const userMail = sessionStorage.getItem('userMail');
  const [password, setPassword] = useState('');
  const [isLoading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleCheckPassword = async (event) => {
    event.preventDefault();

    if (!userMail) {
      alert('다시 로그인 하세요.');
      navigate('/');
      return;
    }

    if (!password) {
      alert('비밀번호를 입력하세요.');
      return;
    }
    setLoading(true);

    try {
      const response = await fetch('/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userMail, password }),
      });

      if (response.ok) {
        const data = await response.json();
        sessionStorage.setItem('userData', JSON.stringify(data));
        sessionStorage.setItem('userMail', userMail);
        sessionStorage.setItem('password', password);
        navigate('/user/change/info');
      } else {
        alert('잘못된 비밀번호 입니다.');
      }
    } catch (err) {
      console.error('로그인 오류:', err);
      alert('서버와의 통신 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };
  return (
    <AuthFormContainer onSubmit={handleCheckPassword}>
      <StyledTitle>비밀번호를 입력하세요.</StyledTitle>
      <StyledInput
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <StyledButton type="submit" disabled={isLoading}>
        {isLoading ? '비밀번호 확인 중...' : '확인'}
      </StyledButton>
    </AuthFormContainer>
  );
};

export default CheckPassword;
