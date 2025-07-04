import { useState } from 'react';
import styled from 'styled-components';
import TeamCreateModal from '../../components/teams/TeamCreateModal';
import TeamSearch from '../../components/teams/TeamSearch';
import TeamList from '../../components/teams/TeamList';

const Container = styled.div`
  padding-top: 8vh;
  background-color: #f9f9f9;
`;

const Title = styled.h1`
  font-size: 2.4vh;
  font-weight: 700;
  margin-bottom: 3vh;
  text-align: center;
`;

const ControlRow = styled.div`
  display: flex;
  gap: 1vh;
  margin-bottom: 3vh;
`;

const IconButton = styled.button`
  width: 5vh;
  height: 5vh;
  font-size: 2.2vh;
  background-color: #eee;
  border: none;
  border-radius: 50%;
  cursor: pointer;
`;

const TeamListPage = () => {
  const [showModal, setShowModal] = useState(false);
  const [refreshFlag, setRefreshFlag] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState('');

  const handleRefresh = () => {
    setRefreshFlag((prev) => !prev);
  };

  const handleSearch = (keyword) => {
    setSearchKeyword(keyword);
    handleRefresh();
  };

  return (
    <Container>
      <Title>Team List</Title>

      <ControlRow>
        <IconButton onClick={() => setShowModal(true)}>＋</IconButton>
        <TeamSearch onSearch={handleSearch} />
      </ControlRow>

      <TeamList key={refreshFlag} keyword={searchKeyword} />

      {showModal && (
        <TeamCreateModal
          onClose={() => setShowModal(false)}
          onSuccess={handleRefresh}
        />
      )}
    </Container>
  );
};

export default TeamListPage;
