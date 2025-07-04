import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ChangePassword = () => {
  const [newPassword, setNewPassword] = useState('');
  const [newPasswordCheck, setNewPasswordCheck] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const userMail = sessionStorage.getItem('userMail');
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!newPassword || !newPasswordCheck) {
      alert('모든 항목을 입력해주세요.');
      return;
    }

    if (newPassword !== newPasswordCheck) {
      alert('새 비밀번호가 일치하지 않습니다.');
      return;
    }

    setIsLoading(true);

    try {
      const res = await fetch('/api/users/update/password', {  // 비밀번호 전용 API라면 이렇게 분리 추천
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userMail,
          password: newPassword,
        }),
      });

      if (res.ok) {
        alert('비밀번호 변경 완료!');
        sessionStorage.setItem('password', newPassword);
        navigate('/profile');
      } else {
        alert(await res.text());
      }
    } catch (err) {
      console.error(err);
      alert('비밀번호 변경 중 오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[100vh] bg-[#f9f9f9] px-[2vh]">
      <div className="w-full max-w-[400px] bg-white p-[4vh] rounded-2xl shadow flex flex-col items-center">
        <h2 className="text-[2.4vh] font-bold mb-[4vh]">비밀번호 변경</h2>

        {/* 새 비밀번호 */}
        <div className="relative w-full mb-[2vh]">
          <input
            type="password"
            placeholder="새 비밀번호"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full border border-gray-300 rounded-[0.7vh] p-[1.5vh] text-[1.8vh] focus:outline-green-500"
          />
          {newPassword && (
            <button
              type="button"
              onClick={() => setNewPassword('')}
              className="absolute right-[1.5vh] top-1/2 transform -translate-y-1/2 p-[0.8vh] rounded-full hover:bg-gray-100 transition"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="w-[2vh] h-[2vh] text-gray-400">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>

        {/* 새 비밀번호 확인 */}
        <div className="relative w-full mb-[2vh]">
          <input
            type="password"
            placeholder="새 비밀번호 확인"
            value={newPasswordCheck}
            onChange={(e) => setNewPasswordCheck(e.target.value)}
            className="w-full border border-gray-300 rounded-[0.7vh] p-[1.5vh] text-[1.8vh] focus:outline-green-500"
          />
          {newPasswordCheck && (
            <button
              type="button"
              onClick={() => setNewPasswordCheck('')}
              className="absolute right-[1.5vh] top-1/2 transform -translate-y-1/2 p-[0.8vh] rounded-full hover:bg-gray-100 transition"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="w-[2vh] h-[2vh] text-gray-400">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>

        {/* 변경 버튼 */}
        <button
          onClick={handleSubmit}
          disabled={isLoading}
          className="w-full h-[5.5vh] bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium rounded-xl transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? '변경 중...' : '변경'}
        </button>
      </div>
    </div>
  );
};

export default ChangePassword;
