
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ProfileForm = () => {
  const [userData, setUserData] = useState(null);
  const userMail = sessionStorage.getItem('userMail');
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`/api/users/check/${userMail}`)
      .then(res => res.ok ? res.json() : Promise.reject(res))
      .then(setUserData)
      .catch(err => console.error(err));
  }, [userMail]);

  if (!userData) return (<div className="text-center py-8">Loading...</div>);

  return (
    <div className="pt-[12vh] px-4 pb-[10vh] flex flex-col items-center">

      {/* 프로필 카드 */}
      <div className="bg-white w-full max-w-lg rounded-2xl shadow-lg p-6 text-center">

        {/* 프로필 이미지 */}
        <div className="relative mx-auto w-28 h-28 md:w-24 md:h-24 sm:w-20 sm:h-20 rounded-full border-4 border-gray-300 shadow-md overflow-hidden mb-3">
          {userData.profileImage ? (
            <img src={userData.profileImage} alt="profile" className="w-full h-full object-cover" />
          ) : (
            <span className="text-5xl md:text-4xl sm:text-3xl flex items-center justify-center h-full">👤</span>
          )}
        </div>

        {/* 닉네임 */}
        <h2 className="text-[2.6vh] md:text-[2.2vh] sm:text-[2vh] font-bold text-gray-800 tracking-tight mb-1">{userData.userName}</h2>

        {/* 포지션 뱃지 */}
        <div className="flex justify-center gap-2 flex-wrap mb-4">
          {[userData.firstPosition, userData.secondPosition, userData.thirdPosition]
            .filter(Boolean)
            .map(pos => (
              <span key={pos} className="bg-gray-100 px-3 py-1 rounded-full text-sm border border-gray-300 text-[1.6vh] md:text-[1.4vh] sm:text-[1.2vh]">{pos}</span>
            ))
          }
        </div>

        {/* 전화번호 */}
        <div className="bg-gray-100 px-4 py-2 rounded-lg text-left mb-4 text-base md:text-sm sm:text-xs text-gray-600">{userData.tel}</div>

        {/* 설정 리스트 */}
        <ul className="divide-y divide-gray-300">
          <li
            onClick={() => navigate('/user/checkpassword')}
            className="flex items-center justify-between py-5 px-2 cursor-pointer hover:bg-gray-50 transition group"
          >
            <span className="text-gray-600 text-[1.8vh] md:text-[1.6vh] sm:text-[1.4vh]">회원정보 편집</span>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor"
              className="h-5 w-5 text-gray-400 group-hover:text-gray-800 group-hover:translate-x-1 transition">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </li>
          <li
            onClick={() => navigate('/user/change/password')}
            className="flex items-center justify-between py-5 px-2 cursor-pointer hover:bg-gray-50 transition group"
          >
            <span className="text-gray-600 text-[1.8vh] md:text-[1.6vh] sm:text-[1.4vh]">비밀번호 변경</span>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor"
              className="h-5 w-5 text-gray-400 group-hover:text-gray-800 group-hover:translate-x-1 transition">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </li>
          <li
            onClick={() => {
              sessionStorage.removeItem('userMail');
              navigate('/');
            }}
            className="flex items-center justify-between py-5 px-2 cursor-pointer text-red-500 hover:bg-red-50 transition group"
          >
            <span className="group-hover:font-bold text-[1.8vh] md:text-[1.6vh] sm:text-[1.4vh]">로그아웃</span>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor"
              className="h-5 w-5 text-red-400 group-hover:text-red-500 group-hover:translate-x-1 transition">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ProfileForm;