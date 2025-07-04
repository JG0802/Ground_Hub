import { useEffect, useState } from 'react';

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const userMail = sessionStorage.getItem('userMail');

  useEffect(() => {
    fetch(`/api/users/check/${userMail}`)
      .then(res => res.ok ? res.json() : Promise.reject(res))
      .then(setUserData)
      .catch(err => console.error(err));
  }, [userMail]);

  if (!userData) return <div className="text-center py-8">Loading...</div>;

  return (
    <>
      {/* 프로필 이미지 */}
      <div className="relative mx-auto w-28 h-28 rounded-full border-4 border-gray-300 shadow-md overflow-hidden mb-3">
        {userData.profileImage ? (
          <img src={userData.profileImage} alt="profile" className="w-full h-full object-cover" />
        ) : (
          <span className="text-5xl flex items-center justify-center h-full">👤</span>
        )}
      </div>

      {/* 닉네임 */}
      <h2 className="text-[2.6vh] font-bold text-gray-800 tracking-tight mb-1 text-center">{userData.userName}</h2>

      {/* 포지션 뱃지 */}
      <div className="flex justify-center gap-2 flex-wrap mb-4">
        {[userData.firstPosition, userData.secondPosition, userData.thirdPosition]
          .filter(Boolean)
          .map(pos => (
            <span key={pos} className="bg-gray-100 px-3 py-1 rounded-full text-sm border border-gray-300">{pos}</span>
          ))}
      </div>

      {/* 전화번호 */}
      <div className="bg-gray-100 px-4 py-2 rounded-lg text-base text-gray-600 mb-4 text-left">{userData.tel}</div>
    </>
  );
};

export default Profile;
