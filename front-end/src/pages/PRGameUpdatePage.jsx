import styled from 'styled-components';
import field from '../img/field.png';
import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const PRGameUpdatePageContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
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

const TitleInput = styled.input`
  height: 4vh;
  width: 60%;
  display: block;
  margin: 2vh auto;
  font-size: 2.5vh;
  text-align: center;
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

const PRGameUpdatePage = () => {
  const { prGameId } = useParams();
  const gameId = sessionStorage.getItem('gameId');
  const userMail = sessionStorage.getItem('userMail');
  const [prGame, setPrGame] = useState('');
  const [game, setGame] = useState(null);
  const [users, setUsers] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedPositionKey, setSelectedPositionKey] = useState(null);
  const [title, setTitle] = useState();
  const navigate = useNavigate();
  const positionKeyToRole = useMemo(
    () => ({
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
    }),
    [],
  );

  useEffect(() => {
    const fetchGame = async () => {
      const res = await fetch(`/api/pr-games/findByPRGameId/${prGameId}`);
      const prData = await res.json();
      setPrGame(prData);
      setTitle(prData.prGameName);

      const response = await fetch(`/api/games/saved-formation/${gameId}`);
      const gameData = await response.json();

      const positionKeys = Object.keys(positionKeyToRole);
      positionKeys.forEach((key) => {
        if (prData[key]) {
          gameData[key] = prData[key]; // 해당 포지션에 유저 복사
        }
      });

      setGame(gameData);
      setUsers(gameData.playersMail);
    };

    fetchGame();
  }, [prGameId, gameId, positionKeyToRole]);

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

  const positionKeys = Object.keys(positionKeyToRole);

  const assignedUserMails = new Set(
    prGame
      ? positionKeys.map((key) => prGame[key]?.userMail).filter(Boolean)
      : [],
  );

  const handleUserSelect = (user) => {
    if (!selectedPositionKey) {
      return;
    }

    setGame((prevGame) => ({
      ...prevGame,
      [selectedPositionKey]: user,
    }));

    setPrGame((prevGame) => ({
      ...prevGame,
      [selectedPositionKey]: user,
    }));

    setSelectedPositionKey(null); // 선택 초기화
    setIsOpen(false);
  };

  const handleRequestPRGame = async () => {
    if (!game) return;

    const positionKeys = Object.keys(positionKeyToRole);

    const prGamePayload = {
      prGameId: prGameId,
      prGameName: title,
      game: { gameId: Number(gameId) },
      user: {
        userMail: userMail,
      },
    };

    // 포지션 키에 따라 userMail이 할당된 경우만 포함
    positionKeys.forEach((key) => {
      const user = game[key];
      if (user && user.userMail) {
        prGamePayload[key] = { userMail: user.userMail };
      }
    });

    try {
      const res = await fetch('/api/pr-games/update', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(prGamePayload),
      });

      const data = await res.json();
      if (!res.ok) {
        console.error('서버 응답 오류:', data);
        alert(`요청 실패: ${data.message || '서버 오류'}`);
      } else {
        console.log('PR 경기 저장 성공:', data);
        alert('PR 경기가 성공적으로 저장되었습니다.');
        navigate(`/user/pr/list/${gameId}`);
      }
    } catch (err) {
      console.error('예외 발생:', err);
      alert('요청 중 예외가 발생했습니다.');
    }
  };

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
    <PRGameUpdatePageContainer>
      <TitleInput value={title} onChange={(e) => setTitle(e.target.value)} />
      <FieldWrapper>
        <ButtonBox>
          <StyledButton
            $top="1vh"
            $left="20.3vh"
            onClick={() => handlePositionClick('stId')}
          >
            {prGame.stId ? prGame.stId.userName : 'ST'}
          </StyledButton>
          <StyledButton
            $top="4vh"
            $left="11.6vh"
            onClick={() => handlePositionClick('lsId')}
          >
            {prGame.lsId ? prGame.lsId.userName : 'LS'}
          </StyledButton>
          <StyledButton
            $top="4vh"
            $left="29vh"
            onClick={() => handlePositionClick('rsId')}
          >
            {prGame.rsId ? prGame.rsId.userName : 'RS'}
          </StyledButton>
          <StyledButton
            $top="7vh"
            $left="3.6vh"
            onClick={() => handlePositionClick('lwId')}
          >
            {prGame.lwId ? prGame.lwId.userName : 'LW'}
          </StyledButton>
          <StyledButton
            $top="7vh"
            $left="20.3vh"
            onClick={() => handlePositionClick('cfId')}
          >
            {prGame.cfId ? prGame.cfId.userName : 'CF'}
          </StyledButton>
          <StyledButton
            $top="7vh"
            $left="37.6vh"
            onClick={() => handlePositionClick('rwId')}
          >
            {prGame.rwId ? prGame.rwId.userName : 'RW'}
          </StyledButton>
          <StyledButton
            $top="13vh"
            $left="11.6vh"
            onClick={() => handlePositionClick('lamId')}
          >
            {prGame.lamId ? prGame.lamId.userName : 'LAM'}
          </StyledButton>
          <StyledButton
            $top="13vh"
            $left="20.3vh"
            onClick={() => handlePositionClick('camId')}
          >
            {prGame.camId ? prGame.camId.userName : 'CAM'}
          </StyledButton>
          <StyledButton
            $top="13vh"
            $left="29vh"
            onClick={() => handlePositionClick('ramId')}
          >
            {prGame.ramId ? prGame.ramId.userName : 'RAM'}
          </StyledButton>
          <StyledButton
            $top="19vh"
            $left="3vh"
            onClick={() => handlePositionClick('lmId')}
          >
            {prGame.lmId ? prGame.lmId.userName : 'LM'}
          </StyledButton>
          <StyledButton
            $top="19vh"
            $left="11.6vh"
            onClick={() => handlePositionClick('lcmId')}
          >
            {prGame.lcmId ? prGame.lcmId.userName : 'LCM'}
          </StyledButton>
          <StyledButton
            $top="19vh"
            $left="20.3vh"
            onClick={() => handlePositionClick('cmId')}
          >
            {prGame.cmId ? prGame.cmId.userName : 'CM'}
          </StyledButton>
          <StyledButton
            $top="19vh"
            $left="29vh"
            onClick={() => handlePositionClick('rcmId')}
          >
            {prGame.rcmId ? prGame.rcmId.userName : 'RCM'}
          </StyledButton>
          <StyledButton
            $top="19vh"
            $left="37.6vh"
            onClick={() => handlePositionClick('rmId')}
          >
            {prGame.rmId ? prGame.rmId.userName : 'RM'}
          </StyledButton>
          <StyledButton
            $top="25vh"
            $left="3vh"
            onClick={() => handlePositionClick('lwbId')}
          >
            {prGame.lwbId ? prGame.lwbId.userName : 'LWB'}
          </StyledButton>
          <StyledButton
            $top="25vh"
            $left="11.6vh"
            onClick={() => handlePositionClick('ldmId')}
          >
            {prGame.ldmId ? prGame.ldmId.userName : 'LDM'}
          </StyledButton>
          <StyledButton
            $top="25vh"
            $left="20.3vh"
            onClick={() => handlePositionClick('cdmId')}
          >
            {prGame.cdmId ? prGame.cdmId.userName : 'CDM'}
          </StyledButton>
          <StyledButton
            $top="25vh"
            $left="29vh"
            onClick={() => handlePositionClick('rdmId')}
          >
            {prGame.rdmId ? prGame.rdmId.userName : 'RDM'}
          </StyledButton>
          <StyledButton
            $top="25vh"
            $left="37.6vh"
            onClick={() => handlePositionClick('rwbId')}
          >
            {prGame.rwbId ? prGame.rwbId.userName : 'RWB'}
          </StyledButton>
          <StyledButton
            $top="31vh"
            $left="3vh"
            onClick={() => handlePositionClick('lbId')}
          >
            {prGame.lbId ? prGame.lbId.userName : 'LB'}
          </StyledButton>
          <StyledButton
            $top="31vh"
            $left="11.6vh"
            onClick={() => handlePositionClick('lcbId')}
          >
            {prGame.lcbId ? prGame.lcbId.userName : 'LCB'}
          </StyledButton>
          <StyledButton
            $top="31vh"
            $left="20.3vh"
            onClick={() => handlePositionClick('swId')}
          >
            {prGame.swId ? prGame.swId.userName : 'SW'}
          </StyledButton>
          <StyledButton
            $top="31vh"
            $left="29vh"
            onClick={() => handlePositionClick('rcbId')}
          >
            {prGame.rcbId ? prGame.rcbId.userName : 'RCB'}
          </StyledButton>
          <StyledButton
            $top="31vh"
            $left="37.6vh"
            onClick={() => handlePositionClick('rbId')}
          >
            {prGame.rbId ? prGame.rbId.userName : 'RB'}
          </StyledButton>
          <StyledButton
            $top="37vh"
            $left="20.3vh"
            onClick={() => handlePositionClick('gkId')}
          >
            {prGame.gkId ? prGame.gkId.userName : 'GK'}
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
      <ChangeButton onClick={() => handleRequestPRGame()}>
        포메이션 요청 수정
      </ChangeButton>
    </PRGameUpdatePageContainer>
  );
};

export default PRGameUpdatePage;
