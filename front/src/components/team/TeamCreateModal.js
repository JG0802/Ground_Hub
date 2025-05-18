import { useState } from 'react';
import styled from 'styled-components';

const Overlay = styled.div`
  position: fixed;
  bottom: 56px; /* BottomTab 위에 떠 있도록 설정 */
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  max-width: 430px;
  background-color: #f4f4f4;
  padding: 2vh;
  border-top-left-radius: 2vh;
  border-top-right-radius: 2vh;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
  z-index: 1000; /* TabBar의 z-index 999보다 크도록 */
`;



const Row = styled.div`
  display: flex;
  align-items: center;
  gap: 1vh;
  margin-bottom: 2vh;
`;

const ImagePreview = styled.img`
  width: 10vh;
  height: 10vh;
  border-radius: 50%;
  object-fit: cover;
`;

const Input = styled.input`
  font-size: 1.8vh;
  padding: 1vh;
  width: 100%;
  border-radius: 1vh;
  border: 1px solid #ccc;
`;

const ColorButton = styled.button`
  width: 3vh;
  height: 3vh;
  border-radius: 50%;
  border: none;
  background-color: ${(props) => props.color};
  opacity: ${(props) => (props.selected ? 1 : 0.4)};
`;

const LockButton = styled.button`
  background: none;
  border: none;
  font-size: 2.5vh;
  cursor: pointer;
`;

const CreateButton = styled.button`
  background-color: black;
  color: white;
  font-size: 2vh;
  padding: 1vh 2vh;
  border: none;
  border-radius: 1vh;
`;

const TeamCreateModal = ({ onClose, onCreate }) => {
  const [teamName, setTeamName] = useState('');
  const [location, setLocation] = useState('');
  const [logo, setLogo] = useState(null);
  const [colors, setColors] = useState(['#f44336', '#000000']);
  const [selectedColor, setSelectedColor] = useState('#f44336');
  const [isPrivate, setIsPrivate] = useState(true);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => setLogo(reader.result);
    reader.readAsDataURL(file);
  };

  const handleCreate = () => {
  if (!teamName || !location) {
    alert('팀명과 위치는 필수입니다.');
    return;
  }

  const newTeam = {
    name: teamName,
    location,
    logo: logo || '/img/logo.png', // 로고가 없으면 기본 이미지 사용
    color: selectedColor,
    isPrivate,
  };

  onCreate(newTeam);
};

  return (
    <Overlay onClick={onClose}>
      <div onClick={(e) => e.stopPropagation()}>
        <Row>
          <label>
            <ImagePreview src={logo || '/images/default-logo.png'} alt="logo" />
            <input type="file" accept="image/*" onChange={handleImageUpload} style={{ display: 'none' }} />
          </label>
          <div style={{ flex: 1 }}>
            <Input placeholder="Team Name" value={teamName} onChange={(e) => setTeamName(e.target.value)} />
            <Input placeholder="Location" value={location} onChange={(e) => setLocation(e.target.value)} />
          </div>
        </Row>

        <Row>
          {colors.map((color) => (
            <ColorButton
              key={color}
              color={color}
              selected={selectedColor === color}
              onClick={() => setSelectedColor(color)}
            />
          ))}
          <LockButton onClick={() => setIsPrivate((prev) => !prev)}>
            {isPrivate ? '🔒' : '🔓'}
          </LockButton>
          <CreateButton onClick={handleCreate}>Create</CreateButton>
        </Row>
      </div>
    </Overlay>
  );
};

export default TeamCreateModal;
