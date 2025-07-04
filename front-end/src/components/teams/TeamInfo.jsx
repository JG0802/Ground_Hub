// src/components/teams/TeamInfo.jsx
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import altImage from '../../img/alt_image.png';
import setting from '../../img/setting.png';
import TeamMatch from './TeamMatch';
import TeamJoin from './TeamJoin';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2vh;
`;

const SectionCard = styled.div`
  background-color: #ffffff;
  border-radius: 1.2vh;
  padding: 2vh;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
`;

const TeamCard = styled.div`
  display: flex;
  align-items: center;
  gap: 2vh;
`;

const TeamLogo = styled.img`
  width: 8vh;
  height: 8vh;
  border-radius: 1vh;
  object-fit: cover;
`;

const TeamInfoBox = styled.div`
  flex: 1;
`;

const TeamName = styled.div`
  font-size: 2.4vh;
  font-weight: bold;
  margin-bottom: 1vh;
`;

const Tag = styled.div`
  font-size: 1.6vh;
  color: #666;
`;

const ColorDots = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1vh;
`;

const DotBox = styled.div`
  display: flex;
  align-items: center;
  gap: 1vh;
`;

const Dot = styled.div`
  width: 2vh;
  height: 2vh;
  border-radius: 50%;
  background-color: ${(props) => props.color};
  border: ${(props) =>
    props.color === 'white' ? '1px solid #333' : `1px solid ${props.color}`};
`;

const DotLabel = styled.div`
  font-size: 1.6vh;
  color: #333;
`;

const SettingButton = styled(Link)`
  background-color: #eee;
  width: 5vh;
  height: 5vh;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SettingImg = styled.img`
  width: 3vh;
  height: 3vh;
`;

const MemberToggle = styled.h2`
  font-size: 2.2vh;
  cursor: pointer;
  margin-top: 3vh;
`;

const MemberList = styled.ul`
  list-style: none;
  padding: 0;
  margin-top: 1.5vh;
`;

const MemberItem = styled.li`
  font-size: 1.8vh;
  margin-bottom: 1vh;
`;

const TeamInfo = ({ teamId }) => {
  const [team, setTeam] = useState(null);
  const [teamUser, setTeamUser] = useState([]);
  const [games, setGames] = useState([]);
  const [teamManagerMail, setTeamManagerMail] = useState('');
  const [showMembers, setShowMembers] = useState(false);
  const userMail = sessionStorage.getItem('userMail');

  useEffect(() => {
    const fetchData = async () => {
      const teamRes = await fetch(`/api/teams/${teamId}`);
      const teamData = await teamRes.json();
      setTeam(teamData);
      setTeamManagerMail(teamData.teamManager?.userMail || '');

      const userRes = await fetch(`/api/teams/${teamId}/users-in-team`);
      setTeamUser(await userRes.json());

      const gamesRes = await fetch(`/api/games/team/${teamId}`);
      const text = await gamesRes.text();
      setGames(text ? JSON.parse(text) : []);
    };
    fetchData();
  }, [teamId]);

  if (!team) return <div>로딩 중...</div>;

  const isInTeam = teamUser.some(
    (user) => user.userMail?.toLowerCase() === userMail?.toLowerCase()
  );

  const manager = teamUser.find((u) => u.userMail === teamManagerMail);

  return (
    <Wrapper>
      {/* 팀 상세 정보 */}
      <SectionCard>
        <TeamCard>
          <TeamLogo
            src={`http://52.78.12.127:8080/logos/${team.logo}`}
            onError={(e) => (e.target.src = altImage)}
          />
          <TeamInfoBox>
            <TeamName>{team.teamName}</TeamName>
            <Tag>📍 위치: {team.location}</Tag>
          </TeamInfoBox>
          <ColorDots>
            <DotBox>
              <DotLabel>HOME</DotLabel>
              <Dot color={team.firstColor} />
            </DotBox>
            <DotBox>
              <DotLabel>AWAY</DotLabel>
              <Dot color={team.secondColor} />
            </DotBox>
          </ColorDots>
          {userMail === teamManagerMail && (
            <SettingButton to={`/team/update/${teamId}`}>
              <SettingImg src={setting} alt="설정" />
            </SettingButton>
          )}
        </TeamCard>
      </SectionCard>

      {/* 팀원 명단 */}
      <SectionCard>
        <MemberToggle onClick={() => setShowMembers(!showMembers)}>
          {showMembers
            ? `👥 팀 명단(${teamUser.length}명) ▼`
            : `👥 팀 명단(${teamUser.length}명) ▲`}
        </MemberToggle>
        {showMembers && (
          <MemberList>
            {manager && (
              <MemberItem>
                👑 {manager.userName} ({manager.firstPosition}, {manager.secondPosition}, {manager.thirdPosition})
              </MemberItem>
            )}
            {teamUser
              .filter((u) => u.userMail !== teamManagerMail)
              .map((u) => (
                <MemberItem key={u.userMail}>
                  {u.userName} ({u.firstPosition}, {u.secondPosition}, {u.thirdPosition})
                </MemberItem>
              ))}
          </MemberList>
        )}
      </SectionCard>

      {/* 매치 정보 or 팀 가입 */}
      <SectionCard>
        {isInTeam ? (
          <TeamMatch games={games} teamManagerMail={teamManagerMail} />
        ) : (
          <TeamJoin />
        )}
      </SectionCard>
    </Wrapper>
  );
};

export default TeamInfo;
