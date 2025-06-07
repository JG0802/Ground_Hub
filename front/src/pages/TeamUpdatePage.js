import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Line from '../components/common/Line.js';
import altImage from '../img/alt_image.png';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
`;

const Title = styled.h2`
  margin-top: 1.5vh;
  margin-bottom: 1vh;
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  gap: 1vh;
`;

const InputBox = styled.div`
  display: flex;
  justify-content: space-between;
  width: 90%;
  margin-bottom: 1vh;
  margin-left: 5%;
`;

const ImagePreview = styled.img`
  width: 10vh;
  height: 10vh;
  border-radius: 50%;
  margin: 2vh;
  object-fit: cover;
`;

const Box = styled.div`
  display: flex;
  gap: 2vh;
`;

const Label = styled.label`
  font-weight: bold;
  margin-bottom: 1vh;
`;

const Input = styled.input`
  width: 60%;
  padding: 1vh;
  border: 1px solid #ccc;
  border-radius: 0.5vh;
  margin-bottom: 1vh;
`;

const Button = styled.button`
  background-color: black;
  color: white;
  padding: 1vh 2vh;
  border: none;
  border-radius: 0.7vh;
  cursor: pointer;
  margin-bottom: 1vh;
  &:hover {
    background-color: #333;
  }
`;

const UsersBox = styled.ul`
  padding: 0;
  margin: 0;
`;
const UserBox = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #ddd;
  padding: 0.5vh 2vh;
`;

const ButtonBox = styled.div`
  display: flex;
  gap: 1vh;
`;

const ColorBox = styled.div`
  display: flex;
  justify-content: space-between;
  width: 30vh;
  align-items: center;
  position: relative;
`;

const ColorButton = styled.button`
  margin-left: 2vh;
  margin-bottom: 2vh;
  width: 3vh;
  height: 3vh;
  border-radius: 50%;
  border: none;
  background-color: ${(props) => props.color};
  opacity: ${(props) => (props.selected ? 1 : 0.4)};
`;

const ColorPalette = styled.div`
  position: absolute;
  bottom: 5.5vh;
  left: 0;
  display: grid;
  grid-template-columns: repeat(4, 3vh);
  gap: 1vh;
  background-color: white;
  border: 1px solid #ccc;
  padding: 1vh;
  border-radius: 1vh;
  z-index: 999;
`;

const ColorOption = styled.div`
  width: 3vh;
  height: 3vh;
  border-radius: 50%;
  background-color: ${(props) => props.color};
  border: ${(props) => (props.color === 'white' ? '1px solid black' : 'none')};
  cursor: pointer;
`;

const DotBox = styled.div`
  display: flex;
  align-items: center;
  gap: 1vh; /* 요소 간 간격 */
`;

const StyledText = styled.p`
  font-size: 2vh;
  margin: 0; /* 여백 제거 */
  width: 6.5vh;
  height: 4vh;
`;

const ALL_COLORS = [
  'red',
  'blue',
  'skyblue',
  'navy',
  'white',
  'black',
  'yellow',
  'orange',
  'green',
  'darkgreen',
  'maroon',
  'purple',
  'pink',
  'gray',
  'gold',
  'teal',
];

