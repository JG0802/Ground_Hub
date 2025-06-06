import { useState } from 'react';
import styled from 'styled-components';
import useTeamStore from '../stores/useTeamStore'; // Zustand 연결

// ✅ styled-components 정의
const Container = styled.div`
  padding: 2vh;
  position: relative;
  margin: 0 auto;
  background-color: white;
  overflow-x: hidden;
  width: 100%;
`;

const NavTabs = styled.div`
  display: flex;
  justify-content: space-around;
  margin-bottom: 2vh;
`;

const Tab = styled.div`
  font-size: 1.8vh;
  font-weight: ${(props) => (props.active ? 'bold' : 'normal')};
  border-bottom: ${(props) => (props.active ? '2px solid black' : 'none')};
  padding-bottom: 1vh;
  cursor: pointer;
`;

const Post = styled.div`
  margin-bottom: 3vh;
  border-bottom: 1px solid #ddd;
  padding-bottom: 2vh;
`;

const PostHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1vh;
  font-size: 1.6vh;
`;

const PostContent = styled.div`
  font-size: 1.6vh;
  margin-bottom: 1vh;
`;

const PostFooter = styled.div`
  display: flex;
  gap: 2vh;
  font-size: 1.6vh;
  color: gray;
  flex-wrap: wrap;
`;

const LikeButton = styled.span`
  cursor: pointer;
`;

const CommentSection = styled.div`
  margin-top: 1vh;
`;

const CommentInput = styled.input`
  width: 100%;
  padding: 1vh;
  font-size: 1.6vh;
  margin-top: 1vh;
  border: 1px solid #ccc;
  border-radius: 0.5vh;
`;

const CommentList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 1vh 0 0 0;
  font-size: 1.5vh;
`;

const WriteButton = styled.button`
  position: fixed;
  bottom: 6vh;
  right: max(3vh, calc((100vw - 47vh) / 2));
  width: 6vh;
  height: 6vh;
  border-radius: 50%;
  background-color: black;
  color: white;
  font-size: 3vh;
  border: none;
  cursor: pointer;
  z-index: 200;
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
  margin: 0 auto;
`;

const Input = styled.textarea`
  width: 100%;
  height: 15vh;
  font-size: 1.6vh;
  margin-bottom: 1.5vh;
  padding: 1vh;
`;

const FileInput = styled.input`
  margin-top: 1vh;
  margin-bottom: 2vh;
`;

const Submit = styled.button`
  width: 100%;
  background-color: black;
  color: white;
  font-size: 1.8vh;
  padding: 1vh;
  border-radius: 1vh;
  border: none;
`;

const FeedPage = () => {
  const { teams } = useTeamStore(); // Zustand 전역 상태
  const [activeTab, setActiveTab] = useState('팀');
  const [posts, setPosts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newContent, setNewContent] = useState('');
  const [newImages, setNewImages] = useState([]);
  const [commentInputs, setCommentInputs] = useState({});

  // ✅ Zustand에서 공개 팀만 필터링해 피드용 객체 생성
  const teamFeedPosts =
    activeTab === '팀'
      ? teams
          .filter((team) => !team.isPrivate)
          .map((team) => ({
            user: team.name,
            time: '방금 전',
            content: `📍 ${team.location} 팀 모집 중!`,
            images: [team.logo],
            likes: 0,
            comments: [],
            liked: false,
          }))
      : [];

  const combinedPosts = [...teamFeedPosts, ...posts];

  const handleCreatePost = () => {
    if (!newContent.trim() && newImages.length === 0) return;
    const newPost = {
      user: 'Me',
      time: 'just now',
      content: newContent,
      images: newImages,
      likes: 0,
      comments: [],
      liked: false,
    };
    setPosts([newPost, ...posts]);
    setNewContent('');
    setNewImages([]);
    setShowModal(false);
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const readers = files.map((file) => {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.readAsDataURL(file);
      });
    });
    Promise.all(readers).then((images) => {
      setNewImages(images);
    });
  };

  const toggleLike = (index) => {
    const updated = [...combinedPosts];
    const post = updated[index];
    post.liked = !post.liked;
    post.likes += post.liked ? 1 : -1;
  };

  const handleCommentChange = (index, value) => {
    setCommentInputs((prev) => ({ ...prev, [index]: value }));
  };

  const handleCommentSubmit = (index) => {
    const comment = commentInputs[index];
    if (!comment || comment.trim() === '') return;
    const updated = [...posts];
    if (index < teamFeedPosts.length) return;
    const realIndex = index - teamFeedPosts.length;
    updated[realIndex].comments.push(comment.trim());
    setPosts(updated);
    setCommentInputs((prev) => ({ ...prev, [index]: '' }));
  };

  const handleDeletePost = (index) => {
    if (index < teamFeedPosts.length) return;
    const realIndex = index - teamFeedPosts.length;
    setPosts((prev) => prev.filter((_, i) => i !== realIndex));
  };

  return (
    <Container>
      <NavTabs>
        {['매치', '팀', '용병'].map((tab) => (
          <Tab
            key={tab}
            active={activeTab === tab}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </Tab>
        ))}
      </NavTabs>

      {combinedPosts.map((post, index) => (
        <Post key={index}>
          <PostHeader>
            <span>
              {post.user} · {post.time}
            </span>
            <span
              style={{ cursor: 'pointer' }}
              onClick={() => handleDeletePost(index)}
            >
              🗑
            </span>
          </PostHeader>
          {post.content && <PostContent>{post.content}</PostContent>}
          {post.images &&
            post.images.map((img, i) => (
              <img
                key={i}
                src={img}
                alt={`upload-${i}`}
                style={{
                  width: '100%',
                  borderRadius: '1vh',
                  marginBottom: '1vh',
                }}
              />
            ))}
          <PostFooter>
            <LikeButton onClick={() => toggleLike(index)}>
              {post.liked ? '❤️' : '🤍'} {post.likes} likes
            </LikeButton>
            <span>💬 {post.comments.length} comments</span>
          </PostFooter>
          <CommentSection>
            <CommentList>
              {post.comments.map((c, i) => (
                <li key={i}>🗨️ {c}</li>
              ))}
            </CommentList>
            <CommentInput
              placeholder="댓글을 입력하세요..."
              value={commentInputs[index] || ''}
              onChange={(e) => handleCommentChange(index, e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleCommentSubmit(index);
                }
              }}
            />
          </CommentSection>
        </Post>
      ))}

      <WriteButton onClick={() => setShowModal(true)}>+</WriteButton>

      {showModal && (
        <ModalOverlay onClick={() => setShowModal(false)}>
          <Modal onClick={(e) => e.stopPropagation()}>
            <Input
              placeholder="Write your post..."
              value={newContent}
              onChange={(e) => setNewContent(e.target.value)}
            />
            <FileInput
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageUpload}
            />
            {newImages.map((img, i) => (
              <img
                key={i}
                src={img}
                alt={`preview-${i}`}
                style={{
                  width: '100%',
                  borderRadius: '1vh',
                  marginBottom: '1vh',
                }}
              />
            ))}
            <Submit onClick={handleCreatePost}>Post</Submit>
          </Modal>
        </ModalOverlay>
      )}
    </Container>
  );
};

export default FeedPage;
