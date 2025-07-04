import { Link } from 'react-router-dom';
import altImage from '../../img/alt_image.png';

const MyTeam = ({ team }) => {
  return (
    <Link
      to={`/team/${team.teamId}`}
      className="flex flex-col items-center justify-between bg-white rounded-[1.2vh] shadow-md cursor-pointer transition hover:scale-[1.02] hover:shadow-lg p-[1.5vh] w-[13vh] h-[17vh]"
    >
      <div className="flex items-center justify-center w-[9vh] h-[9vh] rounded-full overflow-hidden shadow">
        <img
          src={`http://52.78.12.127:8080/logos/${team.logo}`}
          alt="팀 로고"
          className="w-full h-full object-cover"
          onError={(e) => { e.target.src = altImage; }}
        />
      </div>

      <div className="text-center text-[1.4vh] font-bold truncate max-w-[10vh]">{team.teamName}</div>
      <div className="text-center text-[1.2vh] text-gray-500 truncate max-w-[10vh]">{team.location}</div>
      <div className="text-center text-[1.1vh] text-gray-500">{team.users.length}명</div>
    </Link>
  );
};

export default MyTeam;
