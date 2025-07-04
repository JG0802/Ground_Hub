import { Link } from 'react-router-dom';
import altImage from '../../img/alt_image.png';

const MySchedule = ({ game }) => {
  return (
    <Link
      to={`/game/${game.gameId}`}
      className="no-underline text-inherit"
    >
      <div className="bg-white rounded-2xl shadow-md px-[2vh] py-[2vh] transition hover:shadow-lg">
        <h3 className="text-[1.8vh] font-semibold mb-[1vh]">
          {game.team.teamName} VS {game.versus}
        </h3>
        <p className="text-[1.5vh] text-gray-600 mb-[1vh]">
          {game.date?.slice(0, 10)}
        </p>
        <div className="flex justify-between items-center mt-[1vh]">
          <div className="flex flex-col items-center">
            <img
              src={`http://52.78.12.127:8080/logos/${game.team.logo}`}
              onError={(e) => (e.target.src = altImage)}
              className="w-[9vh] h-[9vh] rounded-full object-cover mb-[1vh] border-2 border-white shadow-sm"
            />
            <div className="text-[1.5vh] font-bold max-w-[10vh] truncate">
              {game.team.teamName}
            </div>
          </div>
          <div className="text-center">
            <div className="text-[2.2vh] font-bold mb-[1vh]">VS</div>
            <div className="text-[1.4vh] text-gray-600">{game.gameName}</div>
          </div>
          <div className="flex flex-col items-center">
            <img
              src={`/logos/${game.oppoLogo}`}
              onError={(e) => (e.target.src = altImage)}
              className="w-[9vh] h-[9vh] rounded-full object-cover mb-[1vh] border-2 border-white shadow-sm"
            />
            <div className="text-[1.5vh] font-bold max-w-[10vh] truncate">
              {game.versus}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default MySchedule;
