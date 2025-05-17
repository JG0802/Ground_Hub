import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
  padding: 3vh;
  display: flex;
  flex-direction: column;
  gap: 2vh;
  max-width: 600px;
  margin: auto;
`;

const Label = styled.label`
  font-weight: bold;
  margin-bottom: 0.5vh;
`;

const Input = styled.input`
  width: 100%;
  padding: 1vh;
  border: 1px solid #ccc;
  border-radius: 0.5vh;
`;

const Button = styled.button`
  background-color: black;
  color: white;
  padding: 1vh 2vh;
  border: none;
  border-radius: 0.7vh;
  cursor: pointer;
  margin-bottom: 1vh;
  &:hover {
    background-color: #333;
  }
`;

const UserBox = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1vh;
  border-bottom: 1px solid #ddd;
`;

const TeamUpdatePage = () => {
  const [team, setTeam] = useState(null);
  const [users, setUsers] = useState([]);
  const [teamName, setTeamName] = useState('');
  const [location, setLocation] = useState('');
  const [firstColor, setFirstColor] = useState('');
  const [secondColor, setSecondColor] = useState('');
  const userMail = sessionStorage.getItem('userMail');
  const teamId = sessionStorage.getItem('teamId');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTeam = async () => {
      const res = await fetch(`/api/teams/${teamId}`);
      const data = await res.json();
      setTeam(data);
      console.log(data);
      setTeamName(data.teamName);
      setLocation(data.location);
      setFirstColor(data.firstColor);
      setSecondColor(data.secondColor);
    };

    const fetchUsers = async () => {
      const res = await fetch(`/api/teams/${teamId}/users-in-team`);
      const data = await res.json();
      setUsers(data.filter((user) => user.userMail !== userMail));
    };

    fetchTeam();
    fetchUsers();
  }, [teamId, userMail]);

  const handleUpdate = async () => {
    try {
      const updatedTeam = {
        ...team,
        teamName,
        location,
        firstColor,
        secondColor,
      };
      const res = await fetch('/api/teams/update-team', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedTeam),
      });
      if (res.ok) {
        alert('팀 정보가 수정되었습니다.');
        navigate(`/teams/${teamId}`);
      } else {
        alert(await res.text());
      }
    } catch (e) {
      alert('수정 실패: ' + e.message);
    }
  };

  const handleRemove = async (mail) => {
    try {
      const res = await fetch(`/api/teams/${teamId}/remove-user`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userMail: mail }),
      });
      if (res.ok) {
        alert('선수 방출 완료');
        setUsers(users.filter((u) => u.userMail !== mail));
      } else {
        alert(await res.text());
      }
    } catch (e) {
      alert('방출 실패: ' + e.message);
    }
  };

  // 수정 필요
  const handlePromote = async (newManagerMail) => {
    const updateRes = await fetch(`/api/teams/${teamId}/transfer-manager`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        currentManagerMail: userMail,
        newManagerMail: newManagerMail,
      }),
    });

    if (updateRes.ok) {
      alert('팀 매니저가 성공적으로 변경되었습니다.');
      navigate(`/teams/${teamId}`);
    } else {
      const message = await updateRes.text();
      alert(`변경 실패: ${message}`);
    }
  };

  const handleDelete = async () => {
    const teamId = sessionStorage.getItem('teamId');

    if (!teamId) {
      alert('teamId가 존재하지 않습니다.');
      return;
    }

    const confirmDelete = window.confirm(
      '정말로 팀을 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.',
    );
    if (!confirmDelete) return;

    try {
      const response = await fetch('/api/teams/delete-team', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ teamId: Number(teamId) }),
      });

      if (response.ok) {
        alert('팀이 성공적으로 삭제되었습니다.');
        sessionStorage.removeItem('teamId');
        navigate(`/main`);
      } else {
        const errorText = await response.text();
        alert('삭제 실패: ' + errorText);
      }
    } catch (error) {
      console.error('삭제 중 오류:', error);
      alert('서버 오류가 발생했습니다.');
    }
  };

  if (!team) return <p>로딩 중...</p>;

  return (
    <Container>
      <h2>팀 정보 수정</h2>
      <div>
        <Label>팀명</Label>
        <Input value={teamName} onChange={(e) => setTeamName(e.target.value)} />
      </div>
      <div>
        <Label>지역</Label>
        <Input value={location} onChange={(e) => setLocation(e.target.value)} />
      </div>
      <div>
        <Label>1차 유니폼 색상</Label>
        <Input
          value={firstColor}
          onChange={(e) => setFirstColor(e.target.value)}
        />
      </div>
      <div>
        <Label>2차 유니폼 색상</Label>
        <Input
          value={secondColor}
          onChange={(e) => setSecondColor(e.target.value)}
        />
      </div>
      <Button onClick={handleUpdate}>팀 정보 저장</Button>

      <h3>팀원 목록</h3>
      <ul>
        {users.map((user) => (
          <UserBox key={user.userMail}>
            {user.userName} ({user.userMail})
            <div>
              <Button onClick={() => handleRemove(user.userMail)}>방출</Button>
              <Button onClick={() => handlePromote(user.userMail)}>
                매니저 임명
              </Button>
            </div>
          </UserBox>
        ))}
      </ul>
      <Button onClick={handleDelete}>팀 삭제하기</Button>
    </Container>
  );
};

export default TeamUpdatePage;
