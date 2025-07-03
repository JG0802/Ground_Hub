import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  padding: 8vh 2vh 3vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Card = styled.div`
  width: 90%;
  background-color: white;
  border-radius: 1.5vh;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  padding: 4vh 3vh;
  box-sizing: border-box;
`;

const Title = styled.h2`
  font-size: 2.8vh;
  font-weight: 600;
  text-align: center;
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
  font-size: 6vh;
  margin: 0 auto 2.5vh;
`;

const Label = styled.div`
  font-size: 1.6vh;
  color: #666;
  margin-top: 2.5vh;
  margin-bottom: 0.8vh;
`;

const InfoBox = styled.div`
  background-color: #f5f5f5;
  height: 4.5vh;
  border-radius: 1vh;
  padding: 0 2vh;
  display: flex;
  align-items: center;
  font-size: 1.8vh;
`;

const ButtonBox = styled.div`
  display: flex;
  justify-content: center;
  gap: 2vh;
  margin-top: 4vh;
  flex-wrap: wrap;
`;

const StyledButton = styled(Link)`
  background-color: black;
  color: white;
  text-align: center;
  width: 20vh;
  height: 5.5vh;
  font-size: 1.8vh;
  border-radius: 1vh;
  line-height: 5.5vh;
  text-decoration: none;
  transition: background-color 0.2s;
  &:hover {
    background-color: #222;
  }
`;

const ProfileForm = () => {
  const [userData, setUserData] = useState(null);
  const userMail = sessionStorage.getItem('userMail');

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(`/api/users/check/${userMail}`);
        if (res.ok) {
          const data = await res.json();
          setUserData(data);
        } else {
          alert(await res.text());
        }
      } catch (err) {
        console.error(err);
        alert('서버 오류 발생');
      }
    };
    fetchUser();
  }, [userMail]);

  const handleLogout = () => {
    sessionStorage.removeItem('userMail');
  };

  if (!userData) return <Container>Loading...</Container>;

  return (
    <Container>
      <Card>
        <Title>User Profile</Title>
        <Avatar>👤</Avatar>

        <Label>User Name</Label>
        <InfoBox>{userData.userName}</InfoBox>

        <Label>Phone</Label>
        <InfoBox>{userData.tel}</InfoBox>

        <Label>Preferred Position 1</Label>
        <InfoBox>{userData.firstPosition || '-'}</InfoBox>

        <Label>Preferred Position 2</Label>
        <InfoBox>{userData.secondPosition || '-'}</InfoBox>

        <Label>Preferred Position 3</Label>
        <InfoBox>{userData.thirdPosition || '-'}</InfoBox>

        <ButtonBox>
          <StyledButton to="/user/checkpassword">회원정보 변경</StyledButton>
          <StyledButton to="/user/change/password">비밀번호 변경</StyledButton>
          <StyledButton
            style={{ backgroundColor: 'red' }}
            onClick={handleLogout}
            to="/"
          >
            Logout
          </StyledButton>
        </ButtonBox>
      </Card>
    </Container>
  );
};

export default ProfileForm;
