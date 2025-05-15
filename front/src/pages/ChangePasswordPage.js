import { useEffect, useState } from 'react';
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
  margin-bottom: 3vh;
  box-sizing: border-box;
`;

const ChangePasswordPage = () => {
  const [password, setPassword] = useState('');
  const [inputPassword, setInputPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newPasswordCheck, setNewPasswordCheck] = useState('');
  const [userName, setUserName] = useState(null);
  const [userTel, setUserTel] = useState(null);
  const [selected, setSelected] = useState([]);
  const userMail = sessionStorage.getItem('userMail');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // api 주소 사용자 정보 조회하는 걸로 바꾸기
        const response = await fetch(`/api/users/check/${userMail}`);
        if (response.ok) {
          const data = await response.json();
          setPassword(data.password);
          setUserName(data.userName);
          setUserTel(data.tel);
          setSelected(
            [
              data.firstPosition,
              data.secondPosition,
              data.thirdPosition,
            ].filter(Boolean),
          ); // 혹시 null/undefined 방지
        } else {
          alert(await response.text());
        }
      } catch (err) {
        console.error(err);
        alert('서버와의 통신 중 오류가 발생했습니다.');
      }
    };

    fetchData();
  }, [userMail]);

  const handleContinue = async (event) => {
    event.preventDefault();

    if (!userMail) {
      alert('다시 로그인하세요.');
      navigate('/');
      return;
    }
    if (!inputPassword || !newPassword || !newPasswordCheck) {
      alert('모든 항목을 입력해주세요.');
      return;
    }

    if (password !== inputPassword) {
      alert('비밀번호를 확인하세요!');
      return;
    }

    if (newPassword !== newPasswordCheck) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }

    try {
      const response = await fetch('/api/users/update', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userMail: userMail,
          password: newPassword,
          userName: userName,
          tel: userTel,
          firstPosition: selected[0],
          secondPosition: selected[1],
          thirdPosition: selected[2],
        }),
      });

      if (response.ok) {
        alert('비밀번호 변경 성공!');
        navigate('/main');
      }
    } catch (err) {
      console.error('오류:', err);
      alert('서버와의 통신 중 오류가 발생했습니다.');
      return;
    }
  };

  return (
    <Container>
      <Title>비밀번호 변경</Title>
      <Input
        type="password"
        placeholder="기존 비밀번호 입력"
        onChange={(e) => setInputPassword(e.target.value)}
      />
      <Input
        type="password"
        placeholder="변경할 비밀번호 입력"
        onChange={(e) => setNewPassword(e.target.value)}
      />
      <Input
        type="password"
        placeholder="변경할 비밀번호 확인"
        onChange={(e) => setNewPasswordCheck(e.target.value)}
      />
      <Button onClick={handleContinue}>비밀번호 변경</Button>
    </Container>
  );
};

export default ChangePasswordPage;
