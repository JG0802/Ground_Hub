import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import styled from 'styled-components';

const PRGamesPageContainer = styled.div`
  padding: 8vh 2vw 10vh;
  max-width: 768px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  background-color: #f9f9f9;
`;

const PRGamesBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2vh;
`;

const PRGameBox = styled(Link)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5vh 2vh;
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 10px;
  text-decoration: none;
  color: black;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.06);
  transition: background-color 0.2s;

  &:hover {
    background-color: #f1f1f1;
  }
`;

const PRGameTitle = styled.p`
  font-size: 1.8vh;
  margin: 0;
  font-weight: 500;
`;

const StyledButton = styled.button`
  padding: 0.7vh 1.2vh;
  font-size: 1.5vh;
  background-color: #e74c3c;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #c0392b;
  }
`;

const StyledLink = styled(Link)`
  margin-top: 4vh;
  text-align: center;
  width: 80%;
  height: 5.5vh;
  line-height: 5.5vh;
  background-color: black;
  color: white;
  font-size: 1.7vh;
  font-weight: bold;
  border-radius: 10px;
  text-decoration: none;
  align-self: center;

  &:hover {
    background-color: #222;
  }
`;

const PRGamesPage = () => {
  const { prGameId } = useParams();
  const userMail = sessionStorage.getItem('userMail');
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchGame = async () => {
      try {
        const res = await fetch(`/api/pr-games/findByGameId/${prGameId}`);

        if (!res.ok) {
          throw new Error('서버 응답 오류');
        }
        const data = await res.json();
        const filtered = data.filter((prGame) => {
          const mailInData = prGame.user?.userMail?.toLowerCase();
          return mailInData?.toLowerCase() === userMail?.toLowerCase();
        });
        setData(filtered);
      } catch (err) {
        console.error('PRGame 불러오기 오류:', err);
      }
    };

    if (prGameId) fetchGame();
  }, [prGameId, userMail]);

  const handleDeleteGame = async (prGameId) => {
    try {
      const res = await fetch(`/api/pr-games/remove/${prGameId}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        alert('삭제 성공!');
        window.location.reload();
      } else {
        console.error(res);
      }
    } catch (err) {
      console.log(err);
    }
  };

  if (!data) return <p>... 로딩중 ...</p>;

  return (
    <PRGamesPageContainer>
      <PRGamesBox>
        {data.map((game, index) => (
          <PRGameBox
            key={index}
            to={{
              pathname: `/user/pr/${game.prGameId}`,
              state: { prGame: game },
            }}
          >
            <PRGameTitle>{game.prGameName}</PRGameTitle>
            <StyledButton
              onClick={(e) => {
                e.preventDefault();
                handleDeleteGame(game.prGameId);
              }}
            >
              🗑️
            </StyledButton>
          </PRGameBox>
        ))}
      </PRGamesBox>
      <StyledLink to={'/pr/create'}>포메이션 생성</StyledLink>
    </PRGamesPageContainer>
  );
};

export default PRGamesPage;
