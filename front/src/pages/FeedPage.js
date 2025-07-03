import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
  padding: 8vh 2vw 10vh;
  max-width: 768px;
  margin: 0 auto;
  background-color: #f9f9f9;
`;

const NavTabs = styled.div`
  display: flex;
  justify-content: space-around;
  margin-bottom: 2vh;
  border-bottom: 1px solid #ccc;
`;

const Tab = styled.div`
  font-size: 2vh;
  font-weight: ${({ active }) => (active ? 'bold' : 'normal')};
  padding: 1vh 2vh;
  border-bottom: ${({ active }) => (active ? '3px solid black' : 'none')};
  cursor: pointer;
`;

const PostCard = styled.div`
  background-color: #ffffff;
  border-radius: 12px;
  padding: 2vh 2vw;
  margin-bottom: 2vh;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  cursor: pointer;
  transition: 0.2s;

  &:hover {
    background-color: #f3f3f3;
  }

  h3 {
    font-size: 2vh;
    margin-bottom: 1vh;
  }

  p {
    font-size: 1.6vh;
    margin: 0.5vh 0;
    line-height: 1.5;
  }
`;

const WriteButton = styled.button`
  position: fixed;
  bottom: 7vh;
  right: calc(clamp(1vh, (100vw - 50vh) / 2 + 1vh, 100vw));
  width: 6vh;
  height: 6vh;
  font-size: 3vh;
  background-color: black;
  color: white;
  border-radius: 50%;
  border: none;
  cursor: pointer;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
  z-index: 1000;
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5); /* ✔ 어둡게 */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999; /* ✔ 충분히 큰 값으로 */
`;

const Modal = styled.div`
  background-color: white;
  border-radius: 12px;
  padding: 3vh 2vh;
  width: 90%;
  max-width: 400px;
  z-index: 10000; /* ✔ 위에 오도록 */
  position: relative;
`;

const TitleRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2vh;
`;

const ModalTitle = styled.h3`
  font-size: 2vh;
  margin: 0;
`;

const CloseButton = styled.button`
  font-size: 2vh;
  background: none;
  border: none;
  cursor: pointer;
`;

const sharedInputStyle = `
  width: 100%;
  font-size: 1.6vh;
  padding: 1vh;
  margin: 1vh 0;
  border: 1px solid #ccc;
  border-radius: 0.5vh;
  box-sizing: border-box;
`;

const Input = styled.textarea`
  ${sharedInputStyle}
  height: 10vh;
  resize: none;
`;

const Select = styled.select`
  ${sharedInputStyle}
  appearance: none;
  background-color: #fff;
  z-index: 1002; /* 드롭다운 가림 방지 */
  position: relative;
`;

const DateInput = styled.input`
  width: 100%;
  font-size: 1.6vh;
  padding: 1vh;
  margin: 1vh 0;
  border: 1px solid #ccc;
  border-radius: 0.5vh;
  box-sizing: border-box;
  background-color: #fff;
  appearance: none;

  &:focus {
    outline: none;
    border-color: black;
  }
`;

const Submit = styled.button`
  width: 100%;
  background-color: black;
  color: white;
  font-size: 1.8vh;
  padding: 1.2vh;
  border-radius: 1vh;
  border: none;
  cursor: pointer;
`;

const FeedPage = () => {
  const [showModal, setShowModal] = useState(false);
  const userMail = sessionStorage.getItem('userMail');
  const [teamData, setTeamData] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState('');
  const [teamId, setTeamId] = useState('');
  const [category, setCategory] = useState('매칭');
  const [startDate, setStartDate] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!userMail) return;

    const fetchTeamData = async () => {
      try {
        const res = await fetch(`/api/teams/mail/${userMail}`);
        const data = await res.json();
        const filtered = data.filter(
          (team) => team.teamManager.userMail === userMail,
        );
        setTeamData(filtered);
        if (filtered.length > 0) {
          setSelectedTeam(filtered[0]);
          setTeamId(filtered[0].teamId);
        }
      } catch (err) {
        console.error('팀 정보 오류:', err);
      }
    };

    const fetchCommunity = async () => {
      try {
        const res = await fetch(`/api/community/category/${category}`);
        const data = await res.json();
        setPosts(data);
      } catch (err) {
        console.error('커뮤니티 불러오기 실패:', err);
      }
    };

    fetchTeamData();
    fetchCommunity();
  }, [userMail, category]);

  const handleSubmit = async () => {
    if (!teamId || !title.trim() || !content.trim()) return alert('입력 누락');
    if (category === '매칭' && !startDate) return alert('날짜 필요');
    const date = new Date();
    const formattedDate = date.toISOString().slice(0, 19);

    const body = {
      title,
      content,
      teamId: Number(teamId),
      userMail,
      category,
      matchDay: category === '매칭' ? startDate : formattedDate,
    };

    try {
      const res = await fetch('/api/community', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      if (!res.ok) throw new Error();
      alert('등록 완료!');
      window.location.reload();
    } catch (err) {
      alert('오류 발생');
      console.error(err);
    }
  };

  return (
    <Container>
      <NavTabs>
        {['매칭', '팀원 모집'].map((tab) => (
          <Tab
            key={tab}
            active={category === tab}
            onClick={() => setCategory(tab)}
          >
            {tab}
          </Tab>
        ))}
      </NavTabs>

      {posts.map((post) => (
        <PostCard
          key={post.contentId}
          onClick={() => navigate(`/feed/${post.contentId}`)}
        >
          <h3>{post.title}</h3>
          <p>
            <strong>팀 이름:</strong> {post.team.teamName}
          </p>
          <p>
            <strong>지역:</strong> {post.team.location}
          </p>
          <p>
            <strong>작성일:</strong> {post.createTime.slice(0, 10)}
          </p>
          {post.category === '매칭' && post.matchDay && (
            <p>
              <strong>매칭 날짜:</strong>{' '}
              {post.matchDay.replace('T', ' ').slice(0, 16)}
            </p>
          )}
          <p>
            <strong>내용:</strong> {post.content}
          </p>
          <p>
            <strong>조회수:</strong> {post.views}
          </p>
        </PostCard>
      ))}

      <WriteButton onClick={() => setShowModal(true)}>+</WriteButton>

      {showModal && (
        <ModalOverlay onClick={() => setShowModal(false)}>
          <Modal onClick={(e) => e.stopPropagation()}>
            <TitleRow>
              <ModalTitle>게시글 작성</ModalTitle>
              <CloseButton onClick={() => setShowModal(false)}>✖</CloseButton>
            </TitleRow>

            <Select
              value={selectedTeam?.teamName || ''}
              onChange={(e) => {
                const team = teamData.find(
                  (t) => t.teamName === e.target.value,
                );
                setSelectedTeam(team);
                setTeamId(team.teamId);
              }}
            >
              {teamData.map((team) => (
                <option key={team.teamId} value={team.teamName}>
                  {team.teamName}
                </option>
              ))}
            </Select>

            <Select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="매칭">매칭</option>
              <option value="팀원 모집">팀원 모집</option>
            </Select>

            {category === '매칭' && (
              <DateInput
                type="datetime-local"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            )}

            <Input
              as="input"
              placeholder="제목 입력"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <Input
              placeholder="내용 입력"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
            <Submit onClick={handleSubmit}>등록</Submit>
          </Modal>
        </ModalOverlay>
      )}
    </Container>
  );
};

export default FeedPage;
