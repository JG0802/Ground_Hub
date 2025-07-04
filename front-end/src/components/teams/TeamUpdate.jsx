import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import altImage from '../../img/alt_image.png';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2vh;
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  gap: 2vh;
`;

const ImagePreview = styled.img`
  width: 12vh;
  height: 12vh;
  border-radius: 50%;
  object-fit: cover;
`;

const Input = styled.input`
  width: 100%;
  padding: 1.2vh;
  border: 1px solid #ccc;
  border-radius: 0.7vh;
  font-size: 1.6vh;
`;

const Label = styled.label`
  font-size: 1.6vh;
  font-weight: bold;
`;

const Button = styled.button`
  background-color: ${(props) => (props.danger ? '#c0392b' : '#000')};
  color: white;
  padding: 1.2vh 2.4vh;
  border: none;
  border-radius: 0.7vh;
  cursor: pointer;
  font-size: 1.5vh;

  &:hover {
    background-color: ${(props) => (props.danger ? '#a93226' : '#222')};
  }
`;

const ColorDot = styled.div`
  width: 3vh;
  height: 3vh;
  border-radius: 50%;
  background-color: ${(props) => props.color};
  border: ${(props) => (props.color === 'white' ? '1px solid #333' : 'none')};
  cursor: pointer;
`;

const ColorPalette = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 3vh);
  gap: 1vh;
  padding: 1vh;
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 1vh;
  width: fit-content;
`;

const COLORS = [
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

const TeamUpdate = () => {
  const [team, setTeam] = useState(null);
  const [teamName, setTeamName] = useState('');
  const [location, setLocation] = useState('');
  const [firstColor, setFirstColor] = useState('');
  const [secondColor, setSecondColor] = useState('');
  const [logo, setLogo] = useState(null);
  const [logoFile, setLogoFile] = useState(null);
  const [showPalette, setShowPalette] = useState({ home: false, away: false });

  const teamId = sessionStorage.getItem('teamId');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTeam = async () => {
      const res = await fetch(`/api/teams/${teamId}`);
      const data = await res.json();
      setTeam(data);
      setTeamName(data.teamName);
      setLocation(data.location);
      setFirstColor(data.firstColor);
      setSecondColor(data.secondColor);
      setLogo(`http://52.78.12.127:8080/logos/${data.logo}`);
    };

    fetchTeam();
  }, [teamId]);

  const handleUpdate = async () => {
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
      alert('팀 정보 수정 완료');
      if (logoFile) {
        const formData = new FormData();
        formData.append('file', logoFile);
        await fetch(`/api/teams/${teamId}/upload-logo`, {
          method: 'POST',
          body: formData,
        });
      }
      navigate(`/team/${teamId}`);
    } else {
      alert('수정 실패');
    }
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm('정말 팀을 삭제하시겠습니까?');
    if (!confirmDelete) return;

    const res = await fetch(`/api/teams/delete-team`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ teamId: Number(teamId) }),
    });

    if (res.ok) {
      alert('삭제 완료');
      sessionStorage.removeItem('teamId');
      navigate('/main');
    } else {
      alert(await res.text());
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setLogoFile(file);
    const reader = new FileReader();
    reader.onloadend = () => setLogo(reader.result);
    reader.readAsDataURL(file);
  };

  if (!team) return <div>로딩 중...</div>;

  return (
    <Container>
      <Row>
        <label>
          <ImagePreview
            src={logo}
            onError={(e) => (e.target.src = altImage)}
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            style={{ display: 'none' }}
          />
        </label>
        <div style={{ flex: 1 }}>
          <Label>팀명</Label>
          <Input value={teamName} onChange={(e) => setTeamName(e.target.value)} />
          <Label>위치</Label>
          <Input value={location} onChange={(e) => setLocation(e.target.value)} />
        </div>
      </Row>

      <Label>HOME 컬러</Label>
      <Row>
        <ColorDot
          color={firstColor}
          onClick={() => setShowPalette({ home: !showPalette.home, away: false })}
        />
        {showPalette.home && (
          <ColorPalette>
            {COLORS.map((color) => (
              <ColorDot key={color} color={color} onClick={() => {
                setFirstColor(color);
                setShowPalette({ home: false, away: false });
              }} />
            ))}
          </ColorPalette>
        )}
      </Row>

      <Label>AWAY 컬러</Label>
      <Row>
        <ColorDot
          color={secondColor}
          onClick={() => setShowPalette({ home: false, away: !showPalette.away })}
        />
        {showPalette.away && (
          <ColorPalette>
            {COLORS.map((color) => (
              <ColorDot key={color} color={color} onClick={() => {
                setSecondColor(color);
                setShowPalette({ home: false, away: false });
              }} />
            ))}
          </ColorPalette>
        )}
      </Row>

      <Row style={{ justifyContent: 'space-between', marginTop: '3vh' }}>
        <Button onClick={() => navigate(-1)}>뒤로가기</Button>
        <div style={{ display: 'flex', gap: '1vh' }}>
          <Button onClick={handleUpdate}>팀 정보 저장</Button>
          <Button danger onClick={handleDelete}>팀 삭제</Button>
        </div>
      </Row>
    </Container>
  );
};

export default TeamUpdate;
