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
  margin-bottom: 4vh;
`;

const InfoBox = styled.div`
  width: 90%;
  background-color: #eee;
  height: 5vh;
  border-radius: 1vh;
  margin-bottom: 2vh;
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

const ProfilePage = () => {
  const userData = JSON.parse(sessionStorage.getItem('userData')) || {};
  const { name = 'User Name', preferredPositions = [] } = userData;

  return (
    <Container>
      <Title>User Information</Title>
      <Avatar>👤</Avatar>
      <Label>User Name</Label>
      <InfoBox>{name}</InfoBox>
      <Label>Preferred Position 1</Label>
      <InfoBox>{preferredPositions[0] || ''}</InfoBox>
      <Label>Preferred Position 2</Label>
      <InfoBox>{preferredPositions[1] || ''}</InfoBox>
      <Label>Preferred Position 3</Label>
      <InfoBox>{preferredPositions[2] || ''}</InfoBox>
    </Container>
  );
};

export default ProfilePage;
