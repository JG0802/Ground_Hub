import styled from 'styled-components';
import field from '../img/field.png';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const PRGameCheckPageContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  padding-top: 8vh;
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

const PRGameCheckPage = () => {
  const { prGameId } = useParams();
  const [game, setGame] = useState('');
  const [prGame, setPrGame] = useState('');
  const [users, setUsers] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const gameId = sessionStorage.getItem('gameId');
  const navigate = useNavigate();
  const positionKeys = [
    'stId',
    'lsId',
    'rsId',
    'lwId',
    'rwId',
    'cfId',
    'camId',
    'lamId',
    'ramId',
    'cmId',
    'lcmId',
    'rcmId',
    'lmId',
    'rmId',
    'cdmId',
    'ldmId',
    'rdmId',
    'lwbId',
    'rwbId',
    'lbId',
    'rbId',
    'lcbId',
    'rcbId',
    'swId',
    'gkId',
  ];

  const togglePopup = () => {
    setIsOpen((prev) => !prev);
  };

  useEffect(() => {
    const fetchGame = async () => {
      const res = await fetch(`/api/pr-games/findByPRGameId/${prGameId}`);
      const prData = await res.json();
      setPrGame(prData);

      const response = await fetch(`/api/games/saved-formation/${gameId}`);
      const gameData = await response.json();
      setGame(gameData);
      setUsers(gameData.playersMail);
    };

    fetchGame();
  }, [prGameId, gameId]);

  const margeGame = async () => {
    try {
      const res = await fetch('/api/games/change-from-pr-to-game', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prGameId: prGameId,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(`변환 실패: ${data.message || '서버 오류'}`);
      } else {
        alert('PR 포메이션이 실제 경기 포지션으로 적용되었습니다.');
        navigate(`/position/view/${gameId}`);
      }
    } catch (error) {
      console.error('예외 발생:', error);
      alert('요청 중 문제가 발생했습니다.');
    }
  };

  const assignedUserMails = new Set(
    prGame
      ? positionKeys
          .map((key) => prGame[key])
          .filter((value) => value && value.userMail)
          .map((user) => user.userMail)
      : [],
  );

  // 필터링된 참가자 명단
  const filteredUsers = users
    ? users.filter((user) => !assignedUserMails.has(user.userMail))
    : [];

  if (!game) return <div>로딩 중...</div>;

  return (
    <PRGameCheckPageContainer>
      <h2>{prGame.prGameName}</h2>
      <FieldWrapper>
        <ButtonBox>
          {prGame.stId && (
            <StyledButton $top="1vh" $left="20.3vh">
              {prGame.stId.userName}
            </StyledButton>
          )}
          {prGame.lsId && (
            <StyledButton $top="4vh" $left="11.6vh">
              {prGame.lsId.userName}
            </StyledButton>
          )}
          {prGame.rsId && (
            <StyledButton $top="4vh" $left="29vh">
              {prGame.rsId.userName}
            </StyledButton>
          )}
          {prGame.lwId && (
            <StyledButton $top="7vh" $left="3.6vh">
              {prGame.lwId.userName}
            </StyledButton>
          )}
          {prGame.cfId && (
            <StyledButton $top="7vh" $left="20.3vh">
              {prGame.cfId.userName}
            </StyledButton>
          )}
          {prGame.rwId && (
            <StyledButton $top="7vh" $left="37.6vh">
              {prGame.rwId.userName}
            </StyledButton>
          )}
          {prGame.lamId && (
            <StyledButton $top="13vh" $left="11.6vh">
              {prGame.lamId.userName}
            </StyledButton>
          )}
          {prGame.camId && (
            <StyledButton $top="13vh" $left="20.3vh">
              {prGame.camId.userName}
            </StyledButton>
          )}
          {prGame.ramId && (
            <StyledButton $top="13vh" $left="29vh">
              {prGame.ramId.userName}
            </StyledButton>
          )}
          {prGame.lmId && (
            <StyledButton $top="19vh" $left="3vh">
              {prGame.lmId.userName}
            </StyledButton>
          )}
          {prGame.lcmId && (
            <StyledButton $top="19vh" $left="11.6vh">
              {prGame.lcmId.userName}
            </StyledButton>
          )}
          {prGame.cmId && (
            <StyledButton $top="19vh" $left="20.3vh">
              {prGame.cmId.userName}
            </StyledButton>
          )}
          {prGame.rcmId && (
            <StyledButton $top="19vh" $left="29vh">
              {prGame.rcmId.userName}
            </StyledButton>
          )}
          {prGame.rmId && (
            <StyledButton $top="19vh" $left="37.6vh">
              {prGame.rmId.userName}
            </StyledButton>
          )}
          {prGame.lwbId && (
            <StyledButton $top="25vh" $left="3vh">
              {prGame.lwbId.userName}
            </StyledButton>
          )}
          {prGame.ldmId && (
            <StyledButton $top="25vh" $left="11.6vh">
              {prGame.ldmId.userName}
            </StyledButton>
          )}
          {prGame.cdmId && (
            <StyledButton $top="25vh" $left="20.3vh">
              {prGame.cdmId.userName}
            </StyledButton>
          )}
          {prGame.rdmId && (
            <StyledButton $top="25vh" $left="29vh">
              {prGame.rdmId.userName}
            </StyledButton>
          )}
          {prGame.rwbId && (
            <StyledButton $top="25vh" $left="37.6vh">
              {prGame.rwbId.userName}
            </StyledButton>
          )}
          {prGame.lbId && (
            <StyledButton $top="31vh" $left="3vh">
              {prGame.lbId.userName}
            </StyledButton>
          )}
          {prGame.lcbId && (
            <StyledButton $top="31vh" $left="11.6vh">
              {prGame.lcbId.userName}
            </StyledButton>
          )}
          {prGame.swId && (
            <StyledButton $top="31vh" $left="20.3vh">
              {prGame.swId.userName}
            </StyledButton>
          )}
          {prGame.rcbId && (
            <StyledButton $top="31vh" $left="29vh">
              {prGame.rcbId.userName}
            </StyledButton>
          )}
          {prGame.rbId && (
            <StyledButton $top="31vh" $left="37.6vh">
              {prGame.rbId.userName}
            </StyledButton>
          )}
          {prGame.gkId && (
            <StyledButton $top="37vh" $left="20.3vh">
              {prGame.gkId.userName}
            </StyledButton>
          )}
        </ButtonBox>
      </FieldWrapper>
      <ChangeButton onClick={() => margeGame()}>포메이션 병합</ChangeButton>
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
    </PRGameCheckPageContainer>
  );
};

export default PRGameCheckPage;
