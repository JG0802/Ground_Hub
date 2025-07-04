import { useState } from 'react';

const TeamSearch = ({ onSearch }) => {
  const [input, setInput] = useState('');

  const handleSearchClick = () => {
    if (onSearch) onSearch(input.trim());
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSearchClick();
  };

  return (
    <div className="flex items-center flex-1 bg-white border border-gray-300 rounded-full px-4 py-2">
      <input
        type="text"
        placeholder="Search Team name"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        className="flex-1 text-[1.7vh] focus:outline-none"
      />
      <button
        onClick={handleSearchClick}
        className="w-[4vh] h-[4vh] flex justify-center items-center text-[2vh] hover:scale-110 active:scale-95 transition"
      >
        🔍
      </button>
    </div>
  );
};

export default TeamSearch;
