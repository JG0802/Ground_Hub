import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import altImage from '../img/alt_image.png';

// ✅ Styled Components
const Container = styled.div`
  max-width: 768px;
  margin: 2vh auto;
  padding-top: 8vh;
`;

const Card = styled.div`
  background: #fff;
  padding: 3vh;
  border-radius: 1vh;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const Heading = styled.h2`
  font-size: 3vh;
  margin-bottom: 2vh;
`;

const InfoText = styled.p`
  font-size: 1.8vh;
  margin: 1vh 0;
`;

const Divider = styled.hr`
  margin: 2vh 0;
  border: none;
  border-top: 1px solid #ccc;
`;

const Content = styled.p`
  font-size: 2vh;
  line-height: 1.6;
`;

const ButtonGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1vh;
  margin-top: 3vh;
`;

const Button = styled.button`
  background-color: black;
  color: white;
  padding: 1vh 2vh;
  font-size: 1.8vh;
  border: none;
  border-radius: 0.7vh;
  cursor: pointer;

  &:hover {
    opacity: 0.85;
  }
`;

const BackButton = styled(Button)`
  background-color: #ddd;
  color: black;
  margin-bottom: 2vh;

  &:hover {
    background-color: #ccc;
  }
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
  padding: 3vh;
  border-radius: 1vh;
  width: 100%;
  max-width: 380px;
`;

const TitleInput = styled.textarea`
  width: 100%;
  height: 5vh;
  font-size: 2.5vh;
  margin-bottom: 1.5vh;
  padding: 1vh;
`;

const Input = styled.textarea`
  width: 100%;
  height: 15vh;
  font-size: 1.6vh;
  margin-bottom: 1.5vh;
  padding: 1vh;
`;

const TitleBox = styled.div`
  display: flex;
  justify-content: space-between;
`;

const CloseButton = styled.h3`
  cursor: pointer;
`;

