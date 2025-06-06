import styled from 'styled-components';
import field from '../../img/field.png';
import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

const PositionFormContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const FieldWrapper = styled.div`
  position: relative;
  width: 49vh;
  height: 42vh;
  background-image: url(${field});
  background-size: 100% 100%; // ✅ 강제로 꽉 채움 (비율 무시)
  background-repeat: no-repeat;
  background-position: center;
  margin-bottom: 2vh;
`;

const ButtonBox = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
`;

const StyledButton = styled.button`
  position: absolute; /* 절대 위치 */
  top: ${(props) => props.$top}; /* 상단 여백 */
  left: ${(props) => props.$left}; /* 우측 여백 */
  display: flex; /* 내부 정렬 위해 flex 사용 */
  justify-content: center; /* 수평 가운데 */
  align-items: center;
  background-color: rgba(240, 228, 57, 0.7); /* 반투명 배경 */
  color: black;
  border: 2px solid black;
  border-radius: 20vh;
  cursor: pointer;
  width: 8.2vh;
  height: 4vh;
  font-size: 1.5vh;
`;

const ChangeButton = styled.button`
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

const PopupBox = styled.div`
  position: fixed;
  width: 100%;
  height: 50vh;
  background: white;
  transition: bottom 0.3s ease-in-out;
  bottom: ${({ $open }) => ($open ? '0vh' : '-45vh')};
  box-shadow: 0 -2px 8px rgba(0, 0, 0, 0.1);
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
  padding: 2vh;
  max-width: 400px;
  z-index: 1000;
  margin-bottom: 56px;
  overflow-y: auto;
`;

const PopupButton = styled.button`
  margin-top: 1vh;
  width: 100%;
  margin-bottom: 2vh;
  background-color: white;
  border: none;
  &:hover {
    cursor: pointer;
  }
`;

const PopupTitle = styled.h4`
  margin-top: 0;
  margin-bottom: 2vh;
`;

const UsersBox = styled.div`
  display: flex;
  flex-wrap: wrap; /* 줄바꿈 허용 */
  gap: 1.5vh; /* 아이템 간 간격 */
  justify-content: flex-start;
`;

const UserBox = styled.div`
  width: calc(33.333% - 1vh); /* 3개씩 한 줄에 정렬 */
  background-color: rgba(240, 228, 57);
  border-radius: 6px;
  border: 2px solid black;
  box-sizing: border-box;
  padding: 1vh;
  text-align: center;
`;

const UserPositionBox = styled.div`
  font-size: 1.5vh;
`;

const UserNameBox = styled.div`
  font-size: 2.3vh;
`;

const ControlButtonBox = styled.div`
  display: flex;
  gap: 2vh;
`;

