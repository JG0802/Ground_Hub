import styled from 'styled-components';

const Card = styled.div`
  display: flex;
  align-items: center;
  gap: 2vh;
  padding: 2vh 1.5vh;
  margin-bottom: 2vh;
  border-radius: 1vh;
  background-color: #ffffff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  transition: box-shadow 0.2s ease;
  
  &:hover {
    box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1);
  }
`;

const Logo = styled.img`
  width: 7vh;
  height: 7vh;
  border-radius: 50%;
  object-fit: cover;
  border: 1px solid #ddd;
`;

const Info = styled.div`
  flex: 1;
  cursor: pointer;
`;

const Name = styled.div`
  font-family: 'Pretendard', sans-serif;
  font-size: 2.1vh;
  font-weight: 600;
  color: #111;
`;

const Location = styled.div`
  font-size: 1.7vh;
  color: #666;
  margin-top: 0.3vh;
`;

const ColorMark = styled.div`
  width: 1.8vh;
  height: 1.8vh;
  border-radius: 50%;
  background-color: ${(props) => props.color || '#ccc'};
  margin-right: 1vh;
`;

const DeleteButton = styled.button`
  background: none;
  border: none;
  font-size: 2.2vh;
  cursor: pointer;
  color: #aaa;

  &:hover {
    color: #e74c3c;
  }
`;

const TeamCard = ({ team, onClick, onDelete }) => {
  return (
    <Card>
      <Logo src={team.logo || '/images/default-logo.png'} alt="team logo" onClick={onClick} />
      <Info onClick={onClick}>
        <Name>{team.name}</Name>
        <Location>{team.location}</Location>
      </Info>
      <ColorMark color={team.color} />
      <DeleteButton onClick={onDelete}>🗑</DeleteButton>
    </Card>
  );
};

export default TeamCard;
