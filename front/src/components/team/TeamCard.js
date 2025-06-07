import styled from 'styled-components';

const Card = styled.div`
  display: flex;
  align-items: center;
  gap: 2vh;
  padding: 1.5vh;
  margin-bottom: 2vh;
  border-radius: 1vh;
  background-color: #f8f8f8;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
`;

const Logo = styled.img`
  width: 6vh;
  height: 6vh;
  border-radius: 50%;
  object-fit: cover;
`;

const Info = styled.div`
  flex: 1;
`;

const Name = styled.div`
  font-size: 2vh;
  font-weight: bold;
`;

const Location = styled.div`
  font-size: 1.6vh;
  color: #666;
`;

const ColorMark = styled.div`
  width: 2vh;
  height: 2vh;
  border-radius: 50%;
  background-color: ${(props) => props.color || '#ccc'};
`;

const DeleteButton = styled.button`
  background: none;
  border: none;
  font-size: 2.5vh;
  cursor: pointer;
  color: #999;
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