// ✅ Main Component
const FeedDetailPage = () => {
  const { contentId } = useParams();
  const navigate = useNavigate();
  const userMail = sessionStorage.getItem('userMail');

  const [post, setPost] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showMatchModal, setShowMatchModal] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [myTeams, setMyTeams] = useState([]);
  const [selectedTeamId, setSelectedTeamId] = useState('');

  useEffect(() => {
    const fetchPost = async () => {
      const res = await fetch(`/api/community/${contentId}`);
      if (res.ok) {
        const data = await res.json();
        setPost(data);
      } else {
        alert('게시글 불러오기 실패');
      }
    };
    fetchPost();
  }, [contentId]);

  const handleDelete = async () => {
    if (!window.confirm('정말로 삭제하시겠습니까?')) return;
    const res = await fetch(`/api/community/${contentId}`, {
      method: 'DELETE',
    });
    if (res.status === 204) {
      alert('삭제 완료');
      navigate('/feed');
    } else {
      alert('삭제 실패');
    }
  };

  const handleEdit = async () => {
    const res = await fetch(`/api/community/${contentId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, content }),
    });
    if (res.ok) {
      const updated = await res.json();
      setPost(updated);
      alert('수정 완료');
      setShowEditModal(false);
    } else {
      alert('수정 실패');
    }
  };

  const openMatchModal = async () => {
    const res = await fetch(`/api/teams/mail/${userMail}`);
    if (!res.ok) return alert('팀 목록 불러오기 실패');
    const data = await res.json();
    const filtered = data.filter(
      (t) =>
        t.teamManager.userMail === userMail && t.teamId !== post.team.teamId,
    );
    setMyTeams(filtered);
    if (filtered.length > 0) setSelectedTeamId(filtered[0].teamId);
    setShowMatchModal(true);
  };

  const handleMatchRequest = async () => {
    const requesterTeam = myTeams.find(
      (t) => t.teamId === Number(selectedTeamId),
    );
    const postTeam = post.team;
    const startDate =
      new Date(post.matchDay).toISOString().slice(0, 16) + ':00';

    const fetchLogo = async () => {
      const res = await fetch(altImage);
      const blob = await res.blob();
      return new File([blob], 'default-logo.png', { type: blob.type });
    };

    const games = [
      {
        teamId: requesterTeam.teamId,
        versus: postTeam.teamName,
        gameName: `${post.matchDay.slice(0, 10)} ${
          postTeam.teamName
        } 매칭 신청`,
      },
      {
        teamId: postTeam.teamId,
        versus: requesterTeam.teamName,
        gameName: `${post.matchDay.slice(0, 10)} ${
          requesterTeam.teamName
        } 매칭 신청`,
      },
    ];

    for (const game of games) {
      const logoFile = await fetchLogo();

      const formData = new FormData();
      formData.append('teamId', String(game.teamId));
      formData.append('versus', game.versus);
      formData.append('gameName', game.gameName);
      formData.append('startDate', startDate);
      formData.append('oppoLogo', logoFile);

      const res = await fetch('/api/games/create-game', {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) {
        const errText = await res.text();
        alert(`매치 실패: ${errText}`);
        return;
      }
    }

    const res = await fetch(`/api/community/${contentId}`, {
      method: 'DELETE',
    });
    if (!res.ok) {
      const errText = await res.text();
      alert(`매치 실패 ${errText}`);
      return;
    }

    alert('매칭 성공!');
    setShowMatchModal(false);
    navigate(`/teams/${requesterTeam.teamId}`);
  };

  if (!post) return <div>로딩 중...</div>;

  return (
    <Container>
      <BackButton onClick={() => navigate(-1)}>← 뒤로가기</BackButton>

      <Card>
        <Heading>{post.title}</Heading>
        <InfoText>
          <strong>작성자:</strong> {post.user.userName}
        </InfoText>
        <InfoText>
          <strong>팀 이름:</strong> {post.team.teamName}
        </InfoText>
        <InfoText>
          <strong>지역:</strong> {post.team.location}
        </InfoText>
        <InfoText>
          <strong>작성일:</strong> {post.createTime.slice(0, 10)}
        </InfoText>
        <Content>
          {post.category === '매칭' && post.matchDay && (
            <>
              <strong>🕒 매칭 날짜:</strong>{' '}
              {post.matchDay.replace('T', ' ').slice(0, 16)}
            </>
          )}
        </Content>
        <InfoText>
          <strong>조회수:</strong> {post.views}
        </InfoText>
        <Divider />

        <Content>{post.content}</Content>

        <ButtonGroup>
          {post.category === '매칭' && (
            <Button onClick={openMatchModal}>매칭 신청</Button>
          )}
          <Button onClick={() => navigate(`/teams/${post.team.teamId}`)}>
            팀 상세페이지로 이동
          </Button>
          {userMail === post.user.userMail && (
            <>
              <Button
                onClick={() => {
                  setTitle(post.title);
                  setContent(post.content);
                  setShowEditModal(true);
                }}
              >
                수정
              </Button>
              <Button style={{ backgroundColor: 'red' }} onClick={handleDelete}>
                삭제
              </Button>
            </>
          )}
        </ButtonGroup>
      </Card>

      {/* 수정 모달 */}
      {showEditModal && (
        <ModalOverlay onClick={() => setShowEditModal(false)}>
          <Modal onClick={(e) => e.stopPropagation()}>
            <TitleBox>
              <h3>게시글 수정</h3>
              <CloseButton onClick={() => setShowEditModal(false)}>
                X
              </CloseButton>
            </TitleBox>
            <TitleInput
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <Input
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
            <Button onClick={handleEdit}>수정</Button>
          </Modal>
        </ModalOverlay>
      )}

      {/* 매칭 모달 */}
      {showMatchModal && (
        <ModalOverlay onClick={() => setShowMatchModal(false)}>
          <Modal onClick={(e) => e.stopPropagation()}>
            <TitleBox>
              <h3>매칭 신청</h3>
              <CloseButton onClick={() => setShowMatchModal(false)}>
                X
              </CloseButton>
            </TitleBox>
            {myTeams.length > 0 ? (
              <>
                <p>어느 팀으로 신청하시겠습니까?</p>
                <select
                  value={selectedTeamId}
                  onChange={(e) => setSelectedTeamId(e.target.value)}
                >
                  {myTeams.map((team) => (
                    <option key={team.teamId} value={team.teamId}>
                      {team.teamName}
                    </option>
                  ))}
                </select>
                <Button onClick={handleMatchRequest}>신청</Button>
              </>
            ) : (
              <p>매칭 신청 가능한 팀이 없습니다.</p>
            )}
          </Modal>
        </ModalOverlay>
      )}
    </Container>
  );
};

export default FeedDetailPage;
