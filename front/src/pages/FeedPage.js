import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const FeedPage = () => {
  const [showModal, setShowModal] = useState(false);
  const userMail = sessionStorage.getItem('userMail');
  const [teamData, setTeamData] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState('');
  const [teamId, setTeamId] = useState('');
  const [category, setCategory] = useState('매칭');
  const [startDate, setStartDate] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!userMail) return;

    const fetchTeamData = async () => {
      try {
        const res = await fetch(`/api/teams/mail/${userMail}`);
        const data = await res.json();
        const filtered = data.filter(team => team.teamManager.userMail === userMail);
        setTeamData(filtered);
        if (filtered.length > 0) {
          setSelectedTeam(filtered[0]);
          setTeamId(filtered[0].teamId);
        }
      } catch (err) {
        console.error('팀 정보 오류:', err);
      }
    };

    const fetchCommunity = async () => {
      try {
        const res = await fetch(`/api/community/category/${category}`);
        const data = await res.json();
        setPosts(data);
      } catch (err) {
        console.error('커뮤니티 불러오기 실패:', err);
      }
    };

    fetchTeamData();
    fetchCommunity();
  }, [userMail, category]);

  const handleSubmit = async () => {
    if (!teamId || !title.trim() || !content.trim()) return alert('입력 누락');
    if (category === '매칭' && !startDate) return alert('날짜 필요');
    const date = new Date();
    const formattedDate = date.toISOString().slice(0, 19);

    const body = {
      title,
      content,
      teamId: Number(teamId),
      userMail,
      category,
      matchDay: category === '매칭' ? startDate : formattedDate,
    };

    try {
      const res = await fetch('/api/community', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      if (!res.ok) throw new Error();
      alert('등록 완료!');
      window.location.reload();
    } catch (err) {
      alert('오류 발생');
      console.error(err);
    }
  };

  return (
    <div className="p-[8vh_2vw_10vh] max-w-[768px] mx-auto bg-[#f9f9f9]">
      <div className="flex justify-around mb-[2vh] border-b border-gray-300">
        {['매칭', '팀원 모집'].map(tab => (
          <div
            key={tab}
            className={`text-[2vh] p-[1vh_2vh] cursor-pointer ${category === tab ? 'font-bold border-b-[3px] border-black' : 'font-normal'}`}
            onClick={() => setCategory(tab)}
          >
            {tab}
          </div>
        ))}
      </div>

      {posts.map(post => (
        <div
          key={post.contentId}
          onClick={() => navigate(`/feed/${post.contentId}`)}
          className="bg-white rounded-[12px] p-[2vh_1vw] mb-[2vh] shadow-md flex justify-between items-center cursor-pointer transition hover:bg-gray-200"
        >
          <div className="flex items-center">
            <img
              src={`/logos/${post.team.logo}`}
              onError={e => { e.target.src = '/img/alt_image.png'; }}
              className="w-[6vh] h-[6vh] rounded-full object-cover mr-[2vh]"
              alt="team logo"
            />
            <div className="flex flex-col">
              <h3 className="text-[1.8vh] text-blue-500 m-0">{post.team.teamName}</h3>
              {post.category === '매칭' && post.matchDay && (
                <div className="text-[1.7vh] font-bold mt-[0.5vh] text-gray-800">
                  {new Date(post.matchDay).toLocaleString('ko-KR', {
                    month: 'long',
                    day: 'numeric',
                    weekday: 'short',
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: false,
                  })}
                </div>
              )}
              <div className="flex items-center text-[1.5vh] mt-[1vh] text-gray-600 gap-[0.5vh]">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-[1.8vh] h-[1.8vh]">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 2.25c-4.97 0-9 4.03-9 9 0 7.12 9 10.5 9 10.5s9-3.38 9-10.5c0-4.97-4.03-9-9-9z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 12.75a2.25 2.25 0 100-4.5 2.25 2.25 0 000 4.5z" />
                </svg>
                <span>{post.team.location}</span>
              </div>
            </div>
          </div>
          <div className={`text-[1.6vh] font-bold ${post.category === '매칭' ? 'text-green-500' : 'text-orange-500'}`}>
            {post.category === '매칭' ? '매칭 대기' : '모집 중'}
          </div>
        </div>
      ))}

<div className="fixed bottom-[10vh] right-[calc(clamp(1vh,(100vw-50vh)/2+1vh,100vw))] z-[1000] group">
  <button
    onClick={() => setShowModal(true)}
    className="w-[6.5vh] h-[6.5vh] bg-gradient-to-br from-green-400 to-green-600 text-white rounded-full border-none cursor-pointer shadow-lg flex items-center justify-center hover:scale-110 active:scale-95 transition-transform"
  >
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-[3vh] h-[3vh]">
      <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 3.487a2.32 2.32 0 113.281 3.281L7.5 19.41l-4.245 1.06 1.06-4.244L16.862 3.487z" />
    </svg>
  </button>

  {/* 툴팁 - 카테고리에 따라 변경 */}
  <div className="absolute right-[calc(100%+1.5vh)] top-1/2 -translate-y-1/2 bg-gray-200 text-gray-800 text-[1.6vh] px-[1.2vh] py-[0.7vh] rounded-[1vh] shadow group-hover:opacity-100 opacity-0 transition-opacity duration-300 whitespace-nowrap">
    {category === '매칭' ? '매칭 신청' : '팀원 모집'}
    {/* 꼬리 */}
    <div className="absolute top-1/2 left-full -translate-y-1/2 w-0 h-0 border-t-[8px] border-t-transparent border-b-[8px] border-b-transparent border-l-[8px] border-l-gray-200"></div>
  </div>
</div>



      {/* 작성 모달 */}
      {showModal && (
        <div onClick={() => setShowModal(false)} className="fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-50 flex justify-center items-center z-[9999]">
          <div onClick={e => e.stopPropagation()} className="bg-white rounded-[2vh] p-[4vh_3vh] w-[90%] max-w-[360px] box-border shadow-lg relative animate-fadeIn">
            <div className="flex justify-center items-center mb-[4vh] relative">
              <h3 className="text-[2.4vh] font-bold m-0 break-keep">게시글 작성</h3>
              <button onClick={() => setShowModal(false)} className="text-[2.4vh] bg-none border-none cursor-pointer absolute right-0 top-0">✖</button>
            </div>

            <div className="mb-[3vh]">
              <div className="text-[1.7vh] font-semibold mb-[1vh]">팀 선택 <span className="text-green-500 ml-[0.3vh]">⚽</span></div>
              <select
                value={selectedTeam?.teamName || ''}
                onChange={e => {
                  const team = teamData.find(t => t.teamName === e.target.value);
                  setSelectedTeam(team);
                  setTeamId(team.teamId);
                }}
                className="w-full text-[1.7vh] p-[1.5vh] border border-gray-300 rounded-[1vh] bg-[#f9f9f9] focus:outline-green-500 focus:bg-white box-border"
              >
                {teamData.map(team => (
                  <option key={team.teamId} value={team.teamName}>{team.teamName}</option>
                ))}
              </select>
            </div>

            <div className="mb-[3vh]">
              <div className="text-[1.7vh] font-semibold mb-[1vh]">카테고리 선택 <span className="text-green-500 ml-[0.3vh]">⚽</span></div>
              <div className="flex gap-[2vh]">
                <button onClick={() => setCategory('매칭')} className={`flex-1 text-[1.7vh] p-[1.5vh_0] border ${category === '매칭' ? 'border-green-500 bg-green-500 text-white' : 'border-gray-300 bg-[#f9f9f9] text-gray-800'} rounded-[1vh] cursor-pointer transition hover:border-green-500`}>매칭</button>
                <button onClick={() => setCategory('팀원 모집')} className={`flex-1 text-[1.7vh] p-[1.5vh_0] border ${category === '팀원 모집' ? 'border-green-500 bg-green-500 text-white' : 'border-gray-300 bg-[#f9f9f9] text-gray-800'} rounded-[1vh] cursor-pointer transition hover:border-green-500`}>팀원 모집</button>
              </div>
            </div>

            {category === '매칭' && (
              <div className="mb-[3vh]">
                <div className="text-[1.7vh] font-semibold mb-[1vh]">매칭 날짜 <span className="text-green-500 ml-[0.3vh]">⚽</span></div>
                <input
                  type="datetime-local"
                  placeholder="날짜 선택"
                  value={startDate}
                  onChange={e => setStartDate(e.target.value)}
                  className="w-full text-[1.7vh] p-[1.5vh] border border-gray-300 rounded-[1vh] bg-[#f9f9f9] focus:outline-green-500 focus:bg-white box-border"
                />
              </div>
            )}

            <div className="mb-[3vh]">
              <div className="text-[1.7vh] font-semibold mb-[1vh]">제목 <span className="text-green-500 ml-[0.3vh]">⚽</span></div>
              <input
                type="text"
                placeholder="제목 입력"
                value={title}
                onChange={e => setTitle(e.target.value)}
                className="w-full text-[1.7vh] p-[1.5vh] border border-gray-300 rounded-[1vh] bg-[#f9f9f9] focus:outline-green-500 focus:bg-white box-border"
              />
            </div>

            <div className="mb-[3vh]">
              <div className="text-[1.7vh] font-semibold mb-[1vh]">내용 <span className="text-green-500 ml-[0.3vh]">⚽</span></div>
              <textarea
                placeholder="내용 입력"
                value={content}
                onChange={e => setContent(e.target.value)}
                className="w-full text-[1.7vh] p-[1.5vh] border border-gray-300 rounded-[1vh] bg-[#f9f9f9] focus:outline-green-500 focus:bg-white box-border resize-none h-[10vh]"
              />
            </div>

            <button onClick={handleSubmit} className="w-full bg-green-500 text-white text-[2vh] p-[1.8vh] rounded-[2vh] border-none cursor-pointer mt-[2vh] shadow-md transition hover:bg-green-600 box-border">
              등록
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FeedPage;
