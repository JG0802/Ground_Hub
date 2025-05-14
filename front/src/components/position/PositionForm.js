import styled from 'styled-components';
import field from '../../img/field.png';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const PositionFormContainer = styled.form`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const Field = styled.img`
  width: 50vh;
  height: 42vh;
`;

const ButtonBox = styled.div`
  position: absolute;
  width: 48vh;
  height: 42vh;
  top: 10vh;
  left 2vh;
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

  useEffect(() => {
    const fetchGame = async () => {
      const res = await fetch(`/api/games/saved-formation/${id}`);
      const data = await res.json();
      setGame(data);
      console.log(data.camId);
    };

    fetchGame();
  }, [id]);

  if (!game) return <div>로딩 중...</div>;

  return (
    <PositionFormContainer>
      <h2>
        {game.date.slice(0, 10)} {game.gameName}
      </h2>
      <Field src={field} alt="축구장" />
      <ButtonBox>
        <StyledButton $top="6vh" $left="20.3vh">
          {game.stId ? game.stId.userName : 'ST'}
        </StyledButton>
        <StyledButton $top="9vh" $left="11.6vh">
          LS
        </StyledButton>
        <StyledButton $top="9vh" $left="29vh">
          RS
        </StyledButton>
        <StyledButton $top="12vh" $left="3.6vh">
          LW
        </StyledButton>
        <StyledButton $top="12vh" $left="20.3vh">
          CF
        </StyledButton>
        <StyledButton $top="12vh" $left="37.6vh">
          LW
        </StyledButton>
        <StyledButton $top="18vh" $left="11.6vh">
          LAM
        </StyledButton>
        <StyledButton $top="18vh" $left="20.3vh">
          {game.camId ? game.camId.userName : 'CAM'}
        </StyledButton>
        <StyledButton $top="18vh" $left="29vh">
          RAM
        </StyledButton>
        <StyledButton $top="24vh" $left="3vh">
          LM
        </StyledButton>
        <StyledButton $top="24vh" $left="11.6vh">
          LCM
        </StyledButton>
        <StyledButton $top="24vh" $left="20.3vh">
          CM
        </StyledButton>
        <StyledButton $top="24vh" $left="29vh">
          RCM
        </StyledButton>
        <StyledButton $top="24vh" $left="37.6vh">
          RM
        </StyledButton>
        <StyledButton $top="30vh" $left="3vh">
          LWB
        </StyledButton>
        <StyledButton $top="30vh" $left="11.6vh">
          LDM
        </StyledButton>
        <StyledButton $top="30vh" $left="20.3vh">
          CDM
        </StyledButton>
        <StyledButton $top="30vh" $left="29vh">
          RDM
        </StyledButton>
        <StyledButton $top="30vh" $left="37.6vh">
          RWB
        </StyledButton>
        <StyledButton $top="36vh" $left="3vh">
          LB
        </StyledButton>
        <StyledButton $top="36vh" $left="11.6vh">
          LCB
        </StyledButton>
        <StyledButton $top="36vh" $left="20.3vh">
          SW
        </StyledButton>
        <StyledButton $top="36vh" $left="29vh">
          RCB
        </StyledButton>
        <StyledButton $top="36vh" $left="37.6vh">
          RB
        </StyledButton>
        <StyledButton $top="42vh" $left="20.3vh">
          GK
        </StyledButton>
      </ButtonBox>
    </PositionFormContainer>
  );
};

export default PositionForm;
