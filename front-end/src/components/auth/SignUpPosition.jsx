import styled from 'styled-components';
import field from '../../img/field.png';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
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
  position: absolute; /* 절대 위치 */
  top: ${(props) => props.$top}; /* 상단 여백 */
  left: ${(props) => props.$left}; /* 우측 여백 */
  display: flex; /* 내부 정렬 위해 flex 사용 */
  justify-content: center; /* 수평 가운데 */
  align-items: center;
  background-color: ${(props) =>
    props.$selected ? 'black' : 'rgba(240, 228, 57, 0.7)'};
  color: ${(props) => (props.$selected ? 'white' : 'black')};
  border: 2px solid black;
  border-radius: 20vh;
  cursor: pointer;
  width: 8.2vh;
  height: 4vh;
  font-size: 1.5vh;
`;

const SubmitButton = styled.button`
  background-color: black;
  color: white;
  width: 90%;
  height: 6vh;
  font-size: 2vh;
  border-radius: 6px;
  margin-bottom: 2vh;
  box-sizing: border-box;
  border: none;
  &:hover {
    cursor: pointer;
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

  return (
    <Container>
      <FieldWrapper>
        <ButtonBox>
          <StyledButton
            $top="1vh"
            $left="20.3vh"
            $selected={value.includes('ST')}
            onClick={() => togglePosition('ST')}
          >
            {value.includes('ST')
              ? `${value.indexOf('ST') + 1}. ST`
              : 'ST'}
          </StyledButton>
          <StyledButton
            $top="4vh"
            $left="11.6vh"
            $selected={value.includes('')}
            onClick={() => togglePosition('LS')}
          >
            {value.includes('LS')
              ? `${value.indexOf('LS') + 1}. LS`
              : 'LS'}
          </StyledButton>
          <StyledButton
            $top="4vh"
            $left="29vh"
            $selected={value.includes('RS')}
            onClick={() => togglePosition('RS')}
          >
            {value.includes('RS')
              ? `${value.indexOf('RS') + 1}. RS`
              : 'RS'}
          </StyledButton>
          <StyledButton
            $top="7vh"
            $left="3.6vh"
            $selected={value.includes('LW')}
            onClick={() => togglePosition('LW')}
          >
            {value.includes('LW')
              ? `${value.indexOf('LW') + 1}. LW`
              : 'LW'}
          </StyledButton>
          <StyledButton
            $top="7vh"
            $left="20.3vh"
            $selected={value.includes('CF')}
            onClick={() => togglePosition('CF')}
          >
            {value.includes('CF')
              ? `${value.indexOf('CF') + 1}. CF`
              : 'CF'}
          </StyledButton>
          <StyledButton
            $top="7vh"
            $left="37.6vh"
            $selected={value.includes('RW')}
            onClick={() => togglePosition('RW')}
          >
            {value.includes('RW')
              ? `${value.indexOf('RW') + 1}. RW`
              : 'RW'}
          </StyledButton>
          <StyledButton
            $top="13vh"
            $left="11.6vh"
            $selected={value.includes('LAM')}
            onClick={() => togglePosition('LAM')}
          >
            {value.includes('LAM')
              ? `${value.indexOf('LAM') + 1}. LAM`
              : 'LAM'}
          </StyledButton>
          <StyledButton
            $top="13vh"
            $left="20.3vh"
            $selected={value.includes('CAM')}
            onClick={() => togglePosition('CAM')}
          >
            {value.includes('CAM')
              ? `${value.indexOf('CAM') + 1}. CAM`
              : 'CAM'}
          </StyledButton>
          <StyledButton
            $top="13vh"
            $left="29vh"
            $selected={value.includes('RAM')}
            onClick={() => togglePosition('RAM')}
          >
            {value.includes('RAM')
              ? `${value.indexOf('RAM') + 1}. RAM`
              : 'RAM'}
          </StyledButton>
          <StyledButton
            $top="19vh"
            $left="3vh"
            $selected={value.includes('LM')}
            onClick={() => togglePosition('LM')}
          >
            {value.includes('LM')
              ? `${value.indexOf('LM') + 1}. LM`
              : 'LM'}
          </StyledButton>
          <StyledButton
            $top="19vh"
            $left="11.6vh"
            $selected={value.includes('LCM')}
            onClick={() => togglePosition('LCM')}
          >
            {value.includes('LCM')
              ? `${value.indexOf('LCM') + 1}. LCM`
              : 'LCM'}
          </StyledButton>
          <StyledButton
            $top="19vh"
            $left="20.3vh"
            $selected={value.includes('CM')}
            onClick={() => togglePosition('CM')}
          >
            {value.includes('CM')
              ? `${value.indexOf('CM') + 1}. CM`
              : 'CM'}
          </StyledButton>
          <StyledButton
            $top="19vh"
            $left="29vh"
            $selected={value.includes('RCM')}
            onClick={() => togglePosition('RCM')}
          >
            {value.includes('RCM')
              ? `${value.indexOf('RCM') + 1}. RCM`
              : 'RCM'}
          </StyledButton>
          <StyledButton
            $top="19vh"
            $left="37.6vh"
            $selected={value.includes('RM')}
            onClick={() => togglePosition('RM')}
          >
            {value.includes('RM')
              ? `${value.indexOf('RM') + 1}. RM`
              : 'RM'}
          </StyledButton>
          <StyledButton
            $top="25vh"
            $left="3vh"
            $selected={value.includes('LWB')}
            onClick={() => togglePosition('LWB')}
          >
            {value.includes('LWB')
              ? `${value.indexOf('LWB') + 1}. LWB`
              : 'LWB'}
          </StyledButton>
          <StyledButton
            $top="25vh"
            $left="11.6vh"
            $selected={value.includes('LDM')}
            onClick={() => togglePosition('LDM')}
          >
            {value.includes('LDM')
              ? `${value.indexOf('LDM') + 1}. LDM`
              : 'LDM'}
          </StyledButton>
          <StyledButton
            $top="25vh"
            $left="20.3vh"
            $selected={value.includes('CDM')}
            onClick={() => togglePosition('CDM')}
          >
            {value.includes('CDM')
              ? `${value.indexOf('CDM') + 1}. CDM`
              : 'CDM'}
          </StyledButton>
          <StyledButton
            $top="25vh"
            $left="29vh"
            $selected={value.includes('RDM')}
            onClick={() => togglePosition('RDM')}
          >
            {value.includes('RDM')
              ? `${value.indexOf('RDM') + 1}. RDM`
              : 'RDM'}
          </StyledButton>
          <StyledButton
            $top="25vh"
            $left="37.6vh"
            $selected={value.includes('RWB')}
            onClick={() => togglePosition('RWB')}
          >
            {value.includes('RWB')
              ? `${value.indexOf('RWB') + 1}. RWB`
              : 'RWB'}
          </StyledButton>
          <StyledButton
            $top="31vh"
            $left="3vh"
            $selected={value.includes('LB')}
            onClick={() => togglePosition('LB')}
          >
            {value.includes('LB')
              ? `${value.indexOf('LB') + 1}. LB`
              : 'LB'}
          </StyledButton>
          <StyledButton
            $top="31vh"
            $left="11.6vh"
            $selected={value.includes('LCB')}
            onClick={() => togglePosition('LCB')}
          >
            {value.includes('LCB')
              ? `${value.indexOf('LCB') + 1}. LCB`
              : 'LCB'}
          </StyledButton>
          <StyledButton
            $top="31vh"
            $left="20.3vh"
            $selected={value.includes('SW')}
            onClick={() => togglePosition('SW')}
          >
            {value.includes('SW')
              ? `${value.indexOf('SW') + 1}. SW`
              : 'SW'}
          </StyledButton>
          <StyledButton
            $top="31vh"
            $left="29vh"
            $selected={value.includes('RCB')}
            onClick={() => togglePosition('RCB')}
          >
            {value.includes('RCB')
              ? `${value.indexOf('RCB') + 1}. RCB`
              : 'RCB'}
          </StyledButton>
          <StyledButton
            $top="31vh"
            $left="37.6vh"
            $selected={value.includes('RB')}
            onClick={() => togglePosition('RB')}
          >
            {value.includes('RB')
              ? `${value.indexOf('RB') + 1}. RB`
              : 'RB'}
          </StyledButton>
          <StyledButton
            $top="37vh"
            $left="20.3vh"
            $selected={value.includes('GK')}
            onClick={() => togglePosition('GK')}
          >
            {value.includes('GK')
              ? `${value.indexOf('GK') + 1}. GK`
              : 'GK'}
          </StyledButton>
        </ButtonBox>
      </FieldWrapper>
      <SubmitButton onClick={onSubmit}>회원가입 완료</SubmitButton>
    </Container>
  );
};

export default SignUpPosition;
