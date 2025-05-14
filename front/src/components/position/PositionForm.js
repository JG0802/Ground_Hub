import styled from 'styled-components';
import field from '../../img/field.png';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

const PositionFormContainer = styled.form`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const FieldWrapper = styled.div`
  position: relative;
  width: 49vh;
  height: 42vh;
  background-image: url(${field}););
  background-size: 100% 100%;    // ✅ 강제로 꽉 채움 (비율 무시)
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

const PositionForm = () => {
  const { id } = useParams();
  const [game, setGame] = useState(null);
  const [hasPermission, setHasPermission] = useState(false);
  const [checked, setChecked] = useState(false);
  const userMail = sessionStorage.getItem('userMail');
  const teamId = sessionStorage.getItem('teamId');

  useEffect(() => {
    const fetchGame = async () => {
      const res = await fetch(`/api/games/saved-formation/${id}`);
      const data = await res.json();
      setGame(data);
    };

    fetchGame();
  }, [id]);

  useEffect(() => {
    const checkPermission = async () => {
      if (!userMail || !teamId) return;

      try {
        const response = await fetch(`/api/teams/${teamId}`);
        if (!response.ok) throw new Error();

        const data = await response.json();

        if (data.teamManager?.userMail === userMail) {
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
            LS
          </StyledButton>
          <StyledButton $top="4vh" $left="29vh">
            RS
          </StyledButton>
          <StyledButton $top="7vh" $left="3.6vh">
            LW
          </StyledButton>
          <StyledButton $top="7vh" $left="20.3vh">
            CF
          </StyledButton>
          <StyledButton $top="7vh" $left="37.6vh">
            LW
          </StyledButton>
          <StyledButton $top="13vh" $left="11.6vh">
            LAM
          </StyledButton>
          <StyledButton $top="13vh" $left="20.3vh">
            {game.camId ? game.camId.userName : 'CAM'}
          </StyledButton>
          <StyledButton $top="13vh" $left="29vh">
            RAM
          </StyledButton>
          <StyledButton $top="19vh" $left="3vh">
            LM
          </StyledButton>
          <StyledButton $top="19vh" $left="11.6vh">
            LCM
          </StyledButton>
          <StyledButton $top="19vh" $left="20.3vh">
            CM
          </StyledButton>
          <StyledButton $top="19vh" $left="29vh">
            RCM
          </StyledButton>
          <StyledButton $top="19vh" $left="37.6vh">
            RM
          </StyledButton>
          <StyledButton $top="25vh" $left="3vh">
            LWB
          </StyledButton>
          <StyledButton $top="25vh" $left="11.6vh">
            LDM
          </StyledButton>
          <StyledButton $top="25vh" $left="20.3vh">
            CDM
          </StyledButton>
          <StyledButton $top="25vh" $left="29vh">
            RDM
          </StyledButton>
          <StyledButton $top="25vh" $left="37.6vh">
            RWB
          </StyledButton>
          <StyledButton $top="31vh" $left="3vh">
            LB
          </StyledButton>
          <StyledButton $top="31vh" $left="11.6vh">
            LCB
          </StyledButton>
          <StyledButton $top="31vh" $left="20.3vh">
            SW
          </StyledButton>
          <StyledButton $top="31vh" $left="29vh">
            RCB
          </StyledButton>
          <StyledButton $top="31vh" $left="37.6vh">
            RB
          </StyledButton>
          <StyledButton $top="37vh" $left="20.3vh">
            GK
          </StyledButton>
        </ButtonBox>
      </FieldWrapper>
      {hasPermission ? (
        <Link to={`/position/update/${id}`}>
          <button>포메이션 수정</button>
        </Link>
      ) : (
        <></>
      )}
    </PositionFormContainer>
  );
};

export default PositionForm;
