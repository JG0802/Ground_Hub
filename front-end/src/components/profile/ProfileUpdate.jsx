import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import field from '../../img/field.png';

const Container = styled.div`
  padding: 3vh 2vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h2`
  font-size: 2.4vh;
  font-weight: bold;
  margin-bottom: 4vh;
`;

const StyledSummitButton = styled.button`
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
`;

const StyledInput = styled.input`
  width: 40vh;
  height: 6vh;
  font-size: 2vh;
  border-radius: 0.7vh;
  border: 1px solid #b9b9b9;
  padding: 1vh;
  margin-bottom: 2vh;
  box-sizing: border-box;
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

const POSITIONS = [
  { code: 'ST', top: '1vh', left: '20.3vh' },
  { code: 'LS', top: '4vh', left: '11.6vh' },
  { code: 'RS', top: '4vh', left: '29vh' },
  { code: 'LW', top: '7vh', left: '3.6vh' },
  { code: 'CF', top: '7vh', left: '20.3vh' },
  { code: 'RW', top: '7vh', left: '37.6vh' },
  { code: 'LAM', top: '13vh', left: '11.6vh' },
  { code: 'CAM', top: '13vh', left: '20.3vh' },
  { code: 'RAM', top: '13vh', left: '29vh' },
  { code: 'LM', top: '19vh', left: '3vh' },
  { code: 'LCM', top: '19vh', left: '11.6vh' },
  { code: 'CM', top: '19vh', left: '20.3vh' },
  { code: 'RCM', top: '19vh', left: '29vh' },
  { code: 'RM', top: '19vh', left: '37.6vh' },
  { code: 'LWB', top: '25vh', left: '3vh' },
  { code: 'LDM', top: '25vh', left: '11.6vh' },
  { code: 'CDM', top: '25vh', left: '20.3vh' },
  { code: 'RDM', top: '25vh', left: '29vh' },
  { code: 'RWB', top: '25vh', left: '37.6vh' },
  { code: 'LB', top: '31vh', left: '3vh' },
  { code: 'LCB', top: '31vh', left: '11.6vh' },
  { code: 'SW', top: '31vh', left: '20.3vh' },
  { code: 'RCB', top: '31vh', left: '29vh' },
  { code: 'RB', top: '31vh', left: '37.6vh' },
  { code: 'GK', top: '37vh', left: '20.3vh' },
];

const ProfileUpdate = () => {
  const [userName, setUserName] = useState('');
  const [userTel, setUserTel] = useState('');
  const [selected, setSelected] = useState([]);
  const userMail = sessionStorage.getItem('userMail');
  const password = sessionStorage.getItem('password');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(`/api/users/check/${userMail}`);
        if (!res.ok) throw new Error('유저 정보를 불러올 수 없습니다.');
        const data = await res.json();
        setUserName(data.userName);
        setUserTel(data.tel);
        setSelected([
          data.firstPosition,
          data.secondPosition,
          data.thirdPosition,
        ].filter(Boolean));
      } catch (err) {
        alert(err.message);
      }
    };
    fetchUser();
  }, [userMail]);

  const togglePosition = (pos) => {
    if (selected.includes(pos)) {
      setSelected(selected.filter((p) => p !== pos));
    } else if (selected.length < 3) {
      setSelected([...selected, pos]);
    } else {
      alert('포지션은 최대 3개까지 선택 가능합니다.');
    }
  };

  const handleSubmit = async () => {
    if (!userName || !userTel || selected.length !== 3) {
      alert('모든 항목을 입력하고 포지션 3개를 선택하세요.');
      return;
    }

    try {
      const res = await fetch('/api/users/update', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userMail,
          password,
          userName,
          tel: userTel,
          firstPosition: selected[0],
          secondPosition: selected[1],
          thirdPosition: selected[2],
        }),
      });

      if (res.ok) {
        alert('회원 정보가 수정되었습니다.');
        navigate('/profile');
      } else {
        alert(await res.text());
      }
    } catch (err) {
      console.error(err);
      alert('서버와의 통신 중 문제가 발생했습니다.');
    }
  };

  return (
    <Container>
      <Title>회원 정보 수정</Title>
      <StyledInput
        placeholder="이름"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
      />
      <StyledInput
        placeholder="전화번호"
        value={userTel}
        onChange={(e) => setUserTel(e.target.value)}
      />
      <Subtitle>선호 포지션 (3개 선택)</Subtitle>
      <FieldWrapper>
        <ButtonBox>
          {POSITIONS.map(({ code, top, left }) => (
            <StyledButton
              key={code}
              $top={top}
              $left={left}
              $selected={selected.includes(code)}
              onClick={() => togglePosition(code)}
            >
              {selected.includes(code)
                ? `${selected.indexOf(code) + 1}. ${code}`
                : code}
            </StyledButton>
          ))}
        </ButtonBox>
      </FieldWrapper>
      <StyledSummitButton onClick={handleSubmit}>
        회원정보 변경
      </StyledSummitButton>
    </Container>
  );
};

export default ProfileUpdate;
