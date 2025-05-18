import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import TeamCard from '../components/team/TeamCard';
import TeamCreateModal from '../components/team/TeamCreateModal';
import { useState } from 'react';
import useTeamStore from '../stores/useTeamStore'; // ✅ Zustand 스토어 import

const Wrapper = styled.div`
  padding: 2vh;
  max-width: 430px;
  margin: 0 auto;
  background: white;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 1vh;
  margin-bottom: 2vh;
`;

const AddButton = styled.button`
  width: 5vh;
  height: 5vh;
  border-radius: 50%;
  font-size: 3vh;
  font-weight: bold;
  border: none;
  background-color: black;
  color: white;
`;

const SearchInput = styled.input`
  flex: 1;
  font-size: 1.8vh;
  padding: 1vh;
  border-radius: 1vh;
  border: 1px solid #ccc;
`;

const TeamListPage = ({ setTeamFeedPosts }) => {
  const { teams, addTeam, deleteTeam } = useTeamStore(); // ✅ 상태 훅 호출
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const handleAddTeam = (newTeam) => {
    const newTeamWithId = { ...newTeam, id: Date.now() };
    addTeam(newTeamWithId); // ✅ Zustand에 저장

    if (!newTeamWithId.isPrivate) {
      const feedPost = {
        user: newTeamWithId.name,
        time: '방금 전',
        content: `📍 ${newTeamWithId.location} 팀 모집 중!`,
        images: [newTeamWithId.logo],
        likes: 0,
        comments: [],
        liked: false,
      };
      setTeamFeedPosts((prev) => [feedPost, ...prev]);
    }

    setShowModal(false);
  };

  const filtered = teams.filter((team) =>
    team.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Wrapper>
      <Header>
        <AddButton onClick={() => setShowModal(true)}>+</AddButton>
        <SearchInput
          placeholder="Type the Team name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </Header>

      {filtered.length > 0 ? (
        filtered.map((team) => (
          <TeamCard
            key={team.id}
            team={team}
            onClick={() => navigate(`/teams/${team.id}`)}
            onDelete={() => deleteTeam(team.id)} // ✅ Zustand에서 삭제
          />
        ))
      ) : (
        <p
          style={{
            fontSize: '1.8vh',
            color: '#aaa',
            textAlign: 'center',
            marginTop: '5vh',
          }}
        >
          해당 팀이 없습니다.
        </p>
      )}

      {showModal && (
        <TeamCreateModal
          onClose={() => setShowModal(false)}
          onCreate={handleAddTeam}
        />
      )}
    </Wrapper>
  );
};

export default TeamListPage;
