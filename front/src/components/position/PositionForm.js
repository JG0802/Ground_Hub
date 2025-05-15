import styled from 'styled-components';
import field from '../../img/field.png';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

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
  background-color: rgba(255, 255, 255, 0.5); /* 반투명 배경 */
  color: black;
  border: 2px solid white;
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
  bottom: ${({ $open }) => ($open ? '0vh' : '-30vh')};
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

const UsersBox = styled.div`
  display: flex;
`;
const UserBox = styled.div`
  width: 10vh;
`;

const UserPositionBox = styled.div``;

const UserNameBox = styled.div``;

const PositionForm = () => {
  const { id } = useParams();
  const [game, setGame] = useState(null);
  const [users, setUsers] = useState(null);
  const [hasPermission, setHasPermission] = useState(false);
  const [checked, setChecked] = useState(false);
  const userMail = sessionStorage.getItem('userMail');
  const [teamId, setTeamId] = useState('');
  const [isOpen, setIsOpen] = useState(false);

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
      const response = await fetch(`/api/games/${userMail}/insert-to-game`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userMail, id }),
      });

      if (response.ok) {
        alert('경기 참가가 완료되었습니다.');

        // 최신 데이터 반영
        const updated = await response.json();
        setUsers(updated.playersMail);
      } else {
        const errorText = await response.text();
        alert(errorText || '참가 실패');
      }
    } catch (error) {
      console.error(error);
      alert('서버 오류가 발생했습니다.');
    }
  };

  if (!game) return <div>로딩 중...</div>;
  if (!checked) return <div>권한 확인 중...</div>;

  return (
    <PositionFormContainer>
      <h2>
        {game.date.slice(0, 10)} {game.gameName}
      </h2>
      <FieldWrapper>
        <ButtonBox>
          <StyledButton $top="1vh" $left="20.3vh">
            {game.stId ? game.stId.userName : 'ST'}
          </StyledButton>
          <StyledButton $top="4vh" $left="11.6vh">
            {game.lsId ? game.lsId.userName : 'LS'}
          </StyledButton>
          <StyledButton $top="4vh" $left="29vh">
            {game.rsId ? game.rsId.userName : 'RS'}
          </StyledButton>
          <StyledButton $top="7vh" $left="3.6vh">
            {game.lwId ? game.lwId.userName : 'LW'}
          </StyledButton>
          <StyledButton $top="7vh" $left="20.3vh">
            {game.cfId ? game.cfId.userName : 'CF'}
          </StyledButton>
          <StyledButton $top="7vh" $left="37.6vh">
            {game.rwId ? game.rwId.userName : 'RW'}
          </StyledButton>
          <StyledButton $top="13vh" $left="11.6vh">
            {game.lamId ? game.lamId.userName : 'LAM'}
          </StyledButton>
          <StyledButton $top="13vh" $left="20.3vh">
            {game.camId ? game.camId.userName : 'CAM'}
          </StyledButton>
          <StyledButton $top="13vh" $left="29vh">
            {game.ramId ? game.ramId.userName : 'RAM'}
          </StyledButton>
          <StyledButton $top="19vh" $left="3vh">
            {game.lmId ? game.lmId.userName : 'LM'}
          </StyledButton>
          <StyledButton $top="19vh" $left="11.6vh">
            {game.lcmId ? game.lcmId.userName : 'LCM'}
          </StyledButton>
          <StyledButton $top="19vh" $left="20.3vh">
            {game.cmId ? game.cmId.userName : 'CM'}
          </StyledButton>
          <StyledButton $top="19vh" $left="29vh">
            {game.rcmId ? game.rcmId.userName : 'RCM'}
          </StyledButton>
          <StyledButton $top="19vh" $left="37.6vh">
            {game.rmId ? game.rmId.userName : 'RM'}
          </StyledButton>
          <StyledButton $top="25vh" $left="3vh">
            {game.lwmId ? game.lwmId.userName : 'LWB'}
          </StyledButton>
          <StyledButton $top="25vh" $left="11.6vh">
            {game.ldmId ? game.ldmId.userName : 'LDM'}
          </StyledButton>
          <StyledButton $top="25vh" $left="20.3vh">
            {game.cdmId ? game.cdmId.userName : 'CDM'}
          </StyledButton>
          <StyledButton $top="25vh" $left="29vh">
            {game.rdmId ? game.rdmId.userName : 'RDM'}
          </StyledButton>
          <StyledButton $top="25vh" $left="37.6vh">
            {game.rwmId ? game.rwmId.userName : 'RWB'}
          </StyledButton>
          <StyledButton $top="31vh" $left="3vh">
            {game.lbId ? game.lbId.userName : 'LB'}
          </StyledButton>
          <StyledButton $top="31vh" $left="11.6vh">
            {game.lcbId ? game.lcbId.userName : 'LCB'}
          </StyledButton>
          <StyledButton $top="31vh" $left="20.3vh">
            {game.swId ? game.swId.userName : 'SW'}
          </StyledButton>
          <StyledButton $top="31vh" $left="29vh">
            {game.rcbId ? game.rcbId.userName : 'RCB'}
          </StyledButton>
          <StyledButton $top="31vh" $left="37.6vh">
            {game.rbId ? game.rbId.userName : 'RB'}
          </StyledButton>
          <StyledButton $top="37vh" $left="20.3vh">
            {game.gkId ? game.gkId.userName : 'GK'}
          </StyledButton>
        </ButtonBox>
      </FieldWrapper>
      {hasPermission ? (
        <Link to={`/position/update/${id}`}>
          <ChangeButton onClick={handleJoinGame} style={{ width: '20vh' }}>
            경기참가
          </ChangeButton>
          <ChangeButton>포메이션 수정</ChangeButton>
        </Link>
      ) : (
        <ChangeButton onClick={handleJoinGame}>경기참가</ChangeButton>
      )}
      <PopupBox $open={isOpen}>
        <PopupButton onClick={togglePopup}>{isOpen ? '▼' : '▲'}</PopupButton>
        <UsersBox>
          {users.map((user) => (
            <UserBox key={user.userMail}>
              <UserPositionBox>{user.firstPosition}</UserPositionBox>
              <UserNameBox>{user.userName}</UserNameBox>
            </UserBox>
          ))}
        </UsersBox>
      </PopupBox>
    </PositionFormContainer>
  );
};

export default PositionForm;
