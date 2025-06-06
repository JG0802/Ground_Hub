import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import styled from 'styled-components';

const PRGamesPageContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const PRGamesBox = styled.div``;

const PRGameBox = styled(Link)`
  height: 6vh;
  width: 90%;
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: 2vh 5%;
  background: #eee;
  text-decoration: none;
  border-radius: 6px;
`;

const PRGameTitle = styled.p`
  display: flex;
  align-items: center;
  margin: 0;
  margin-left: 1vh;
  color: black;
`;

const StyledButton = styled.button`
  width: 7vh;
  height: 4vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: red;
  border-radius: 6px;
  border: 1px solid black;
  &:hover {
    background-color: pink;
  }
`;

const StyledLink = styled(Link)`
  color: black;
  text-decoration: none;
  width: 70%;
  height: 5.5vh;
  background-color: black;
  color: white;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 6px;
  border: 1px solid black;
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
        console.log(data);
        // 필터링 로직
        const filtered = data.filter((prGame) => {
          const mailInData = prGame.user?.userMail?.toLowerCase();
          return mailInData?.toLowerCase() === userMail?.toLowerCase();
        });

        setData(filtered);
        console.log(filtered);
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
              style={{ marginRight: '1vh' }}
              onClick={(e) => {
                e.preventDefault(); // 링크 이동 방지
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
