import { Link } from 'react-router-dom';
import altImage from '../../img/alt_image.png';
import UniformIcon from '../common/UniformIcon';

const MyTeam = ({ team }) => {
  return (
    <Link to={`/teams/${team.teamId}`} className="no-underline text-inherit">
      <div className="flex items-center justify-between bg-white p-[2vh] rounded-[1.2vh] shadow-md transition hover:scale-[1.02] hover:shadow-lg">
        <img
          src={`http://52.78.12.127:8080/logos/${team.logo}`}
          onError={(e) => { e.target.src = altImage; }}
          className="w-[8vh] h-[8vh] rounded-full object-cover"
          alt="team logo"
        />
        <div className="flex-1 ml-[2vh]">
          <div className="text-[1.8vh] font-bold mb-[1vh]">{team.teamName}</div>
          <div className="flex items-center gap-[0.7vh] text-[1.4vh] text-gray-700 mb-[0.5vh]">
            <span className="bg-gray-300 text-gray-800 rounded-[1vh] px-[1vh] text-[1.3vh]">회원</span>
            {team.users.length}명
          </div>
          <div className="flex items-center gap-[0.7vh] text-[1.4vh] text-gray-700 mb-[0.5vh]">
            <span className="bg-gray-300 text-gray-800 rounded-[1vh] px-[1vh] text-[1.3vh]">위치</span>
            {team.location}
          </div>
        </div>
        <div className="flex gap-[1vh]">
          <UniformIcon color={team.firstColor} type="home" />
          <UniformIcon color={team.secondColor} type="away" />
        </div>
      </div>
    </Link>
  );
};

export default MyTeam;
