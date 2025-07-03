import styled from 'styled-components';

const StyledButton = styled.button`
  background-color: black;
  color: white;
  width: 100%;
  height: 6vh;
  font-size: 2vh;
  border-radius: 0.7vh;
  margin-top: 3vh;
  &:hover {
    cursor: pointer;
  }
`;

const TeamJoin = () => {
  const handleJoin = async () => {
    const teamId = sessionStorage.getItem('teamId');
    const userMail = sessionStorage.getItem('userMail');

    if (!teamId || !userMail) return alert('정보 누락');

    try {
      const res = await fetch(`/api/teams/${teamId}/add-user`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userMail }),
      });

      if (res.ok) {
        alert('팀 가입 완료!');
        window.location.reload();
      } else {
        alert(`가입 실패: ${await res.text()}`);
      }
    } catch (err) {
      console.error(err);
      alert('서버 오류');
    }
  };

  return <StyledButton onClick={handleJoin}>팀 가입하기</StyledButton>;
};

export default TeamJoin;
