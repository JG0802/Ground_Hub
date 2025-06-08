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

const TeamCreateModal = ({ onClose, onCreate }) => {
  const userMail = sessionStorage.getItem('userMail');
  const [teamName, setTeamName] = useState('');
  const [location, setLocation] = useState('');
  const [logo, setLogo] = useState(null);
  const [homeColor, setHomeColor] = useState('red');
  const [awayColor, setAwayColor] = useState('black');
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [selectedColorType, setSelectedColorType] = useState(null); // 'home' or 'away'
  const [logoFile, setLogoFile] = useState(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setLogoFile(file); // File 객체 저장

    const reader = new FileReader();
    reader.onloadend = () => setLogo(reader.result); // 미리보기용
    reader.readAsDataURL(file);
  };

  const handleCreate = async () => {
    let data;
    try {
      const response = await fetch(`/api/users/check/${userMail}`, {
        method: 'GET',
      });

      if (response.ok) {
        data = await response.json();
      } else {
        const err = await response.text();
        console.log(err);
        alert(err || '팀 생성 실패');
      }
    } catch (error) {
      console.error('서버 요청 중 오류:', error);
      alert('서버 요청 중 문제가 발생했습니다.');
    }
    if (!teamName || !location) {
      alert('팀명과 위치는 필수입니다.');
      return;
    }

    if (homeColor === awayColor) {
      alert('두 유니폼의 색상은 달라야합니다.');
      return;
    }
    let finalLogoFile = logoFile;

    if (!logoFile) {
      try {
        const response = await fetch(altImage);
        const blob = await response.blob();
        finalLogoFile = new File([blob], 'default-logo.png', {
          type: blob.type,
        });
      } catch (err) {
        console.error('기본 로고 로딩 실패:', err);
        alert('기본 로고 파일을 불러오는 데 실패했습니다.');
        return;
      }
    }

    const newTeam = {
      teamManager: data,
      teamName,
      location,
      firstColor: homeColor,
      secondColor: awayColor,
    };

    onCreate(newTeam, finalLogoFile);
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
                      selected={
                        (selectedColorType === 'home' && homeColor === color) ||
                        (selectedColorType === 'away' && awayColor === color)
                      }
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
