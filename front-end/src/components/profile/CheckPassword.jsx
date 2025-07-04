import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CheckPassword = ({ onSuccess, mode }) => {
  const userMail = sessionStorage.getItem('userMail');
  const [password, setPassword] = useState('');
  const [isLoading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleCheckPassword = async (event) => {
    event.preventDefault();

    if (!userMail) {
      alert('다시 로그인 하세요.');
      navigate('/');
      return;
    }

    if (!password) {
      alert('비밀번호를 입력하세요.');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userMail, password }),
      });

      if (response.ok) {
        const data = await response.json();
        sessionStorage.setItem('userData', JSON.stringify(data));
        sessionStorage.setItem('userMail', userMail);
        sessionStorage.setItem('password', password);
        onSuccess(mode);
      } else {
        alert('잘못된 비밀번호입니다.');
      }
    } catch (err) {
      console.error('로그인 오류:', err);
      alert('서버와의 통신 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[100vh] bg-[#f9f9f9] px-[2vh]">
      <form
        onSubmit={handleCheckPassword}
        className="w-full max-w-[400px] bg-white p-[4vh] rounded-2xl shadow flex flex-col items-center"
      >
        <h2 className="text-[2.4vh] font-bold mb-[4vh]">비밀번호 확인</h2>

        <div className="relative w-full mb-[2vh]">
          <input
            type="password"
            placeholder="비밀번호 입력"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-gray-300 rounded-[0.7vh] p-[1.5vh] pr-[4.5vh] text-[1.8vh] focus:outline-green-500 transition-colors"
          />
          {password && (
            <button
              type="button"
              onClick={() => setPassword('')}
              className="absolute right-[1.5vh] top-1/2 transform -translate-y-1/2 p-[0.8vh] rounded-full hover:bg-gray-100 transition"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.8}
                stroke="currentColor"
                className="w-[2vh] h-[2vh] text-gray-400"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          )}
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full h-[5.5vh] bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium rounded-xl transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? '확인 중...' : '확인'}
        </button>
      </form>
    </div>
  );
};

export default CheckPassword;
