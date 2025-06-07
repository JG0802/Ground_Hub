// components/common/Header.js
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const HeaderWrapper = styled.header`
  position: fixed;
  text-align: left;
  font-size: 3vh;
  font-family: 'MarinesBold', sans-serif;
  padding: 2vh 0;
  width: 100%;
  z-index: 9999;
  background-color: #f9f9f9;
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
