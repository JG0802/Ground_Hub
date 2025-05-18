// components/common/Header.js
import styled from 'styled-components';

const HeaderWrapper = styled.header`
  text-align: left;
  font-size: 3vh;
  font-family: 'MarinesBold', sans-serif;
  padding: 2vh 0;
`;

const Header = () => {
  return <HeaderWrapper>Ground Hub</HeaderWrapper>;
};

export default Header;
