import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import field from '../../img/field.png';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h1`
  margin-top: 10vh;
  font-size: 3vh;
  font-family: 'MarinesBold', sans-serif;
`;

const Subtitle = styled.p`
  margin: 4vh 0 2vh;
  font-size: 2.2vh;
  font-weight: bold;
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
  width: 40vh;
  height: 6vh;
  font-size: 2vh;
  border-radius: 0.7vh;
  background-color: black;
  color: white;
  box-sizing: border-box;
`;

const SelectPosition = () => {
  const [selected, setSelected] = useState([]);
  const navigate = useNavigate();

  const userMail = sessionStorage.getItem('userMail');
  const password = sessionStorage.getItem('password');
  const userName = sessionStorage.getItem('userName');
  const tel = sessionStorage.getItem('tel');

  const togglePosition = (position) => {
    if (selected.includes(position)) {
      setSelected(selected.filter((p) => p !== position));
    } else if (selected.length < 3) {
      setSelected([...selected, position]);
    } else {
      alert('최대 3개까지 선택 가능합니다.');
    }
  };

  const handleSubmit = async () => {
    if (selected.length !== 3) {
      alert('포지션을 3개 선택해주세요.');
      return;
    }

    try {
      const response = await fetch('/api/users/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userMail: userMail,
          password: password,
          userName: userName,
          tel: tel,
          firstPosition: selected[0],
          secondPosition: selected[1],
          thirdPosition: selected[2],
        }),
      });

      if (response.ok) {
        alert('회원가입 완료!');
        navigate('/main');
      } else {
        const err = await response.text();
        alert(err || '포지션 설정 실패');
      }
    } catch (error) {
      console.error('서버 요청 중 오류:', error);
      alert('서버 요청 중 문제가 발생했습니다.');
    }
  };

  return (
    <Container>
      <Title>Ground Hub</Title>
      <Subtitle>선호 포지션을 3개 선택하세요</Subtitle>
      <FieldWrapper>
        <ButtonBox>
          <StyledButton
            $top="1vh"
            $left="20.3vh"
            $selected={selected.includes('ST')}
            onClick={() => togglePosition('ST')}
          >
            {selected.includes('ST')
              ? `${selected.indexOf('ST') + 1}. ST`
              : 'ST'}
          </StyledButton>
          <StyledButton
            $top="4vh"
            $left="11.6vh"
            $selected={selected.includes('')}
            onClick={() => togglePosition('LS')}
          >
            {selected.includes('LS')
              ? `${selected.indexOf('LS') + 1}. LS`
              : 'LS'}
          </StyledButton>
          <StyledButton
            $top="4vh"
            $left="29vh"
            $selected={selected.includes('RS')}
            onClick={() => togglePosition('RS')}
          >
            {selected.includes('RS')
              ? `${selected.indexOf('RS') + 1}. RS`
              : 'RS'}
          </StyledButton>
          <StyledButton
            $top="7vh"
            $left="3.6vh"
            $selected={selected.includes('LW')}
            onClick={() => togglePosition('LW')}
          >
            {selected.includes('LW')
              ? `${selected.indexOf('LW') + 1}. LW`
              : 'LW'}
          </StyledButton>
          <StyledButton
            $top="7vh"
            $left="20.3vh"
            $selected={selected.includes('CF')}
            onClick={() => togglePosition('CF')}
          >
            {selected.includes('CF')
              ? `${selected.indexOf('CF') + 1}. CF`
              : 'CF'}
          </StyledButton>
          <StyledButton
            $top="7vh"
            $left="37.6vh"
            $selected={selected.includes('RW')}
            onClick={() => togglePosition('RW')}
          >
            {selected.includes('RW')
              ? `${selected.indexOf('RW') + 1}. RW`
              : 'RW'}
          </StyledButton>
          <StyledButton
            $top="13vh"
            $left="11.6vh"
            $selected={selected.includes('LAM')}
            onClick={() => togglePosition('LAM')}
          >
            {selected.includes('LAM')
              ? `${selected.indexOf('LAM') + 1}. LAM`
              : 'LAM'}
          </StyledButton>
          <StyledButton
            $top="13vh"
            $left="20.3vh"
            $selected={selected.includes('CAM')}
            onClick={() => togglePosition('CAM')}
          >
            {selected.includes('CAM')
              ? `${selected.indexOf('CAM') + 1}. CAM`
              : 'CAM'}
          </StyledButton>
          <StyledButton
            $top="13vh"
            $left="29vh"
            $selected={selected.includes('RAM')}
            onClick={() => togglePosition('RAM')}
          >
            {selected.includes('RAM')
              ? `${selected.indexOf('RAM') + 1}. RAM`
              : 'RAM'}
          </StyledButton>
          <StyledButton
            $top="19vh"
            $left="3vh"
            $selected={selected.includes('LM')}
            onClick={() => togglePosition('LM')}
          >
            {selected.includes('LM')
              ? `${selected.indexOf('LM') + 1}. LM`
              : 'LM'}
          </StyledButton>
          <StyledButton
            $top="19vh"
            $left="11.6vh"
            $selected={selected.includes('LCM')}
            onClick={() => togglePosition('LCM')}
          >
            {selected.includes('LCM')
              ? `${selected.indexOf('LCM') + 1}. LCM`
              : 'LCM'}
          </StyledButton>
          <StyledButton
            $top="19vh"
            $left="20.3vh"
            $selected={selected.includes('CM')}
            onClick={() => togglePosition('CM')}
          >
            {selected.includes('CM')
              ? `${selected.indexOf('CM') + 1}. CM`
              : 'CM'}
          </StyledButton>
          <StyledButton
            $top="19vh"
            $left="29vh"
            $selected={selected.includes('RCM')}
            onClick={() => togglePosition('RCM')}
          >
            {selected.includes('RCM')
              ? `${selected.indexOf('RCM') + 1}. RCM`
              : 'RCM'}
          </StyledButton>
          <StyledButton
            $top="19vh"
            $left="37.6vh"
            $selected={selected.includes('RM')}
            onClick={() => togglePosition('RM')}
          >
            {selected.includes('RM')
              ? `${selected.indexOf('RM') + 1}. RM`
              : 'RM'}
          </StyledButton>
          <StyledButton
            $top="25vh"
            $left="3vh"
            $selected={selected.includes('LWB')}
            onClick={() => togglePosition('LWB')}
          >
            {selected.includes('LWB')
              ? `${selected.indexOf('LWB') + 1}. LWB`
              : 'LWB'}
          </StyledButton>
          <StyledButton
            $top="25vh"
            $left="11.6vh"
            $selected={selected.includes('LDM')}
            onClick={() => togglePosition('LDM')}
          >
            {selected.includes('LDM')
              ? `${selected.indexOf('LDM') + 1}. LDM`
              : 'LDM'}
          </StyledButton>
          <StyledButton
            $top="25vh"
            $left="20.3vh"
            $selected={selected.includes('CDM')}
            onClick={() => togglePosition('CDM')}
          >
            {selected.includes('CDM')
              ? `${selected.indexOf('CDM') + 1}. CDM`
              : 'CDM'}
          </StyledButton>
          <StyledButton
            $top="25vh"
            $left="29vh"
            $selected={selected.includes('RDM')}
            onClick={() => togglePosition('RDM')}
          >
            {selected.includes('RDM')
              ? `${selected.indexOf('RDM') + 1}. RDM`
              : 'RDM'}
          </StyledButton>
          <StyledButton
            $top="25vh"
            $left="37.6vh"
            $selected={selected.includes('RWB')}
            onClick={() => togglePosition('RWB')}
          >
            {selected.includes('RWB')
              ? `${selected.indexOf('RWB') + 1}. RWB`
              : 'RWB'}
          </StyledButton>
          <StyledButton
            $top="31vh"
            $left="3vh"
            $selected={selected.includes('LB')}
            onClick={() => togglePosition('LB')}
          >
            {selected.includes('LB')
              ? `${selected.indexOf('LB') + 1}. LB`
              : 'LB'}
          </StyledButton>
          <StyledButton
            $top="31vh"
            $left="11.6vh"
            $selected={selected.includes('LCB')}
            onClick={() => togglePosition('LCB')}
          >
            {selected.includes('LCB')
              ? `${selected.indexOf('LCB') + 1}. LCB`
              : 'LCB'}
          </StyledButton>
          <StyledButton
            $top="31vh"
            $left="20.3vh"
            $selected={selected.includes('SW')}
            onClick={() => togglePosition('SW')}
          >
            {selected.includes('SW')
              ? `${selected.indexOf('SW') + 1}. SW`
              : 'SW'}
          </StyledButton>
          <StyledButton
            $top="31vh"
            $left="29vh"
            $selected={selected.includes('RCB')}
            onClick={() => togglePosition('RCB')}
          >
            {selected.includes('RCB')
              ? `${selected.indexOf('RCB') + 1}. RCB`
              : 'RCB'}
          </StyledButton>
          <StyledButton
            $top="31vh"
            $left="37.6vh"
            $selected={selected.includes('RB')}
            onClick={() => togglePosition('RB')}
          >
            {selected.includes('RB')
              ? `${selected.indexOf('RB') + 1}. RB`
              : 'RB'}
          </StyledButton>
          <StyledButton
            $top="37vh"
            $left="20.3vh"
            $selected={selected.includes('GK')}
            onClick={() => togglePosition('GK')}
          >
            {selected.includes('GK')
              ? `${selected.indexOf('GK') + 1}. GK`
              : 'GK'}
          </StyledButton>
        </ButtonBox>
      </FieldWrapper>
      <SubmitButton onClick={handleSubmit}>회원가입 완료</SubmitButton>
    </Container>
  );
};

export default SelectPosition;
