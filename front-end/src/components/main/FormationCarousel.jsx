import { useState } from 'react';
import formations from '../../data/formation.json';
import { useNavigate } from 'react-router-dom';

const FormationCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(
    Math.floor(Math.random() * formations.length)
  );
  const navigate = useNavigate();

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? formations.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === formations.length - 1 ? 0 : prev + 1));
  };

  const handleMove = () => {
    navigate(`/lib/detail/formation/${formations[currentIndex].id}`);
  };

  const currentFormation = formations[currentIndex];

  return (
    <div className="w-full overflow-hidden mb-[2vh] relative text-center">
      {/* 이전 버튼 */}
      <button
        onClick={handlePrev}
        className="absolute top-1/2 left-[1vh] transform -translate-y-1/2 text-[5vh] md:text-[4vh] sm:text-[3.5vh] z-10 text-gray-500 hover:text-green-500 active:scale-90 transition-transform"
      >
        «
      </button>

      {/* 포메이션 카드 */}
      <div
        key={currentFormation.id}
        onClick={handleMove}
        className="flex flex-col items-center bg-white p-[2.5vh] md:p-[2vh] sm:p-[1.5vh] rounded-[16px] shadow-md min-w-[calc((100%-4vh)/2.5)] flex-none mx-[1vh] cursor-pointer transition-transform hover:scale-[1.03] hover:shadow-lg border border-gray-200 hover:border-green-500"
      >
        <div className="text-[1.7vh] md:text-[1.5vh] sm:text-[1.3vh] font-bold mt-[1vh] truncate w-full">
          {currentFormation.summation}
        </div>
        <div className="text-[3.2vh] md:text-[2.8vh] sm:text-[2.4vh] font-bold my-[1vh] truncate w-full text-gray-800">
          {currentFormation.title}
        </div>
        <img
          src={currentFormation.img}
          alt={currentFormation.title}
          className="w-full rounded-[6px] object-cover max-h-[30vh]"
        />
      </div>

      {/* 다음 버튼 */}
      <button
        onClick={handleNext}
        className="absolute top-1/2 right-[1vh] transform -translate-y-1/2 text-[5vh] md:text-[4vh] sm:text-[3.5vh] z-10 text-gray-500 hover:text-green-500 active:scale-90 transition-transform"
      >
        »
      </button>
    </div>
  );
};

export default FormationCarousel;
