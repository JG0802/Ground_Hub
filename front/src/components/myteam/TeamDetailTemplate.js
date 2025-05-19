import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import TeamInfo from './TeamInfo';
import TeamJoin from './TeamJoin';
import styled from 'styled-components';
import altImage from '../../img/alt_image.png';

const Title = styled.h1`
  font-size: 4vh;
`;
const TeamCard = styled.div`
  display: flex;
  align-items: center;
  padding: 1.5vh 0;
  border-bottom: 1px solid #eee;
`;

const TeamLogo = styled.img`
  width: 8vh;
  height: 8vh;
  border-radius: 1vh;
  object-fit: cover;
  margin-right: 2vh;
`;

const TeamInfoBox = styled.div`
  flex: 1;
`;

const TeamName = styled.div`
  font-size: 3vh;
  font-weight: bold;
  margin-bottom: 1vh;
`;

const Tag = styled.span`
  background-color: #ccc;
  color: #000;
  border-radius: 0.5vh;
  font-size: 1.7vh;
  padding: 0.2vh 1vh;
  margin-right: 1vh;
`;

const ColorDots = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1vh;
`;

const Dot = styled.div`
  width: 2vh;
  height: 2vh;
  border-radius: 50%;
  background-color: ${(props) => props.color};
`;

const MemberList = styled.ul`
  list-style: none;
  padding-left: 0;
`;

const MemberItem = styled.li`
  font-size: 1.8vh;
  margin-bottom: 1vh;
`;

const TeamDetailPage = () => {
  const { id } = useParams(); // ← URL에서 ID 추출
  const [team, setTeam] = useState({});
  const [teamUser, setTeamUser] = useState([]);
  const [games, setGames] = useState([]);
  const userMail = sessionStorage.getItem('userMail');
  const [teamManagerMail, setTeamManagerMail] = useState('');
  const [showMembers, setShowMembers] = useState(false);
  sessionStorage.setItem('teamId', id);

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const response = await fetch(`/api/teams/${id}`);
        if (response.ok) {
          const data = await response.json();
          setTeam(data);
        } else {
          alert(await response.text());
        }
      } catch (err) {
        console.error(err);
        alert('서버와 통신 중 오류가 발생했습니다.');
      }
    };
    const fetchTeamUser = async () => {
      const res = await fetch(`/api/teams/${id}/users-in-team`);
      const data = await res.json();
      setTeamUser(data);
    };

    const fetchTeamInfo = async () => {
      const res = await fetch(`/api/teams/${id}`);
      const teamRes = await res.json();
      setTeamManagerMail(teamRes.teamManager.userMail); // 💡 여기!
    };

    const fetchGame = async () => {
      const res = await fetch(`/api/games/team/${id}`);
      if (res.ok) {
        const text = await res.text();
        const data = text ? JSON.parse(text) : []; // 또는 null
        setGames(data);
      } else {
        console.error('서버 오류:', res.status);
        setGames([]);
      }
    };

    fetchTeam();
    fetchTeamUser();
    fetchTeamInfo();
    fetchGame();
  }, [id]);

  if (!team || !games || !teamUser) return <div>로딩 중...</div>;
  const isInTeam = teamUser.some((user) => user.userMail === userMail);

  return (
    <div>
      <Title>팀 상세 정보</Title>
      <TeamCard>
        <TeamLogo
          src={`/logos/${team.logo}`}
          onError={(e) => {
            e.target.src = altImage;
          }}
        />
        <TeamInfoBox>
          <TeamName>{team.teamName}</TeamName>
          <Tag>📍 위치: {team.location}</Tag>
        </TeamInfoBox>
        <ColorDots>
          <Dot color={team.firstColor} />
          <Dot color={team.secondColor} />
        </ColorDots>
      </TeamCard>
      <h2
        style={{
          cursor: 'pointer',
        }}
        onClick={() => setShowMembers((prev) => !prev)}
      >
        {showMembers
          ? `👥 팀 명단(${team.users ? team.users.length : 0}명) ▼`
          : `👥 팀 명단(${team.users ? team.users.length : 0}명) ▲`}
      </h2>
      {showMembers && (
        <MemberList>
          {(() => {
            const items = [];
            const manager = teamUser.find(
              (user) => user.userMail === teamManagerMail,
            );
            if (manager) {
              items.push(
                <MemberItem key={manager.userMail}>
                  👑 {manager.userName} ({manager.firstPosition},{' '}
                  {manager.secondPosition}, {manager.thirdPosition})
                </MemberItem>,
              );
            }
            for (let i = 0; i < teamUser.length; i++) {
              const user = teamUser[i];
              if (user.userMail !== teamManagerMail) {
                items.push(
                  <MemberItem key={user.userMail}>
                    {user.userName} ({user.firstPosition}, {user.secondPosition}
                    , {user.thirdPosition})
                  </MemberItem>,
                );
              }
            }
            return items;
          })()}
        </MemberList>
      )}
      {isInTeam ? (
        <div>
          <TeamInfo games={games} teamManagerMail={teamManagerMail} />
        </div>
      ) : (
        <TeamJoin />
      )}
    </div>
  );
};

export default TeamDetailPage;
