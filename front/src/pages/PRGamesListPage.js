import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

const PRGamesListPageContainer = styled.div`
  padding: 7vh 2vw 10vh;
  max-width: 768px;
  margin: 0 auto;
  background-color: #f9f9f9;
`;

const PRGamesListBox = styled.div`
  margin-bottom: 4vh;
`;

const PRGameBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5vh 2vh;
  margin-bottom: 2vh;
  border-radius: 1vh;
  background-color: #eee;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
`;

const GameNameLink = styled(Link)`
  text-decoration: none;
  color: black;
  font-size: 1.7vh;
  font-weight: 500;
  flex: 1;
`;

const DeleteButton = styled.button`
  width: 6vh;
  height: 3.5vh;
  background-color: #c0392b;
  color: white;
  font-size: 1.6vh;
  border: none;
  border-radius: 0.7vh;
  cursor: pointer;

  &:hover {
    background-color: #e74c3c;
  }
`;

const CreateLink = styled(Link)`
  display: block;
  width: 100%;
  padding: 1.8vh 0;
  text-align: center;
  font-size: 1.8vh;
  background-color: black;
  color: white;
  border-radius: 1vh;
  text-decoration: none;
  font-weight: 600;
  margin-top: 4vh;
`;

const PRGamesListPage = () => {
  const { gameId } = useParams();
  const userMail = sessionStorage.getItem('userMail');
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchGame = async () => {
      try {
        const res = await fetch(`/api/pr-games/findByGameId/${gameId}`);
        if (!res.ok) throw new Error('서버 응답 오류');
        const data = await res.json();
        setData(data);
      } catch (err) {
        console.error('PRGame 불러오기 오류:', err);
      }
    };

    if (gameId) fetchGame();
  }, [gameId, userMail]);

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
    <PRGamesListPageContainer>
      <PRGamesListBox>
        {data.map((game) => (
          <PRGameBox key={game.prGameId}>
            <GameNameLink to={`/pr/check/${game.prGameId}`}>
              {game.prGameName}
            </GameNameLink>
            <DeleteButton onClick={() => handleDeleteGame(game.prGameId)}>
              🗑️
            </DeleteButton>
          </PRGameBox>
        ))}
      </PRGamesListBox>
      <CreateLink to={'/pr/create'}>포메이션 생성</CreateLink>
    </PRGamesListPageContainer>
  );
};

export default PRGamesListPage;
