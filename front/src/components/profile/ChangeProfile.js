import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

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

const StyledButton = styled.button`
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

const PositionBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 2vh;
  margin-bottom: 4vh;
  width: 40vh;
`;

const PositionItem = styled.button`
  padding: 1.5vh 2vh;
  font-size: 2vh;
  border-radius: 1vh;
  border: 1px solid ${({ selected }) => (selected ? 'black' : '#ccc')};
  background-color: ${({ selected }) => (selected ? 'black' : 'white')};
  color: ${({ selected }) => (selected ? 'white' : 'black')};
  cursor: pointer;
  width: 8.5vh;
`;

const POSITIONS = [
  'ST',
  'LS',
  'RS',
  'LW',
  'CF',
  'RW',
  'LAM',
  'CAM',
  'RAM',
  'LM',
  'LCM',
  'CM',
  'RCM',
  'RM',
  'LWB',
  'LDM',
  'CDM',
  'RDM',
  'RWB',
  'LB',
  'LCB',
  'SW',
  'RCB',
  'RB',
  'GK',
];

const ChangeProfile = () => {
  const [userData, setUserData] = useState(null);
  const [userName, setUserName] = useState(null);
  const [userTel, setUserTel] = useState(null);
  const [selected, setSelected] = useState([]);
  const userMail = sessionStorage.getItem('userMail');
  const password = sessionStorage.getItem('password');
  const navigate = useNavigate();

  // 데이터 불러오기
  useEffect(() => {
    const fetchTeams = async () => {
      try {
        // api 주소 사용자 정보 조회하는 걸로 바꾸기
        const response = await fetch(`/api/users/check/${userMail}`);
        if (response.ok) {
          const data = await response.json();
          setUserData(data); // 화면에 보여주기 위해 저장
          setUserName(data.userName);
          setUserTel(data.tel);
          setSelected(
            [
              data.firstPosition,
              data.secondPosition,
              data.thirdPosition,
            ].filter(Boolean),
          ); // 혹시 null/undefined 방지
        } else {
          alert(await response.text());
        }
      } catch (err) {
        console.error(err);
        alert('서버와의 통신 중 오류가 발생했습니다.');
      }
    };

    fetchTeams();
  }, [userMail]);

  const togglePosition = (position) => {
    if (selected.includes(position)) {
      setSelected(selected.filter((p) => p !== position));
    } else if (selected.length < 3) {
      setSelected([...selected, position]);
    } else {
      alert('최대 3개까지 선택 가능합니다.');
    }
  };

  const changeInfo = async () => {
    if (!userName || !userTel) {
      alert('정보를 다 입력하세요.');
      return;
    }
    if (selected.length !== 3) {
      alert('포지션을 3개 선택해주세요.');
      return;
    }

    try {
      const response = await fetch('/api/users/update', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userMail: userMail,
          password: password,
          userName: userName,
          tel: userTel,
          firstPosition: selected[0],
          secondPosition: selected[1],
          thirdPosition: selected[2],
        }),
      });

      if (response.ok) {
        alert('회원정보 수정 완료!');
        navigate('/profile');
      } else {
        const err = await response.text();
        alert(err || '포지션 설정 실패');
      }
    } catch (error) {
      console.error('서버 요청 중 오류:', error);
      alert('서버 요청 중 문제가 발생했습니다.');
    }
  };

  if (!userData) {
    return <Container>Loading...</Container>;
  }

  return (
    <Container>
      <Title>회원 정보 변경</Title>
      <StyledInput
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
      />
      <StyledInput
        type="tel"
        value={userTel}
        onChange={(e) => setUserTel(e.target.value)}
      />
      <Subtitle>선호 포지션을 3개 선택하세요</Subtitle>
      <PositionBox>
        {POSITIONS.map((pos) => (
          <PositionItem
            key={pos}
            onClick={() => togglePosition(pos)}
            selected={selected.includes(pos)}
          >
            {pos}
          </PositionItem>
        ))}
      </PositionBox>
      <StyledButton onClick={changeInfo}>회원정보 변경</StyledButton>
    </Container>
  );
};

export default ChangeProfile;
