import { Link } from 'react-router-dom';
import styled from 'styled-components';
import altImage from '../../img/alt_image.png';

const Card = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2vh;
  border-radius: 1.5vh;
  margin-bottom: 3vh;
  background-color: #fff;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
  border: 1.5px solid transparent;

  &:hover {
    border: 1.5px solid #00c264;
  }
`;

const Team = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Logo = styled.img`
  width: 7vh;
  height: 7vh;
  border-radius: 50%;
  object-fit: cover;
`;

const Name = styled.div`
  font-size: 1.6vh;
  font-weight: bold;
  margin-top: 0.5vh;
  text-align: center;
  max-width: 12vh;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Middle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1vh;
  font-weight: bold;
`;

const MyCalender = ({ game }) => {
  return (
    <Link to={`/game/${game.gameId}`} style={{ textDecoration: 'none', color: 'inherit' }}>
      <Card>
        <Team>
          <Logo src={`http://52.78.12.127:8080/logos/${game.team.logo}`} onError={(e) => { e.target.src = altImage; }} />
          <Name>{game.team.teamName}</Name>
        </Team>

        <Middle>
          <div style={{ fontSize: '3vh' }}>VS</div>
          <div style={{ fontSize: '1.4vh', color: '#666' }}>{game.date.slice(0, 10)}</div>
        </Middle>

        <Team>
          <Logo src={`/logos/${game.logo}`} onError={(e) => { e.target.src = altImage; }} />
          <Name>{game.gameName}</Name>
        </Team>
      </Card>
    </Link>
  );
};

export default MyCalender;
