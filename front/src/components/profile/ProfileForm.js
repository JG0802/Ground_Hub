import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  padding: 3vh 2vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h2`
  font-size: 2.4vh;
  font-weight: bold;
  margin-bottom: 4vh;
`;

const Avatar = styled.div`
  width: 14vh;
  height: 14vh;
  border-radius: 50%;
  background-color: #ddd;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 5vh;
  margin-bottom: 2vh;
`;

const InfoBox = styled.div`
  width: 90%;
  background-color: #eee;
  height: 5vh;
  border-radius: 1vh;
  margin-bottom: 1vh;
  display: flex;
  align-items: center;
  padding: 0 2vh;
  font-size: 1.8vh;
`;

const Label = styled.p`
  align-self: flex-start;
  font-weight: bold;
  margin: 1vh 0 0.5vh;
  width: 90%;
`;

const StyledButton = styled.button`
  background-color: black;
  color: white;
  width: 20vh;
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

const ButtonBox = styled.div`
  display: flex;
  gap: 2vh;
  margin-top: 2vh;
`;

const ProfileForm = () => {
  const [userData, setUserData] = useState(null);
  const userMail = sessionStorage.getItem('userMail');

  // 데이터 불러오기
  useEffect(() => {
    const fetchTeams = async () => {
      try {
        // api 주소 사용자 정보 조회하는 걸로 바꾸기
        const response = await fetch(`/api/users/check/${userMail}`);
        if (response.ok) {
          const data = await response.json();
          setUserData(data); // 화면에 보여주기 위해 저장
        } else {
          alert(await response.text());
        }
      } catch (err) {
        console.error(err);
        alert('서버와의 통신 중 오류가 발생했습니다.');
      }
    };

    fetchTeams();
  }, [userMail]);

  if (!userData) {
    return <Container>Loading...</Container>;
  }

  return (
    <Container>
      <Title>User Information</Title>
      <Avatar>👤</Avatar>
      <Label>User Name</Label>
      <InfoBox>{userData.userName}</InfoBox>
      <Label>User Tel</Label>
      <InfoBox>{userData.tel}</InfoBox>
      <Label>Preferred Position 1</Label>
      <InfoBox>{userData.firstPosition || ''}</InfoBox>
      <Label>Preferred Position 2</Label>
      <InfoBox>{userData.secondPosition || ''}</InfoBox>
      <Label>Preferred Position 3</Label>
      <InfoBox>{userData.thirdPosition || ''}</InfoBox>
      <ButtonBox>
        <Link to="/user/checkpassword">
          <StyledButton>회원정보 변경</StyledButton>
        </Link>
        <Link to="/user/change/password">
          <StyledButton>비밀번호 변경</StyledButton>
        </Link>
      </ButtonBox>
    </Container>
  );
};

export default ProfileForm;
