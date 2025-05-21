// components/common/Header.js
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const HeaderWrapper = styled.header`
  text-align: left;
  font-size: 3vh;
  font-family: 'MarinesBold', sans-serif;
  padding: 2vh 0;
  width: 100%;
  max-width: 430px;
  border-bottom: 1px solid #ddd;
  &:hover {
    cursor: pointer;
  }
`;

const Header = () => {
  const navigate = useNavigate();

  const hanbleMove = () => {
    navigate('/main');
  };

  return <HeaderWrapper onClick={hanbleMove}>Ground Hub</HeaderWrapper>;
};

export default Header;
