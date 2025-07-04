import styled from 'styled-components';
import field from '../../img/field.png';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SelectedPositionText = styled.p`
  margin-bottom: 2vh;
  font-size: 1.7vh;
  font-weight: bold;
  color: #00B140;
`;

const FieldWrapper = styled.div`
  position: relative;
  width: 49vh;
  height: 42vh;
  background-image: url(${field});
  background-size: 100% 100%;
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
  position: absolute;
  top: ${(props) => props.$top};
  left: ${(props) => props.$left};
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => (props.$selected ? '#00B140' : 'rgba(240, 228, 57, 0.7)')};
  color: ${(props) => (props.$selected ? 'white' : 'black')};
  border: 2px solid black;
  border-radius: 20vh;
  cursor: pointer;
  width: 8.2vh;
  height: 4vh;
  font-size: 1.5vh;
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.05);
  }
`;

const CheckBadge = styled.span`
  position: absolute;
  top: -1vh;
  right: -1vh;
  background-color: white;
  color: #00B140;
  font-size: 1.4vh;
  border-radius: 50%;
  width: 2vh;
  height: 2vh;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #00B140;
`;

const SubmitButton = styled.button`
  background-color: ${(props) => (props.disabled ? '#ccc' : 'black')};
  color: white;
  width: 90%;
  height: 6vh;
  font-size: 2vh;
  border-radius: 6px;
  margin-bottom: 2vh;
  box-sizing: border-box;
  border: none;
  cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
  transition: background-color 0.3s ease;

  &:hover {
    opacity: ${(props) => (props.disabled ? 1 : 0.9)};
  }
`;

const SignUpPosition = ({ value, onChange, onSubmit }) => {
  const togglePosition = (position) => {
    if (value.includes(position)) {
      onChange(value.filter((p) => p !== position));
    } else if (value.length < 3) {
      onChange([...value, position]);
    } else {
      alert('최대 3개까지 선택 가능합니다.');
    }
  };

  const renderButton = (top, left, position) => (
    <StyledButton
      $top={top}
      $left={left}
      $selected={value.includes(position)}
      onClick={() => togglePosition(position)}
    >
      {value.includes(position) && (
        <CheckBadge>✔</CheckBadge>
      )}
      {position}
    </StyledButton>
  );

  return (
    <Container>
      <SelectedPositionText>선택한 포지션: {value.join(', ')}</SelectedPositionText>

      <FieldWrapper>
        <ButtonBox>
          {renderButton('1vh', '20.3vh', 'ST')}
          {renderButton('4vh', '11.6vh', 'LS')}
          {renderButton('4vh', '29vh', 'RS')}
          {renderButton('7vh', '3.6vh', 'LW')}
          {renderButton('7vh', '20.3vh', 'CF')}
          {renderButton('7vh', '37.6vh', 'RW')}
          {renderButton('13vh', '11.6vh', 'LAM')}
          {renderButton('13vh', '20.3vh', 'CAM')}
          {renderButton('13vh', '29vh', 'RAM')}
          {renderButton('19vh', '3vh', 'LM')}
          {renderButton('19vh', '11.6vh', 'LCM')}
          {renderButton('19vh', '20.3vh', 'CM')}
          {renderButton('19vh', '29vh', 'RCM')}
          {renderButton('19vh', '37.6vh', 'RM')}
          {renderButton('25vh', '3vh', 'LWB')}
          {renderButton('25vh', '11.6vh', 'LDM')}
          {renderButton('25vh', '20.3vh', 'CDM')}
          {renderButton('25vh', '29vh', 'RDM')}
          {renderButton('25vh', '37.6vh', 'RWB')}
          {renderButton('31vh', '3vh', 'LB')}
          {renderButton('31vh', '11.6vh', 'LCB')}
          {renderButton('31vh', '20.3vh', 'SW')}
          {renderButton('31vh', '29vh', 'RCB')}
          {renderButton('31vh', '37.6vh', 'RB')}
          {renderButton('37vh', '20.3vh', 'GK')}
        </ButtonBox>
      </FieldWrapper>

      <SubmitButton
        onClick={onSubmit}
        disabled={value.length !== 3}
      >
        회원가입 완료
      </SubmitButton>
    </Container>
  );
};

export default SignUpPosition;
