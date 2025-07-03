import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const FeedMatch = ({ post, userMail, onClose }) => {
  const [myTeams, setMyTeams] = useState([]);
  const [selectedTeamId, setSelectedTeamId] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTeams = async () => {
      const res = await fetch(`/api/teams/mail/${userMail}`);
      const data = await res.json();
      const filtered = data.filter(t => t.teamManager.userMail === userMail && t.teamId !== post.team.teamId);
      setMyTeams(filtered);
      if (filtered.length > 0) setSelectedTeamId(filtered[0].teamId);
    };
    fetchTeams();
  }, [userMail, post.team.teamId]);

  const handleMatch = async () => {
    const requesterTeam = myTeams.find(t => t.teamId === Number(selectedTeamId));
    const postTeam = post.team;
    const startDate = new Date(post.matchDay).toISOString().slice(0, 16) + ':00';

    const fetchLogo = async () => {
      const res = await fetch('/img/alt_image.png');
      const blob = await res.blob();
      return new File([blob], 'default-logo.png', { type: blob.type });
    };

    const games = [
      {
        teamId: requesterTeam.teamId,
        versus: postTeam.teamName,
        gameName: `${post.matchDay.slice(0, 10)} ${postTeam.teamName} 매칭 신청`,
      },
      {
        teamId: postTeam.teamId,
        versus: requesterTeam.teamName,
        gameName: `${post.matchDay.slice(0, 10)} ${requesterTeam.teamName} 매칭 신청`,
      },
    ];

    for (const game of games) {
      const logoFile = await fetchLogo();
      const formData = new FormData();
      formData.append('teamId', String(game.teamId));
      formData.append('versus', game.versus);
      formData.append('gameName', game.gameName);
      formData.append('startDate', startDate);
      formData.append('oppoLogo', logoFile);

      const res = await fetch('/api/games/create-game', {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) {
        const errText = await res.text();
        alert(`매치 실패: ${errText}`);
        return;
      }
    }

    const res = await fetch(`/api/community/${post.contentId}`, { method: 'DELETE' });
    if (!res.ok) return alert('매칭 후 삭제 실패');
    alert('매칭 성공!');
    onClose();
    navigate(`/teams/${requesterTeam.teamId}`);
  };

  return (
    <div className="fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-50 flex justify-center items-center z-[9999]">
      <div onClick={e => e.stopPropagation()} className="bg-white rounded-[2vh] p-[4vh_3vh] w-[90%] max-w-[360px] box-border shadow-lg">
        <h3 className="text-[2.4vh] font-bold mb-[2vh]">매칭 신청</h3>
        {myTeams.length > 0 ? (
          <>
            <select value={selectedTeamId} onChange={e => setSelectedTeamId(e.target.value)} className="w-full mb-[2vh] p-2 border">
              {myTeams.map(t => (
                <option key={t.teamId} value={t.teamId}>{t.teamName}</option>
              ))}
            </select>
            <button onClick={handleMatch} className="w-full p-2 bg-green-500 text-white">신청</button>
          </>
        ) : (
          <p>신청 가능한 팀이 없습니다.</p>
        )}
      </div>
    </div>
  );
};

export default FeedMatch;
