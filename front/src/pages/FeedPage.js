import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
  max-width: 768px;
  padding: 2vh;
  margin: 0 auto;
  background-color: #fff;
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

const Post = styled.div`
  margin-bottom: 3vh;
  padding: 2vh;
  border-radius: 1vh;
  background-color: #f7f7f7;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.05);
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: #f0f0f0;
  }

  h3 {
    margin-bottom: 1vh;
  }

  p {
    margin: 0.5vh 0;
    font-size: 1.6vh;
  }
`;

const WriteButton = styled.button`
  position: fixed;
  bottom: 5vh;
  right: 5vw;
  width: 6vh;
  height: 6vh;
  border-radius: 50%;
  background-color: black;
  color: white;
  font-size: 3vh;
  border: none;
  cursor: pointer;
  z-index: 200;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Modal = styled.div`
  background-color: white;
  padding: 3vh 2vh;
  border-radius: 1vh;
  width: 90%;
  max-width: 400px;
`;

const InputStyle = `
  width: 90%;
  font-size: 1.6vh;
  padding: 1vh;
  margin-top: 1vh;
  border: 1px solid #ccc;
  border-radius: 0.5vh;
`;

const TitleInput = styled.textarea`
  ${InputStyle}
  height: 5vh;
`;

const Input = styled.textarea`
  ${InputStyle}
  height: 15vh;
`;

const Select = styled.select`
  ${InputStyle}
`;

const DateInput = styled.input`
  ${InputStyle}
`;

const Submit = styled.button`
  width: 100%;
  background-color: black;
  color: white;
  font-size: 1.8vh;
  padding: 1.2vh;
  border-radius: 0.7vh;
  border: none;
  margin-top: 2vh;
  cursor: pointer;

  &:hover {
    background-color: #222;
  }
`;

const TitleBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1vh;
`;

const CloseButton = styled.h3`
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
        const response = await fetch(`/api/teams/mail/${userMail}`);
        const data = await response.json();
        const filtered = data.filter(
          (team) => team.teamManager.userMail === userMail,
        );

        setTeamData(filtered);
        if (filtered.length > 0) {
          setSelectedTeam(filtered[0]);
          setTeamId(filtered[0].teamId);
        }
      } catch (err) {
        console.error('API 호출 실패:', err);
      }
    };

    const fetchCommunity = async () => {
      try {
        const response = await fetch(`/api/community/category/${category}`);
        const data = await response.json();
        setPosts(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchTeamData();
    fetchCommunity();
  }, [userMail, category]);

  const handleSubmit = async () => {
    if (!teamId || !title.trim() || !content.trim()) return alert('입력 확인');
    if (category === '매칭' && !startDate) return alert('매칭 날짜 필요');

    const body = {
      title,
      content,
      teamId: Number(teamId),
      userMail,
      category,
      matchDay: category === '매칭' ? startDate : null,
    };

    try {
      const res = await fetch('/api/community', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      if (!res.ok) throw new Error('등록 실패');

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

      {posts.map((post, index) => (
        <Post key={index} onClick={() => navigate(`/feed/${post.contentId}`)}>
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
        </Post>
      ))}

      <WriteButton onClick={() => setShowModal(true)}>+</WriteButton>

      {showModal && (
        <ModalOverlay onClick={() => setShowModal(false)}>
          <Modal onClick={(e) => e.stopPropagation()}>
            <TitleBox>
              <h3>게시글 작성</h3>
              <CloseButton onClick={() => setShowModal(false)}>X</CloseButton>
            </TitleBox>

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

            <TitleInput
              placeholder="제목을 입력하세요"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <Input
              placeholder="내용을 입력하세요"
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
