import { useState } from 'react';

const SignUpInfo = ({ value, onChange, onNext }) => {
  const handleInputChange = (field) => (e) => {
    onChange({ ...value, [field]: e.target.value });
  };
  const [passwordCheck, setPasswordCheck] = useState('');

  const handleContinue = () => {
    if (!value.password || !passwordCheck || !value.tel || !value.userName) {
      alert('모든 항목을 입력해주세요.');
      return;
    }

    if (value.password !== passwordCheck) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }

    onNext();
  };

  return (
    <form className="mx-auto w-full max-w-[288px] mt-[4vh] flex flex-col gap-[20px]">
      {/* 이름 */}
      <div className="relative flex flex-col">
        <label className="text-[16px] text-[#6F6F6F] mb-[5px]">이름</label>
        <input
          type="text"
          placeholder="이름"
          value={value.userName}
          onChange={handleInputChange('userName')}
          className="w-full h-[42px] bg-[#FAFAFA] rounded-[10px] px-4 text-[15px] focus:outline-green-500"
        />
      </div>

      {/* 전화번호 */}
      <div className="relative flex flex-col">
        <label className="text-[16px] text-[#6F6F6F] mb-[5px]">전화번호</label>
        <input
          type="tel"
          placeholder="010-1234-5678"
          value={value.tel}
          onChange={handleInputChange('tel')}
          className="w-full h-[42px] bg-[#FAFAFA] rounded-[10px] px-4 text-[15px] focus:outline-green-500"
        />
      </div>

      {/* 비밀번호 */}
      <div className="relative flex flex-col">
        <label className="text-[16px] text-[#6F6F6F] mb-[5px]">비밀번호</label>
        <input
          type="password"
          placeholder="비밀번호 입력"
          value={value.password}
          onChange={handleInputChange('password')}
          className="w-full h-[42px] bg-[#FAFAFA] rounded-[10px] px-4 text-[15px] focus:outline-green-500"
        />
      </div>

      {/* 비밀번호 확인 */}
      <div className="relative flex flex-col">
        <label className="text-[16px] text-[#6F6F6F] mb-[5px]">비밀번호 확인</label>
        <input
          type="password"
          placeholder="비밀번호 확인"
          value={passwordCheck}
          onChange={(e) => setPasswordCheck(e.target.value)}
          className="w-full h-[42px] bg-[#FAFAFA] rounded-[10px] px-4 text-[15px] focus:outline-green-500"
        />
      </div>

      {/* 계속 버튼 */}
      <button
        type="button"
        onClick={handleContinue}
        className="w-full h-[42px] bg-[#00B140] rounded-[10px] text-white font-semibold text-[15px] hover:opacity-90"
      >
        계속
      </button>
    </form>
  );
};

export default SignUpInfo;
