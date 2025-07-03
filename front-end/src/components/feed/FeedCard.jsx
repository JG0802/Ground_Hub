import altImage from '../../img/alt_image.png';

const FeedCard = ({ post, onClick }) => {
  console.log(post)
  return (
    <div
      onClick={onClick}
      className="bg-white rounded-[12px] p-[2vh_1vw] mb-[2vh] shadow-md flex justify-between items-center cursor-pointer transition hover:bg-gray-200"
    >
      <div className="flex items-center">
        <img
          src={`http://52.78.12.127:8080/logos/${post.team.logo}`}
          onError={e => { e.target.src = altImage; }}
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
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                 strokeWidth="1.5" stroke="currentColor" className="w-[1.8vh] h-[1.8vh]">
              <path strokeLinecap="round" strokeLinejoin="round"
                    d="M12 2.25c-4.97 0-9 4.03-9 9 0 7.12 9 10.5 9 10.5s9-3.38 9-10.5c0-4.97-4.03-9-9-9z" />
              <path strokeLinecap="round" strokeLinejoin="round"
                    d="M12 12.75a2.25 2.25 0 100-4.5 2.25 2.25 0 000 4.5z" />
            </svg>
            <span>{post.team.location}</span>
          </div>
        </div>
      </div>
      <div className={`text-[1.6vh] font-bold ${post.category === '매칭' ? 'text-green-500' : 'text-orange-500'}`}>
        {post.category === '매칭' ? '매칭 대기' : '모집 중'}
      </div>
    </div>
  );
};

export default FeedCard;