const TeamUpdatePage = () => {
  const [team, setTeam] = useState(null);
  const [users, setUsers] = useState([]);
  const [teamName, setTeamName] = useState('');
  const [location, setLocation] = useState('');
  const [firstColor, setFirstColor] = useState('');
  const [secondColor, setSecondColor] = useState('');
  const [selectedColorType, setSelectedColorType] = useState(null);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [logo, setLogo] = useState(null);
  const [logoFile, setLogoFile] = useState(null);
  const userMail = sessionStorage.getItem('userMail');
  const teamId = sessionStorage.getItem('teamId');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTeam = async () => {
      const res = await fetch(`/api/teams/${teamId}`);
      const data = await res.json();
      setTeam(data);
      console.log(data);
      setTeamName(data.teamName);
      setLocation(data.location);
      setFirstColor(data.firstColor);
      setSecondColor(data.secondColor);
      setLogo(`/logos/${data.logo}`);
    };

    const fetchUsers = async () => {
      const res = await fetch(`/api/teams/${teamId}/users-in-team`);
      const data = await res.json();
      setUsers(data.filter((user) => user.userMail !== userMail));
    };

    fetchTeam();
    fetchUsers();
  }, [teamId, userMail]);

  const handleUpdate = async () => {
    try {
      const updatedTeam = {
        ...team,
        teamName,
        location,
        firstColor,
        secondColor,
      };
      const res = await fetch('/api/teams/update-team', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedTeam),
      });
      if (res.ok) {
        alert('팀 정보가 수정되었습니다.');
        navigate(`/teams/${teamId}`);
      } else {
        alert(await res.text());
      }
    } catch (e) {
      alert('수정 실패: ' + e.message);
    }

    if (logoFile) {
      const formData = new FormData();
      formData.append('file', logoFile);
      try {
        const response = await fetch(`api/teams/${teamId}/upload-logo`, {
          method: 'POST',
          body: formData,
        });
        if (response.ok) {
        } else {
          const err = await response.text();
          alert(err || '팀 생성 실패');
        }
      } catch (error) {
        console.error('서버 요청 중 오류:', error);
        alert('서버 요청 중 문제가 발생했습니다.');
      }
    }
  };

  const handleRemove = async (mail) => {
    try {
      const res = await fetch(`/api/teams/${teamId}/remove-user`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userMail: mail }),
      });
      if (res.ok) {
        alert('선수 방출 완료');
        setUsers(users.filter((u) => u.userMail !== mail));
      } else {
        alert(await res.text());
      }
    } catch (e) {
      alert('방출 실패: ' + e.message);
    }
  };

  const handlePromote = async (newManagerMail) => {
    const updateRes = await fetch(`/api/teams/${teamId}/transfer-manager`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        currentManagerMail: userMail,
        newManagerMail: newManagerMail,
      }),
    });

    if (updateRes.ok) {
      alert('팀 매니저가 성공적으로 변경되었습니다.');
      navigate(`/teams/${teamId}`);
    } else {
      const message = await updateRes.text();
      alert(`변경 실패: ${message}`);
    }
  };

  const handleDelete = async () => {
    const teamId = sessionStorage.getItem('teamId');

    if (!teamId) {
      alert('teamId가 존재하지 않습니다.');
      return;
    }

    const confirmDelete = window.confirm(
      '정말로 팀을 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.',
    );
    if (!confirmDelete) return;

    try {
      const response = await fetch('/api/teams/delete-team', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ teamId: Number(teamId) }),
      });

      if (response.ok) {
        alert('팀이 성공적으로 삭제되었습니다.');
        sessionStorage.removeItem('teamId');
        navigate(`/main`);
      } else {
        const errorText = await response.text();
        alert('삭제 실패: ' + errorText);
      }
    } catch (error) {
      console.error('삭제 중 오류:', error);
      alert('서버 오류가 발생했습니다.');
    }
  };

  const handleMove = () => {
    navigate(`/teams/${teamId}`);
  };

  const handleSelectPaletteColor = (color) => {
    if (selectedColorType === 'home') {
      setFirstColor(color);
    } else if (selectedColorType === 'away') {
      setSecondColor(color);
    }
    setShowColorPicker(false);
    setSelectedColorType(null);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setLogoFile(file); // File 객체 저장

    const reader = new FileReader();
    reader.onloadend = () => setLogo(reader.result); // 미리보기용
    reader.readAsDataURL(file);
  };

  if (!team) return <p>로딩 중...</p>;

  return (
    <Container>
      <Title>팀 정보 수정</Title>
      <Row>
        <label>
          <ImagePreview
            src={logo}
            onError={(e) => {
              e.target.src = altImage;
            }}
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            style={{ display: 'none' }}
          />
        </label>
        <div style={{ flex: 1 }}>
          <Box>
            <Label>팀명</Label>
            <Input
              placeholder="Team Name"
              value={teamName}
              onChange={(e) => setTeamName(e.target.value)}
            />
          </Box>
          <Box>
            <Label>위치</Label>
            <Input
              placeholder="Location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </Box>
        </div>
      </Row>
      <InputBox>
        <Label>팀 컬러</Label>
        <ColorBox>
          <DotBox>
            <StyledText>HOME</StyledText>
            <ColorButton
              color={firstColor}
              selected
              onClick={() => {
                setSelectedColorType('home');
                setShowColorPicker(true);
              }}
            />
          </DotBox>
          <DotBox>
            <StyledText>AWAY</StyledText>
            <ColorButton
              color={secondColor}
              selected
              onClick={() => {
                setSelectedColorType('away');
                setShowColorPicker(true);
              }}
            />
          </DotBox>
          {showColorPicker && (
            <ColorPalette>
              {ALL_COLORS.map((color) => (
                <ColorOption
                  key={color}
                  color={color}
                  selected={
                    (selectedColorType === 'home' && firstColor === color) ||
                    (selectedColorType === 'away' && secondColor === color)
                  }
                  onClick={() => handleSelectPaletteColor(color)}
                />
              ))}
            </ColorPalette>
          )}
        </ColorBox>
      </InputBox>
      <ButtonBox style={{ margin: 'auto', marginBottom: '2vh' }}>
        <Button onClick={handleMove}>뒤로가기</Button>
        <Button onClick={handleUpdate}>팀 정보 저장</Button>
        <Button onClick={handleDelete} style={{ backgroundColor: '#c0392b' }}>
          팀 삭제하기
        </Button>
      </ButtonBox>
      <Line />
      <Title>팀원 목록</Title>
      <UsersBox>
        {users.map((user) => (
          <UserBox key={user.userMail}>
            {user.userName} ({user.userMail})
            <ButtonBox>
              <Button onClick={() => handlePromote(user.userMail)}>
                매니저 임명
              </Button>
              <Button
                onClick={() => handleRemove(user.userMail)}
                style={{ backgroundColor: '#c0392b' }}
              >
                방출
              </Button>
            </ButtonBox>
          </UserBox>
        ))}
      </UsersBox>
    </Container>
  );
};

export default TeamUpdatePage;