const PositionForm = () => {
  const { id } = useParams();
  sessionStorage.setItem('gameId', id);
  const [game, setGame] = useState('');
  const [users, setUsers] = useState(null);
  const [hasPermission, setHasPermission] = useState(false);
  const [checked, setChecked] = useState(false);
  const userMail = sessionStorage.getItem('userMail');
  const [teamId, setTeamId] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const togglePopup = () => {
    setIsOpen((prev) => !prev);
  };

  useEffect(() => {
    const fetchGame = async () => {
      const res = await fetch(`/api/games/saved-formation/${id}`);
      const data = await res.json();
      setGame(data);
      setTeamId(data.team.teamId);
      setUsers(data.playersMail);
    };

    fetchGame();
  }, [id]);

  useEffect(() => {
    const checkPermission = async () => {
      if (!userMail || !teamId) {
        return;
      }

      try {
        const response = await fetch(`/api/teams/${teamId}`);
        if (!response.ok) throw new Error();

        const data = await response.json();

        if (data.teamManager.userMail === userMail) {
          setHasPermission(true);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setChecked(true);
      }
    };

    checkPermission();
  }, [userMail, teamId]);

  const handleJoinGame = async () => {
    if (!users || users.length === 0) {
      alert('유저 정보를 불러오는 중입니다.');
      return;
    }

    const isAlreadyJoined = users.some((user) => user.userMail === userMail);

    if (isAlreadyJoined) {
      alert('이미 참가 중입니다.');
      return;
    }

    try {
      const response = await fetch(`/api/games/${id}/insert-to-game`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userMail }),
      });

      if (response.ok) {
        alert('경기 참가가 완료되었습니다.');
        window.location.reload();
      } else {
        const errorText = await response.text();
        alert(errorText || '참가 실패');
      }
    } catch (error) {
      console.error(error);
      alert('서버 오류가 발생했습니다.');
    }
  };

  const handleRemoveGame = async () => {
    if (!users || users.length === 0) {
      alert('유저 정보를 불러오는 중입니다.');
      return;
    }

    const isAlreadyJoined = users.some((user) => user.userMail === userMail);

    if (!isAlreadyJoined) {
      alert('참가 중이 아닙니다.');
      return;
    }

    try {
      const response = await fetch(`/api/games/${id}/remove-from-game`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userMail }),
      });

      if (response.ok) {
        alert('경기 참가 취소가 완료되었습니다.');
        window.location.reload();
      } else {
        const errorText = await response.text();
        alert(errorText || '참가 취소 실패');
      }
    } catch (error) {
      console.error(error);
      alert('경기 취소 중 서버 오류가 발생했습니다.');
    }
  };

  const handleRemovePosition = async () => {
    if (!users || users.length === 0) {
      alert('유저 정보를 불러오는 중입니다.');
      return;
    }

    const isAlreadyJoined = users.some((user) => user.userMail === userMail);

    if (!isAlreadyJoined) {
      alert('참가 중이 아닙니다.');
      return;
    }

    try {
      const filteredGame = Object.fromEntries(
        Object.entries(game).map(([key, value]) =>
          value?.userMail === userMail ? [key, null] : [key, value],
        ),
      );

      const response = await fetch('/api/games/update-game', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(filteredGame),
      });
      if (response.ok) {
        return;
      } else {
        const errorText = await response.text();
        alert(errorText || '참가 취소 실패');
      }
    } catch (error) {
      console.error(error);
      alert('포메이션 업데이트 중 서버 오류가 발생했습니다.');
    }
  };

  const handleDeleteGame = async () => {
    const confirmDelete = window.confirm(
      '정말로 이 경기를 삭제하시겠습니까? 삭제된 경기는 복구할 수 없습니다.',
    );

    if (!confirmDelete) return;

    try {
      const response = await fetch('/api/games/delete-game', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ gameId: Number(id) }),
      });

      if (response.ok) {
        alert('경기가 성공적으로 삭제되었습니다.');
        navigate(`/teams/${teamId}`);
      } else {
        const error = await response.text();
        alert('삭제 실패: ' + error);
      }
    } catch (err) {
      console.error(err);
      alert('서버 오류가 발생했습니다.');
    }
  };

  const assignedUserMails = new Set(
    game
      ? Object.values(game)
          .filter((value) => value && value.userMail)
          .map((user) => user.userMail)
      : [],
  );

  // 필터링된 참가자 명단
  const filteredUsers = users
    ? users.filter((user) => !assignedUserMails.has(user.userMail))
    : [];
  if (!game) return <div>로딩 중...</div>;
  if (!checked) return <div>권한 확인 중...</div>;

  return (
    <PositionFormContainer>
      <h2>
        {game.date.slice(0, 10)} {game.gameName}
      </h2>
      <FieldWrapper>
        <ButtonBox>
          {game.stId && (
            <StyledButton $top="1vh" $left="20.3vh">
              {game.stId.userName}
            </StyledButton>
          )}
          {game.lsId && (
            <StyledButton $top="4vh" $left="11.6vh">
              {game.lsId.userName}
            </StyledButton>
          )}
          {game.rsId && (
            <StyledButton $top="4vh" $left="29vh">
              {game.rsId.userName}
            </StyledButton>
          )}
          {game.lwId && (
            <StyledButton $top="7vh" $left="3.6vh">
              {game.lwId.userName}
            </StyledButton>
          )}
          {game.cfId && (
            <StyledButton $top="7vh" $left="20.3vh">
              {game.cfId.userName}
            </StyledButton>
          )}
          {game.rwId && (
            <StyledButton $top="7vh" $left="37.6vh">
              {game.rwId.userName}
            </StyledButton>
          )}
          {game.lamId && (
            <StyledButton $top="13vh" $left="11.6vh">
              {game.lamId.userName}
            </StyledButton>
          )}
          {game.camId && (
            <StyledButton $top="13vh" $left="20.3vh">
              {game.camId.userName}
            </StyledButton>
          )}
          {game.ramId && (
            <StyledButton $top="13vh" $left="29vh">
              {game.ramId.userName}
            </StyledButton>
          )}
          {game.lmId && (
            <StyledButton $top="19vh" $left="3vh">
              {game.lmId.userName}
            </StyledButton>
          )}
          {game.lcmId && (
            <StyledButton $top="19vh" $left="11.6vh">
              {game.lcmId.userName}
            </StyledButton>
          )}
          {game.cmId && (
            <StyledButton $top="19vh" $left="20.3vh">
              {game.cmId.userName}
            </StyledButton>
          )}
          {game.rcmId && (
            <StyledButton $top="19vh" $left="29vh">
              {game.rcmId.userName}
            </StyledButton>
          )}
          {game.rmId && (
            <StyledButton $top="19vh" $left="37.6vh">
              {game.rmId.userName}
            </StyledButton>
          )}
          {game.lwbId && (
            <StyledButton $top="25vh" $left="3vh">
              {game.lwbId.userName}
            </StyledButton>
          )}
          {game.ldmId && (
            <StyledButton $top="25vh" $left="11.6vh">
              {game.ldmId.userName}
            </StyledButton>
          )}
          {game.cdmId && (
            <StyledButton $top="25vh" $left="20.3vh">
              {game.cdmId.userName}
            </StyledButton>
          )}
          {game.rdmId && (
            <StyledButton $top="25vh" $left="29vh">
              {game.rdmId.userName}
            </StyledButton>
          )}
          {game.rwbId && (
            <StyledButton $top="25vh" $left="37.6vh">
              {game.rwbId.userName}
            </StyledButton>
          )}
          {game.lbId && (
            <StyledButton $top="31vh" $left="3vh">
              {game.lbId.userName}
            </StyledButton>
          )}
          {game.lcbId && (
            <StyledButton $top="31vh" $left="11.6vh">
              {game.lcbId.userName}
            </StyledButton>
          )}
          {game.swId && (
            <StyledButton $top="31vh" $left="20.3vh">
              {game.swId.userName}
            </StyledButton>
          )}
          {game.rcbId && (
            <StyledButton $top="31vh" $left="29vh">
              {game.rcbId.userName}
            </StyledButton>
          )}
          {game.rbId && (
            <StyledButton $top="31vh" $left="37.6vh">
              {game.rbId.userName}
            </StyledButton>
          )}
          {game.gkId && (
            <StyledButton $top="37vh" $left="20.3vh">
              {game.gkId.userName}
            </StyledButton>
          )}
        </ButtonBox>
      </FieldWrapper>
      {hasPermission ? (
        <ControlButtonBox>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <div
              style={{
                width: '45vh',
                display: 'flex',
                justifyContent: 'space-between',
              }}
            >
              <ChangeButton onClick={handleJoinGame} style={{ width: '20vh' }}>
                경기참가
              </ChangeButton>
              <ChangeButton
                onClick={async () => {
                  await handleRemovePosition(); // ✅ 완료될 때까지 기다림
                  handleRemoveGame(); // ✅ 그 이후 실행
                }}
                style={{ width: '20vh' }}
              >
                경기 참가 취소
              </ChangeButton>
            </div>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
              }}
            >
              <Link to={`/position/update/${id}`}>
                <ChangeButton style={{ width: '13vh' }}>수정</ChangeButton>
              </Link>
              <ChangeButton
                onClick={handleDeleteGame}
                style={{ width: '13vh', backgroundColor: '#c0392b' }}
              >
                경기 삭제
              </ChangeButton>
              <Link to={`/pr/list/${id}`}>
                <ChangeButton style={{ width: '13vh' }}>요청 확인</ChangeButton>
              </Link>
            </div>
          </div>
        </ControlButtonBox>
      ) : (
        <ControlButtonBox>
          <ChangeButton onClick={handleJoinGame} style={{ width: '15vh' }}>
            경기 참가
          </ChangeButton>
          <ChangeButton onClick={handleRemoveGame} style={{ width: '15vh' }}>
            경기 참가 취소
          </ChangeButton>
          <Link to={`/user/pr/list/${id}`}>
            <ChangeButton style={{ width: '15vh' }}>포메이션 요청</ChangeButton>
          </Link>
        </ControlButtonBox>
      )}
      <PopupBox $open={isOpen}>
        <PopupButton onClick={togglePopup}>{isOpen ? '▼' : '▲'}</PopupButton>
        <PopupTitle>참가자 명단</PopupTitle>
        <UsersBox>
          {filteredUsers.length > 0 ? (
            filteredUsers.map((user) => (
              <UserBox key={user.userMail}>
                <UserPositionBox>
                  {user.firstPosition}, {user.secondPosition},{' '}
                  {user.thirdPosition}
                </UserPositionBox>
                <UserNameBox>{user.userName}</UserNameBox>
              </UserBox>
            ))
          ) : (
            <div style={{ fontSize: '1.5vh', color: '#666' }}>
              표시할 참가자가 없습니다.
            </div>
          )}
        </UsersBox>
      </PopupBox>
    </PositionFormContainer>
  );
};

export default PositionForm;
