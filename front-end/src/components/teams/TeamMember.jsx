import styled from 'styled-components';

const UserBox = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.2vh 2vh;
  border-bottom: 1px solid #ddd;
`;

const ButtonBox = styled.div`
  display: flex;
  gap: 1vh;
`;

const Button = styled.button`
  background-color: black;
  color: white;
  padding: 0.8vh 1.6vh;
  border-radius: 0.7vh;
  font-size: 1.4vh;
  cursor: pointer;
`;

const TeamMember = ({ user, teamId, refreshUsers }) => {
  const userMail = sessionStorage.getItem('userMail');

  const handleRemove = async () => {
    const res = await fetch(`/api/teams/${teamId}/remove-user`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userMail: user.userMail }),
    });
    if (res.ok) {
      alert('선수 방출 완료');
      refreshUsers();
    } else {
      alert(await res.text());
    }
  };

  const handlePromote = async () => {
    const res = await fetch(`/api/teams/${teamId}/transfer-manager`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ currentManagerMail: userMail, newManagerMail: user.userMail }),
    });
    if (res.ok) {
      alert('팀 매니저가 변경되었습니다.');
      window.location.reload();
    } else {
      alert(await res.text());
    }
  };

  return (
    <UserBox>
      {user.userName} ({user.userMail})
      <ButtonBox>
        <Button onClick={handlePromote}>매니저 임명</Button>
        <Button style={{ backgroundColor: '#c0392b' }} onClick={handleRemove}>
          방출
        </Button>
      </ButtonBox>
    </UserBox>
  );
};

export default TeamMember;
