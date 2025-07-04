import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 12vh;
`;

const Title = styled.h1`
  font-size: 3vh;
  font-family: 'MarinesBold', sans-serif;
  margin-bottom: 4vh;
`;

const Input = styled.input`
  width: 40vh;
  height: 6vh;
  font-size: 2vh;
  padding: 1vh;
  margin-bottom: 2vh;
  border: 1px solid #b9b9b9;
  border-radius: 0.7vh;
  box-sizing: border-box;
`;

const Button = styled.button`
  width: 40vh;
  height: 6vh;
  font-size: 2vh;
  border-radius: 0.7vh;
  background-color: black;
  color: white;
  margin-top: 2vh;
  box-sizing: border-box;
  cursor: pointer;
`;

const ChangePassword = () => {
  const [newPassword, setNewPassword] = useState('');
  const [newPasswordCheck, setNewPasswordCheck] = useState('');
  const [userName, setUserName] = useState('');
  const [userTel, setUserTel] = useState('');
  const [selected, setSelected] = useState([]);

  const userMail = sessionStorage.getItem('userMail');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`/api/users/check/${userMail}`);
        if (!response.ok) throw new Error(await response.text());
        const data = await response.json();
        setUserName(data.userName);
        setUserTel(data.tel);
        setSelected([
          data.firstPosition,
          data.secondPosition,
          data.thirdPosition,
        ].filter(Boolean));
      } catch (err) {
        alert(err.message);
      }
    };
    fetchUser();
  }, [userMail]);

  const handleSubmit = async () => {
    if (!newPassword || !newPasswordCheck) {
      alert('모든 항목을 입력해주세요.');
      return;
    }

    if (newPassword !== newPasswordCheck) {
      alert('새 비밀번호가 일치하지 않습니다.');
      return;
    }

    try {
      const res = await fetch('/api/users/update', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userMail,
          password: newPassword,
          userName,
          tel: userTel,
          firstPosition: selected[0],
          secondPosition: selected[1],
          thirdPosition: selected[2],
        }),
      });

      if (res.ok) {
        alert('비밀번호 변경 완료!');
        sessionStorage.setItem('password', newPassword);
        navigate('/profile');
      } else {
        alert(await res.text());
      }
    } catch (err) {
      console.error(err);
      alert('비밀번호 변경 중 오류가 발생했습니다.');
    }
  };

  return (
    <Container>
      <Title>비밀번호 변경</Title>
      <Input
        type="password"
        placeholder="새 비밀번호"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
      />
      <Input
        type="password"
        placeholder="새 비밀번호 확인"
        value={newPasswordCheck}
        onChange={(e) => setNewPasswordCheck(e.target.value)}
      />
      <Button onClick={handleSubmit}>비밀번호 변경</Button>
    </Container>
  );
};

export default ChangePassword;
