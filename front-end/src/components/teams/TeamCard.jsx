import styled from 'styled-components';
import { Link } from 'react-router-dom';
import altImage from '../../img/alt_image.png';

const Card = styled.div`
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  display: flex;
  align-items: flex-start;
  padding: 2vh;
  margin-bottom: 2vh;
`;

const TeamLogo = styled.img`
  width: 8vh;
  height: 8vh;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 2vh;
`;

const Info = styled.div`
  flex: 1;
`;

const TeamName = styled.div`
  font-size: 1.9vh;
  font-weight: bold;
  margin-bottom: 1vh;
`;

const TagRow = styled.div`
  font-size: 1.5vh;
  color: #555;
  margin-bottom: 0.5vh;
`;

const Tag = styled.span`
  background-color: #ddd;
  color: #222;
  font-size: 1.3vh;
  padding: 0.2vh 1vh;
  border-radius: 1vh;
  margin-right: 0.7vh;
`;

const ColorColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 1vh;
`;

const DotRow = styled.div`
  display: flex;
  align-items: center;
  gap: 1vh;
`;

const Dot = styled.div`
  width: 2vh;
  height: 2vh;
  border-radius: 50%;
  background-color: ${(props) => props.color};
  border: ${(props) =>
    props.color === 'white' ? '1px solid black' : `1px solid ${props.color}`};
`;

const DotLabel = styled.div`
  font-size: 1.5vh;
  width: 5vh;
  text-align: right;
`;

const TeamCard = ({ team }) => {
  return (
    <Link
      to={`/team/${team.teamId}`}
      style={{ textDecoration: 'none', color: 'inherit' }}
    >
      <Card>
        <TeamLogo
          src={`http://52.78.12.127:8080/logos/${team.logo}`}
          onError={(e) => {
            e.target.src = altImage;
          }}
        />
        <Info>
          <TeamName>{team.teamName}</TeamName>
          <TagRow>
            <Tag>회원</Tag> {team.users.length}명
          </TagRow>
          <TagRow>
            <Tag>위치</Tag> {team.location}
          </TagRow>
        </Info>
        <ColorColumn>
          <DotRow>
            <DotLabel>HOME</DotLabel>
            <Dot color={team.firstColor} />
          </DotRow>
          <DotRow>
            <DotLabel>AWAY</DotLabel>
            <Dot color={team.secondColor} />
          </DotRow>
        </ColorColumn>
      </Card>
    </Link>
  );
};

export default TeamCard;
