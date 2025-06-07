import styled from 'styled-components';

const StyledButton = styled.button`
  background-color: black;
  color: white;
  width: 100%;
  height: 6vh;
  font-size: 2vh;
  border-radius: 0.7vh;
  margin-bottom: 2vh;
  box-sizing: border-box;
  margin-top: 2vh;
  &:hover {
    cursor: pointer;
  }
  &:disabled {
    background-color: #999;
    cursor: not-allowed;
  }
`;

const TeamJoin = () => {
  const handleJoin = async () => {
    const teamId = sessionStorage.getItem('teamId');
    const userMail = sessionStorage.getItem('userMail');

    if (!teamId || !userMail) {
      alert('팀 ID 또는 사용자 이메일이 존재하지 않습니다.');
      return;
    }

    try {
      const response = await fetch(`/api/teams/${teamId}/add-user`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userMail }),
      });

      if (response.ok) {
        alert('팀에 성공적으로 가입되었습니다!');
        window.location.reload(); // 필요시 새로고침
      } else {
        const message = await response.text();
        alert(`가입 실패: ${message}`);
      }
    } catch (err) {
      console.error('요청 중 오류 발생:', err);
      alert('서버 오류가 발생했습니다.');
    }
  };

  return <StyledButton onClick={handleJoin}>팀 가입하기</StyledButton>;
};

export default TeamJoin;
