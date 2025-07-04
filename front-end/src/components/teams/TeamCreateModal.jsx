import { useState } from 'react';
import styled from 'styled-components';
import altImage from '../../img/alt_image.png';

const Overlay = styled.div`
  position: fixed;
  bottom: 5vh;
  left: 50%;
  transform: translateX(-50%);
  width: 50vh;
  max-width: 100vw;
  background-color: #f4f4f4;
  border-top-left-radius: 2vh;
  border-top-right-radius: 2vh;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
  z-index: 1000;
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  gap: 1vh;
`;

const ImagePreview = styled.img`
  width: 10vh;
  height: 10vh;
  border-radius: 50%;
  margin: 2vh;
  object-fit: cover;
`;

const Input = styled.input`
  font-size: 1.8vh;
  padding: 1vh;
  margin: 0.5vh;
  width: 80%;
  border-radius: 1vh;
  border: 1px solid #ccc;
`;

const ButtonBox = styled.div`
  display: flex;
  justify-content: space-between;
  width: 90%;
`;

const ColorBox = styled.div`
  display: flex;
  justify-content: space-between;
  width: 25%;
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
  border: ${(props) => (props.color === 'white' ? '1px solid black' : 'none')};
`;

const CreateButton = styled.button`
  margin-left: 2vh;
  margin-bottom: 2vh;
  height: 4.3vh;
  background-color: black;
  color: white;
  font-size: 2vh;
  padding: 1vh 2vh;
  border: none;
  border-radius: 1vh;
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

const ALL_COLORS = [
  'red', 'blue', 'skyblue', 'navy', 'white', 'black', 'yellow', 'orange',
  'green', 'darkgreen', 'maroon', 'purple', 'pink', 'gray', 'gold', 'teal',
];

const TeamCreateModal = ({ onClose, onSuccess }) => {
  const userMail = sessionStorage.getItem('userMail');
  const [teamName, setTeamName] = useState('');
  const [location, setLocation] = useState('');
  const [logo, setLogo] = useState(null);
  const [logoFile, setLogoFile] = useState(null);
  const [homeColor, setHomeColor] = useState('red');
  const [awayColor, setAwayColor] = useState('black');
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [selectedColorType, setSelectedColorType] = useState(null); // 'home' or 'away'

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setLogoFile(file);
    const reader = new FileReader();
    reader.onloadend = () => setLogo(reader.result);
    reader.readAsDataURL(file);
  };

  const handleSelectPaletteColor = (color) => {
    if (selectedColorType === 'home') {
      setHomeColor(color);
    } else if (selectedColorType === 'away') {
      setAwayColor(color);
    }
    setShowColorPicker(false);
    setSelectedColorType(null);
  };

  const handleCreate = async () => {
    if (!teamName || !location) {
      alert('팀명과 위치는 필수입니다.');
      return;
    }

    if (homeColor === awayColor) {
      alert('두 유니폼 색상은 달라야 합니다.');
      return;
    }

    let userData;
    try {
      const response = await fetch(`/api/users/check/${userMail}`);
      if (response.ok) {
        userData = await response.json();
      } else {
        alert(await response.text());
        return;
      }
    } catch (err) {
      console.error(err);
      alert('유저 정보 조회 실패');
      return;
    }

    let finalLogoFile = logoFile;
    if (!finalLogoFile) {
      try {
        const response = await fetch(altImage);
        const blob = await response.blob();
        finalLogoFile = new File([blob], 'default-logo.png', { type: blob.type });
      } catch (err) {
        console.error(err);
        alert('기본 로고 파일 불러오기 실패');
        return;
      }
    }

    const newTeam = {
      teamManager: userData,
      teamName,
      location,
      firstColor: homeColor,
      secondColor: awayColor,
    };

    try {
      const formData = new FormData();
      formData.append('team', new Blob([JSON.stringify(newTeam)], { type: 'application/json' }));
      formData.append('logo', finalLogoFile);

      const response = await fetch('/api/teams/create-team', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        alert('팀 생성 완료!');
        onClose();
        if (onSuccess) onSuccess();
      } else {
        alert(await response.text() || '팀 생성 실패');
      }
    } catch (error) {
      console.error('팀 생성 중 오류:', error);
      alert('서버 요청 중 문제가 발생했습니다.');
    }
  };

  return (
    <Overlay onClick={onClose}>
      <div onClick={(e) => e.stopPropagation()}>
        <Row>
          <label>
            <ImagePreview
              src={logo || '/images/default-logo.png'}
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
            <Input
              placeholder="Team Name"
              value={teamName}
              onChange={(e) => setTeamName(e.target.value)}
            />
            <Input
              placeholder="Location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>
        </Row>
        <Row>
          <ButtonBox>
            <ColorBox>
              <div>
                <ColorButton
                  color={homeColor}
                  selected
                  onClick={() => {
                    setSelectedColorType('home');
                    setShowColorPicker(true);
                  }}
                />
              </div>
              <div>
                <ColorButton
                  color={awayColor}
                  selected
                  onClick={() => {
                    setSelectedColorType('away');
                    setShowColorPicker(true);
                  }}
                />
              </div>
              {showColorPicker && (
                <ColorPalette>
                  {ALL_COLORS.map((color) => (
                    <ColorOption
                      key={color}
                      color={color}
                      onClick={() => handleSelectPaletteColor(color)}
                    />
                  ))}
                </ColorPalette>
              )}
            </ColorBox>
            <CreateButton onClick={handleCreate}>Create</CreateButton>
          </ButtonBox>
        </Row>
      </div>
    </Overlay>
  );
};

export default TeamCreateModal;
