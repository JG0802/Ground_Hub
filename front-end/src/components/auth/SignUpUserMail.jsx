const SignUpUserMail = ({ value, onChange, onNext }) => {
  const handleContinue = async () => {
    if (!value) {
      alert('이메일을 입력하세요.');
      return;
    }
    if (!value.includes('@')) {
      alert('이메일 형식이 올바르지 않습니다.');
      return;
    }
    try {
      const response = await fetch(`/api/users/userMail-check?userMail=${encodeURIComponent(value)}`, { method: 'GET' });

      if (response.ok) {
        alert('이미 존재하는 이메일입니다.');
        return;
      } else {
        onNext();
      }
    } catch (error) {
      console.error('서버 요청 중 오류:', error);
      alert('서버 요청 중 문제가 발생했습니다.');
    }
  };

  return (
    <form className="mx-auto w-full max-w-[288px] mt-[4vh] flex flex-col gap-[20px]">
      <div className="relative flex flex-col">
        <label className="text-[16px] text-[#6F6F6F] mb-[5px]">이메일</label>
        <input
          type="email"
          placeholder="이메일을 입력하세요"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full h-[42px] bg-[#FAFAFA] rounded-[10px] px-4 text-[15px] focus:outline-green-500"
        />
        {value && (
          <button
            type="button"
            onClick={() => onChange('')}
            className="absolute right-3 top-[35px] text-gray-400 hover:text-gray-600 text-[18px] font-bold"
          >
            ×
          </button>
        )}
      </div>

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

export default SignUpUserMail;
