import styled from 'styled-components';
import field from '../../img/field.png';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

const PositionContainer = styled.div`
  padding: 7vh 2vw 10vh;
  max-width: 768px;
  margin: 0 auto;
  background-color: #f9f9f9;
  display: flex;
  flex-direction: column;
  align-items: center;
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
  background-color: rgba(240, 228, 57, 0.5); /* 반투명 배경 */
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

const PositionUpdate = () => {
  const { id } = useParams();
  const [game, setGame] = useState(null);
  const [users, setUsers] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedPositionKey, setSelectedPositionKey] = useState(null);
  const navigate = useNavigate();
  const positionKeyToRole = {
    stId: 'ST',
    lsId: 'LS',
    rsId: 'RS',
    lwId: 'LW',
    rwId: 'RW',
    cfId: 'CF',
    camId: 'CAM',
    lamId: 'LAM',
    ramId: 'RAM',
    cmId: 'CM',
    lcmId: 'LCM',
    rcmId: 'RCM',
    lmId: 'LM',
    rmId: 'RM',
    cdmId: 'CDM',
    ldmId: 'LDM',
    rdmId: 'RDM',
    lwbId: 'LWB',
    rwbId: 'RWB',
    lbId: 'LB',
    rbId: 'RB',
    lcbId: 'LCB',
    rcbId: 'RCB',
    swId: 'SW',
    gkId: 'GK',
  };

  const togglePopup = () => {
    setIsOpen((prev) => {
      const next = !prev;
      if (!next) setSelectedPositionKey(null); // 닫힐 때만 초기화
      return next;
    });
  };

  const handlePositionClick = (positionKey) => {
    setSelectedPositionKey(positionKey);
    setIsOpen(true);
  };

  useEffect(() => {
    const fetchGame = async () => {
      const res = await fetch(`/api/games/saved-formation/${id}`);
      const data = await res.json();
      setGame(data);
      setUsers(data.playersMail);
    };

    fetchGame();
  }, [id]);

  const handleUserSelect = (user) => {
    if (!selectedPositionKey) {
      return;
    }

    setGame((prevGame) => ({
      ...prevGame,
      [selectedPositionKey]: user,
    }));

    setSelectedPositionKey(null); // 선택 초기화
    setIsOpen(false);
  };

  const handleSubmit = async () => {
    try {
      const payload = { ...game };

      // 각 포지션 키의 값이 user 객체이면 userMail만 추출
      for (const key in payload) {
        if (
          payload[key] &&
          typeof payload[key] === 'object' &&
          payload[key].userMail
        ) {
          payload[key] = payload[key].userMail;
        }
      }
      const response = await fetch('/api/games/update-game', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(game),
      });

      if (response.ok) {
        alert('포지션이 저장되었습니다.');
        navigate(`/position/view/${id}`);
      } else {
        alert('저장 실패: ' + (await response.text()));
      }
    } catch (err) {
      console.error(err);
      alert('서버 오류 발생');
    }
  };

  const assignedUserMails = new Set(
    game
      ? Object.values(game)
          .map((user) => user?.userMail)
          .filter(Boolean)
      : [],
  );

  const preferredUsers =
    users && selectedPositionKey
      ? users.filter(
          (user) =>
            !assignedUserMails.has(user.userMail) &&
            [
              user.firstPosition,
              user.secondPosition,
              user.thirdPosition,
            ].includes(positionKeyToRole[selectedPositionKey]),
        )
      : [];

  const otherUsers = users
    ? users.filter((user) =>
        selectedPositionKey
          ? // 포지션이 선택된 경우 → 추천이 아닌 사용자
            !assignedUserMails.has(user.userMail) &&
            !preferredUsers.includes(user)
          : // 포지션이 선택되지 않은 경우 → 모든 사용자
            !assignedUserMails.has(user.userMail),
      )
    : [];

  const handleRemovePlayer = () => {
    if (!selectedPositionKey) return;
    setGame((prevGame) => ({
      ...prevGame,
      [selectedPositionKey]: null,
    }));
    setSelectedPositionKey(null);
    setIsOpen(false);
  };

  if (!game) return <div>로딩 중...</div>;

  return (
    <PositionContainer>
      <h2>
        {game.date.slice(0, 10)} {game.gameName}
      </h2>
      <FieldWrapper>
        <ButtonBox>
          <StyledButton
            $top="1vh"
            $left="20.3vh"
            onClick={() => handlePositionClick('stId')}
          >
            {game.stId ? game.stId.userName : 'ST'}
          </StyledButton>
          <StyledButton
            $top="4vh"
            $left="11.6vh"
            onClick={() => handlePositionClick('lsId')}
          >
            {game.lsId ? game.lsId.userName : 'LS'}
          </StyledButton>
          <StyledButton
            $top="4vh"
            $left="29vh"
            onClick={() => handlePositionClick('rsId')}
          >
            {game.rsId ? game.rsId.userName : 'RS'}
          </StyledButton>
          <StyledButton
            $top="7vh"
            $left="3.6vh"
            onClick={() => handlePositionClick('lwId')}
          >
            {game.lwId ? game.lwId.userName : 'LW'}
          </StyledButton>
          <StyledButton
            $top="7vh"
            $left="20.3vh"
            onClick={() => handlePositionClick('cfId')}
          >
            {game.cfId ? game.cfId.userName : 'CF'}
          </StyledButton>
          <StyledButton
            $top="7vh"
            $left="37.6vh"
            onClick={() => handlePositionClick('rwId')}
          >
            {game.rwId ? game.rwId.userName : 'RW'}
          </StyledButton>
          <StyledButton
            $top="13vh"
            $left="11.6vh"
            onClick={() => handlePositionClick('lamId')}
          >
            {game.lamId ? game.lamId.userName : 'LAM'}
          </StyledButton>
          <StyledButton
            $top="13vh"
            $left="20.3vh"
            onClick={() => handlePositionClick('camId')}
          >
            {game.camId ? game.camId.userName : 'CAM'}
          </StyledButton>
          <StyledButton
            $top="13vh"
            $left="29vh"
            onClick={() => handlePositionClick('ramId')}
          >
            {game.ramId ? game.ramId.userName : 'RAM'}
          </StyledButton>
          <StyledButton
            $top="19vh"
            $left="3vh"
            onClick={() => handlePositionClick('lmId')}
          >
            {game.lmId ? game.lmId.userName : 'LM'}
          </StyledButton>
          <StyledButton
            $top="19vh"
            $left="11.6vh"
            onClick={() => handlePositionClick('lcmId')}
          >
            {game.lcmId ? game.lcmId.userName : 'LCM'}
          </StyledButton>
          <StyledButton
            $top="19vh"
            $left="20.3vh"
            onClick={() => handlePositionClick('cmId')}
          >
            {game.cmId ? game.cmId.userName : 'CM'}
          </StyledButton>
          <StyledButton
            $top="19vh"
            $left="29vh"
            onClick={() => handlePositionClick('rcmId')}
          >
            {game.rcmId ? game.rcmId.userName : 'RCM'}
          </StyledButton>
          <StyledButton
            $top="19vh"
            $left="37.6vh"
            onClick={() => handlePositionClick('rmId')}
          >
            {game.rmId ? game.rmId.userName : 'RM'}
          </StyledButton>
          <StyledButton
            $top="25vh"
            $left="3vh"
            onClick={() => handlePositionClick('lwbId')}
          >
            {game.lwbId ? game.lwbId.userName : 'LWB'}
          </StyledButton>
          <StyledButton
            $top="25vh"
            $left="11.6vh"
            onClick={() => handlePositionClick('ldmId')}
          >
            {game.ldmId ? game.ldmId.userName : 'LDM'}
          </StyledButton>
          <StyledButton
            $top="25vh"
            $left="20.3vh"
            onClick={() => handlePositionClick('cdmId')}
          >
            {game.cdmId ? game.cdmId.userName : 'CDM'}
          </StyledButton>
          <StyledButton
            $top="25vh"
            $left="29vh"
            onClick={() => handlePositionClick('rdmId')}
          >
            {game.rdmId ? game.rdmId.userName : 'RDM'}
          </StyledButton>
          <StyledButton
            $top="25vh"
            $left="37.6vh"
            onClick={() => handlePositionClick('rwbId')}
          >
            {game.rwbId ? game.rwbId.userName : 'RWB'}
          </StyledButton>
          <StyledButton
            $top="31vh"
            $left="3vh"
            onClick={() => handlePositionClick('lbId')}
          >
            {game.lbId ? game.lbId.userName : 'LB'}
          </StyledButton>
          <StyledButton
            $top="31vh"
            $left="11.6vh"
            onClick={() => handlePositionClick('lcbId')}
          >
            {game.lcbId ? game.lcbId.userName : 'LCB'}
          </StyledButton>
          <StyledButton
            $top="31vh"
            $left="20.3vh"
            onClick={() => handlePositionClick('swId')}
          >
            {game.swId ? game.swId.userName : 'SW'}
          </StyledButton>
          <StyledButton
            $top="31vh"
            $left="29vh"
            onClick={() => handlePositionClick('rcbId')}
          >
            {game.rcbId ? game.rcbId.userName : 'RCB'}
          </StyledButton>
          <StyledButton
            $top="31vh"
            $left="37.6vh"
            onClick={() => handlePositionClick('rbId')}
          >
            {game.rbId ? game.rbId.userName : 'RB'}
          </StyledButton>
          <StyledButton
            $top="37vh"
            $left="20.3vh"
            onClick={() => handlePositionClick('gkId')}
          >
            {game.gkId ? game.gkId.userName : 'GK'}
          </StyledButton>
        </ButtonBox>
      </FieldWrapper>
      <PopupBox $open={isOpen}>
        <PopupButton onClick={togglePopup}>{isOpen ? '▼' : '▲'}</PopupButton>

        {selectedPositionKey && (
          <>
            <PopupTitle>추천 선수</PopupTitle>
            {preferredUsers.length > 0 ? (
              <UsersBox>
                {preferredUsers.map((user) => (
                  <UserBox
                    key={user.userMail}
                    onClick={() => handleUserSelect(user)}
                  >
                    <UserPositionBox>
                      {user.firstPosition}, {user.secondPosition},{' '}
                      {user.thirdPosition}
                    </UserPositionBox>
                    <UserNameBox>{user.userName}</UserNameBox>
                  </UserBox>
                ))}
              </UsersBox>
            ) : (
              <p style={{ textAlign: 'center', marginBottom: '2vh' }}>
                추천 선수가 없습니다
              </p>
            )}
          </>
        )}

        <PopupTitle>참가자 명단</PopupTitle>
        {otherUsers.length > 0 ? (
          <UsersBox>
            {otherUsers.map((user) => (
              <UserBox
                key={user.userMail}
                onClick={() => handleUserSelect(user)}
              >
                <UserPositionBox>
                  {user.firstPosition}, {user.secondPosition},{' '}
                  {user.thirdPosition}
                </UserPositionBox>
                <UserNameBox>{user.userName}</UserNameBox>
              </UserBox>
            ))}
          </UsersBox>
        ) : (
          <p style={{ textAlign: 'center', marginBottom: '2vh' }}>
            참가자가 없습니다
          </p>
        )}
        {selectedPositionKey && (
          <ChangeButton
            onClick={handleRemovePlayer}
            style={{
              marginTop: '2vh',
              width: '100%',
              backgroundColor: '#c0392b',
            }}
          >
            선수 제거
          </ChangeButton>
        )}
      </PopupBox>
      <ChangeButton onClick={handleSubmit}>저장</ChangeButton>
    </PositionContainer>
  );
};

export default PositionUpdate;
