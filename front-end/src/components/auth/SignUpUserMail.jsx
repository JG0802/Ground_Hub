import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const StyledInput = styled.input`
  width: 90%;
  height: 6vh;
  font-size: 2vh;
  border-radius: 6px;
  border: 1px solid #b9b9b9;
  padding: 1vh;
  margin-bottom: 2vh;
  box-sizing: border-box;
`;

const StyledButton = styled.button`
  background-color: black;
  color: white;
  width: 90%;
  height: 6vh;
  font-size: 2vh;
  border-radius: 6px;
  margin-bottom: 2vh;
  box-sizing: border-box;
  border: none;
  &:hover {
    cursor: pointer;
  }
`;

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
      const response = await fetch(
        `/api/users/userMail-check?userMail=${encodeURIComponent(value)}`,
        {
          method: 'GET',
        },
      );

      if (response.ok) {
        alert('사용자가 존재합니다.');
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
    <Container>
      <StyledInput
        type="email"
        placeholder="Email@domain.com"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      <StyledButton onClick={handleContinue}>계속</StyledButton>
    </Container>
  );
};

export default SignUpUserMail;
