import { useState } from 'react';
import styled from 'styled-components';

const SearchInput = styled.input`
  flex: 1;
  height: 5vh;
  font-size: 1.8vh;
  padding: 0 1.5vh;
  border-radius: 1vh;
  border: 1px solid #ccc;
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

const Wrapper = styled.div`
  display: flex;
  gap: 1vh;
  flex: 1;
`;

const TeamSearch = ({ onSearch }) => {
  const [input, setInput] = useState('');

  const handleSearchClick = () => {
    if (onSearch) {
      onSearch(input.trim());
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearchClick();
    }
  };

  return (
    <Wrapper>
      <SearchInput
        type="text"
        placeholder="Search Team name"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <IconButton onClick={handleSearchClick}>🔍</IconButton>
    </Wrapper>
  );
};

export default TeamSearch;
