import { useState } from "react";
import SignUpUserMail from "./SignUpUserMail";
import styled from 'styled-components';
import SignUpInfo from "./SignUpInfo";
import SignUpPosition from "./SignUpPosition";
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
  width: 100%;
`;

function SignUp() {
  const [step, setStep] = useState(1);
  const [userMail, setUserMail] = useState('');
  const navigate = useNavigate();
  const [info, setInfo] = useState({
    password: '',
    userName: '',
    tel: '',
  });
  const [selected, setSelected] = useState([]);

  const handleSubmit = async () => {
    try {
      const response = await fetch('/api/users/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userMail: userMail,
          password: info.password,
          userName: info.userName,
          tel: info.tel,
          firstPosition: selected[0],
          secondPosition: selected[1],
          thirdPosition: selected[2],
        }),
      });

      if (response.ok) {
        alert('회원가입 완료!');
        navigate('/');
      } else {
        const err = await response.text();
        alert(err || '포지션 설정 실패');
      }
    } catch (error) {
      console.error('서버 요청 중 오류:', error);
      alert('서버 요청 중 문제가 발생했습니다.');
    }
  };

  return (
    // 부모 div에 flex 중앙정렬 추가
    <div className="flex justify-center w-full">
      <Container>
        {step === 1 && (
          <SignUpUserMail
            value={userMail}
            onChange={setUserMail}
            onNext={() => setStep(2)}
          />
        )}
        {step === 2 && (
          <SignUpInfo
            value={info}
            onChange={setInfo}
            onNext={() => setStep(3)}
          />
        )}
        {step === 3 && (
          <SignUpPosition
            value={selected}
            onChange={setSelected}
            onSubmit={handleSubmit}
          />
        )}
      </Container>
    </div>
  );
}

export default SignUp;
