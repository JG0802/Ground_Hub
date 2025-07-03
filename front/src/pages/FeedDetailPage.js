// FeedDetailPage.jsx - 테일윈드 스타일 유지 + 로직 완성
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

const FeedDetailPage = () => {
  const { contentId } = useParams();
  const navigate = useNavigate();
  const userMail = sessionStorage.getItem('userMail');

  const [post, setPost] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showMatchModal, setShowMatchModal] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [myTeams, setMyTeams] = useState([]);
  const [selectedTeamId, setSelectedTeamId] = useState('');

  useEffect(() => {
    const fetchPost = async () => {
      const res = await fetch(`/api/community/${contentId}`);
      if (res.ok) {
        const data = await res.json();
        setPost(data);
      } else {
        alert('게시글 불러오기 실패');
      }
    };
    fetchPost();
  }, [contentId]);

  const handleDelete = async () => {
    if (!window.confirm('정말로 삭제하시겠습니까?')) return;
    const res = await fetch(`/api/community/${contentId}`, { method: 'DELETE' });
    if (res.status === 204) {
      alert('삭제 완료');
      navigate('/feed');
    } else {
      alert('삭제 실패');
    }
  };

  const handleEdit = async () => {
    const res = await fetch(`/api/community/${contentId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, content }),
    });
    if (res.ok) {
      const updated = await res.json();
      setPost(updated);
      alert('수정 완료');
      setShowEditModal(false);
    } else {
      alert('수정 실패');
    }
  };

  const openMatchModal = async () => {
    const res = await fetch(`/api/teams/mail/${userMail}`);
    if (!res.ok) return alert('팀 목록 불러오기 실패');
    const data = await res.json();
    const filtered = data.filter(t => t.teamManager.userMail === userMail && t.teamId !== post.team.teamId);
    setMyTeams(filtered);
    if (filtered.length > 0) setSelectedTeamId(filtered[0].teamId);
    setShowMatchModal(true);
  };

  const handleMatchRequest = async () => {
    const requesterTeam = myTeams.find(t => t.teamId === Number(selectedTeamId));
    const postTeam = post.team;
    const startDate = new Date(post.matchDay).toISOString().slice(0, 16) + ':00';

    const fetchLogo = async () => {
      const res = await fetch('/img/alt_image.png');
      const blob = await res.blob();
      return new File([blob], 'default-logo.png', { type: blob.type });
    };

    const games = [
      { teamId: requesterTeam.teamId, versus: postTeam.teamName, gameName: `${post.matchDay.slice(0, 10)} ${postTeam.teamName} 매칭 신청` },
      { teamId: postTeam.teamId, versus: requesterTeam.teamName, gameName: `${post.matchDay.slice(0, 10)} ${requesterTeam.teamName} 매칭 신청` },
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

    const res = await fetch(`/api/community/${contentId}`, { method: 'DELETE' });
    if (!res.ok) {
      const errText = await res.text();
      alert(`매치 실패 ${errText}`);
      return;
    }

    alert('매칭 성공!');
    setShowMatchModal(false);
    navigate(`/teams/${requesterTeam.teamId}`);
  };

  if (!post) return <div>로딩 중...</div>;

  return (
    <div className="p-[9vh_2vw_10vh] max-w-[768px] mx-auto bg-[#f9f9f9] min-h-[100vh]">
      <div className="relative mb-[3vh] flex items-center justify-center h-[6vh]">
        <button onClick={() => navigate(-1)} className="absolute left-0 text-[3vh] ml-[1vh]">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-[3vh] h-[3vh]">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
        </button>
        <h2 className="text-[2.4vh] font-bold text-center whitespace-nowrap overflow-hidden text-ellipsis">
          {post.category === '매칭' ? '매칭' : '팀원 모집'}
        </h2>
      </div>

      <div className="bg-white rounded-[2vh] shadow p-[3vh]">
        {post.category === '매칭' ? (
          <div className="bg-green-50 p-[2vh] rounded-[1vh] mb-[2vh]">
            <div className="flex justify-between mb-[1vh] text-[1.8vh]">
              <span className="text-gray-500">🕒 매칭 날짜</span>
              <span className="text-green-600 font-bold">{post.matchDay.replace('T', ' ').slice(0, 16)}</span>
            </div>
            <div className="flex justify-between mb-[1vh] text-[1.8vh]">
              <span className="text-gray-500">팀 이름</span>
              <span className="text-gray-700 font-medium">{post.team.teamName}</span>
            </div>
            <div className="flex justify-between text-[1.8vh]">
              <span className="text-gray-500">지역</span>
              <span className="text-gray-700 font-medium">{post.team.location}</span>
            </div>
          </div>
        ) : (
          <div className="bg-orange-100 p-[2vh] rounded-[1vh] mb-[2vh]">
            <div className="flex justify-between mb-[1vh] text-[1.8vh]">
              <span className="text-gray-500">팀 이름</span>
              <span className="text-gray-700 font-medium">{post.team.teamName}</span>
            </div>
            <div className="flex justify-between text-[1.8vh]">
              <span className="text-gray-500">지역</span>
              <span className="text-gray-700 font-medium">{post.team.location}</span>
            </div>
          </div>
        )}

        <div className="flex justify-between mb-[1.5vh] text-[1.7vh]">
          <span className="text-gray-500">작성자</span>
          <span className="text-gray-700">{post.user.userName}</span>
        </div>
        <div className="flex justify-between mb-[1.5vh] text-[1.7vh]">
          <span className="text-gray-500">작성일</span>
          <span className="text-gray-700">{post.createTime.slice(0, 10)}</span>
        </div>
        <div className="flex justify-between mb-[1.5vh] text-[1.7vh]">
          <span className="text-gray-500">조회수</span>
          <span className="text-gray-700">{post.views}</span>
        </div>

        <div className="relative bg-gray-100 p-[2vh] rounded-[1vh] mb-[3vh] text-[1.8vh] min-h-[8vh]">
          {post.content}
        </div>

        <div className="flex flex-col divide-y divide-gray-300 text-[1.8vh]">
          {post.category === '매칭' && (
            <button onClick={openMatchModal} className="flex justify-between items-center p-[2vh]">
              <span>매칭 신청</span>
              <span>➔</span>
            </button>
          )}

          <button onClick={() => navigate(`/teams/${post.team.teamId}`)} className="flex justify-between items-center p-[2vh]">
            <span>팀 상세페이지</span>
            <span>➔</span>
          </button>

          {userMail === post.user.userMail && (
            <>
              <button onClick={() => { setTitle(post.title); setContent(post.content); setShowEditModal(true); }} className="flex justify-between items-center p-[2vh]">
                <span>수정</span>
                <span>➔</span>
              </button>

              <button onClick={handleDelete} className="flex justify-between items-center p-[2vh] text-red-500">
                <span>삭제</span>
                <span>➔</span>
              </button>
            </>
          )}
        </div>
      </div>

      {/* 수정 모달 */}
      {showEditModal && (
        <div onClick={() => setShowEditModal(false)} className="fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-50 flex justify-center items-center z-[9999]">
          <div onClick={e => e.stopPropagation()} className="bg-white rounded-[2vh] p-[4vh_3vh] w-[90%] max-w-[360px] box-border shadow-lg">
            <div className="flex justify-between items-center mb-[2vh]">
              <h3 className="text-[2.4vh] font-bold">게시글 수정</h3>
              <button onClick={() => setShowEditModal(false)} className="text-[2.4vh]">✖</button>
            </div>

            <input
              type="text"
              value={title}
              onChange={e => setTitle(e.target.value)}
              className="w-full text-[1.7vh] p-[1.5vh] mb-[2vh] border border-gray-300 rounded-[1vh] bg-[#f9f9f9] focus:outline-green-500 focus:bg-white"
            />

            <textarea
              value={content}
              onChange={e => setContent(e.target.value)}
              className="w-full text-[1.7vh] p-[1.5vh] mb-[2vh] border border-gray-300 rounded-[1vh] bg-[#f9f9f9] focus:outline-green-500 focus:bg-white h-[12vh]"
            />

            <button onClick={handleEdit} className="w-full bg-green-500 text-white text-[2vh] p-[1.8vh] rounded-[2vh] shadow-md transition hover:bg-green-600">
              수정 완료
            </button>
          </div>
        </div>
      )}

      {/* 매칭 모달 */}
      {showMatchModal && (
        <div onClick={() => setShowMatchModal(false)} className="fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-50 flex justify-center items-center z-[9999]">
          <div onClick={e => e.stopPropagation()} className="bg-white rounded-[2vh] p-[4vh_3vh] w-[90%] max-w-[360px] box-border shadow-lg">
            <div className="flex justify-between items-center mb-[2vh]">
              <h3 className="text-[2.4vh] font-bold">매칭 신청</h3>
              <button onClick={() => setShowMatchModal(false)} className="text-[2.4vh]">✖</button>
            </div>

            {myTeams.length > 0 ? (
              <>
                <div className="mb-[2vh]">
                  <span className="text-[1.7vh]">어느 팀으로 신청하시겠습니까?</span>
                  <select
                    value={selectedTeamId}
                    onChange={e => setSelectedTeamId(e.target.value)}
                    className="w-full text-[1.7vh] p-[1.5vh] mt-[1vh] border border-gray-300 rounded-[1vh] bg-[#f9f9f9] focus:outline-green-500 focus:bg-white"
                  >
                    {myTeams.map(team => (
                      <option key={team.teamId} value={team.teamId}>{team.teamName}</option>
                    ))}
                  </select>
                </div>
                <button onClick={handleMatchRequest} className="w-full bg-green-500 text-white text-[2vh] p-[1.8vh] rounded-[2vh] shadow-md transition hover:bg-green-600">
                  신청
                </button>
              </>
            ) : (
              <p className="text-center">매칭 신청 가능한 팀이 없습니다.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default FeedDetailPage;
