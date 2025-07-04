import field from '../../img/field.png';

const SignUpPosition = ({ value, onChange, onSubmit }) => {
  const togglePosition = (position) => {
    if (value.includes(position)) {
      onChange(value.filter((p) => p !== position));
    } else if (value.length < 3) {
      onChange([...value, position]);
    } else {
      alert('최대 3개까지 선택 가능합니다.');
    }
  };

  const renderButton = (top, left, position) => (
    <button
      className={`absolute flex justify-center items-center border-2 border-black rounded-full w-[8.2vh] h-[4vh] text-[1.5vh] transition-all duration-300 hover:scale-105 ${
        value.includes(position) ? 'bg-[#00B140] text-white' : 'bg-[rgba(240,228,57,0.7)] text-black'
      }`}
      style={{ top, left }}
      onClick={() => togglePosition(position)}
    >
      {value.includes(position) && (
        <span className="absolute -top-[1vh] -right-[1vh] w-[2vh] h-[2vh] flex justify-center items-center rounded-full bg-white text-[#00B140] text-[1.4vh] border border-[#00B140]">
          ✔
        </span>
      )}
      {position}
    </button>
  );

  return (
    <div className="flex flex-col items-center">
      <p className="mb-[2vh] text-[1.7vh] font-bold text-[#00B140]">
        선택한 포지션: {value.join(', ')}
      </p>

      <div
        className="relative w-[49vh] h-[42vh] mb-[2vh] bg-center bg-no-repeat bg-cover"
        style={{ backgroundImage: `url(${field})` }}
      >
        <div className="absolute w-full h-full">
          {renderButton('1vh', '20.3vh', 'ST')}
          {renderButton('4vh', '11.6vh', 'LS')}
          {renderButton('4vh', '29vh', 'RS')}
          {renderButton('7vh', '3.6vh', 'LW')}
          {renderButton('7vh', '20.3vh', 'CF')}
          {renderButton('7vh', '37.6vh', 'RW')}
          {renderButton('13vh', '11.6vh', 'LAM')}
          {renderButton('13vh', '20.3vh', 'CAM')}
          {renderButton('13vh', '29vh', 'RAM')}
          {renderButton('19vh', '3vh', 'LM')}
          {renderButton('19vh', '11.6vh', 'LCM')}
          {renderButton('19vh', '20.3vh', 'CM')}
          {renderButton('19vh', '29vh', 'RCM')}
          {renderButton('19vh', '37.6vh', 'RM')}
          {renderButton('25vh', '3vh', 'LWB')}
          {renderButton('25vh', '11.6vh', 'LDM')}
          {renderButton('25vh', '20.3vh', 'CDM')}
          {renderButton('25vh', '29vh', 'RDM')}
          {renderButton('25vh', '37.6vh', 'RWB')}
          {renderButton('31vh', '3vh', 'LB')}
          {renderButton('31vh', '11.6vh', 'LCB')}
          {renderButton('31vh', '20.3vh', 'SW')}
          {renderButton('31vh', '29vh', 'RCB')}
          {renderButton('31vh', '37.6vh', 'RB')}
          {renderButton('37vh', '20.3vh', 'GK')}
        </div>
      </div>

      <button
        onClick={onSubmit}
        disabled={value.length !== 3}
        className={`w-[90%] h-[6vh] text-white text-[2vh] rounded-[6px] mb-[2vh] transition-colors duration-300 ${
          value.length === 3 ? 'bg-black cursor-pointer hover:opacity-90' : 'bg-gray-300 cursor-not-allowed'
        }`}
      >
        회원가입 완료
      </button>
    </div>
  );
};

export default SignUpPosition;
