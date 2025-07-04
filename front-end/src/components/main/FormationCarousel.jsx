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
    navigate(`/detail/formation/${formations[currentIndex].id}`);
  };

  const currentFormation = formations[currentIndex];

  return (
    <div className="w-full overflow-hidden mb-[2vh] relative text-center">
      <div
        className="absolute top-1/2 left-[1vh] transform -translate-y-1/2 text-[5vh] cursor-pointer z-10 hover:text-gray-500"
        onClick={handlePrev}
      >
        «
      </div>

      <div
        key={currentFormation.id}
        onClick={handleMove}
        className="flex flex-col items-center bg-gray-100 p-[1vh] md:p-[2vh] sm:p-[1.5vh] rounded-[16px] shadow-md min-w-[calc((100%-4vh)/2.5)] flex-none mx-[1vh] cursor-pointer transition hover:shadow-lg border border-transparent hover:border-green-500 box-border"
      >
        <div className="text-[1.5vh] font-bold mt-[1vh] truncate w-full">
          {currentFormation.summation}
        </div>
        <div className="text-[3vh] font-bold my-[1vh] truncate w-full">
          {currentFormation.title}
        </div>
        <img
          src={currentFormation.img}
          alt={currentFormation.title}
          className="w-full rounded-[6px]"
        />
      </div>

      <div
        className="absolute top-1/2 right-[1vh] transform -translate-y-1/2 text-[5vh] cursor-pointer z-10 hover:text-gray-500"
        onClick={handleNext}
      >
        »
      </div>
    </div>
  );
};

export default FormationCarousel;
