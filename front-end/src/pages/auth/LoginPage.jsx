import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const LoginPage = () => {
  const [userMail, setUserMail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();

    if (!userMail || !password) {
      alert("아이디와 비밀번호를 입력하세요.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userMail, password }),
      });

      if (response.ok) {
        sessionStorage.setItem("userMail", userMail);
        navigate("/main");
      } else {
        const errMsg = await response.text();
        alert(errMsg || "로그인 실패: 아이디 또는 비밀번호를 확인하세요.");
      }
    } catch (err) {
      console.error("로그인 오류:", err);
      alert("서버와의 통신 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col justify-center items-center px-6 relative">
      <h1 className="text-green-600 text-[45px] font-extrabold font-['Poppins']">Ground Hub</h1>
      <h2 className="mt-[3vh] text-[26px] font-semibold text-black">계정에 로그인하세요</h2>

      <form onSubmit={handleLogin} className="mx-auto w-full max-w-[288px] mt-[4vh] flex flex-col gap-[20px]">
        <div className="relative flex flex-col">
          <label className="text-[16px] text-[#6F6F6F] mb-[5px]">이메일</label>
          <input
            type="email"
            value={userMail}
            placeholder="이메일을 입력하세요"
            onChange={(e) => setUserMail(e.target.value)}
            className="w-full h-[42px] bg-[#FAFAFA] rounded-[10px] px-4 text-[15px] focus:outline-green-500"
          />
          {userMail && (
            <button
              type="button"
              onClick={() => setUserMail('')}
              className="absolute right-3 top-[35px] text-gray-400 hover:text-gray-600 text-[18px] font-bold"
            >
              ×
            </button>
          )}
        </div>

        <div className="relative flex flex-col">
          <label className="text-[16px] text-[#6F6F6F] mb-[5px]">비밀번호</label>
          <input
            type="password"
            value={password}
            placeholder="비밀번호를 입력하세요"
            onChange={(e) => setPassword(e.target.value)}
            className="w-full h-[42px] bg-[#FAFAFA] rounded-[10px] px-4 text-[15px] focus:outline-green-500"
          />
          {password && (
            <button
              type="button"
              onClick={() => setPassword('')}
              className="absolute right-3 top-[35px] text-gray-400 hover:text-gray-600 text-[18px] font-bold"
            >
              ×
            </button>
          )}
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full h-[42px] bg-[#00B140] rounded-[10px] text-white font-semibold text-[15px] hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? "로그인 중..." : "로그인"}
        </button>
      </form>

      <div className="mt-[6vh] text-[16px] text-gray-500">
        <span>아직 계정이 없으신가요?&nbsp;</span>
        <Link to="/signup" className="text-[#00B140] hover:underline">회원가입</Link>
      </div>
    </div>
  );
};

export default LoginPage;
