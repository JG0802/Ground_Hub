import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import OverlabLogo from '../../img/overlab_logo.png';

const HeaderWrapper = styled.header`
  position: fixed;
  text-align: left;
  font-size: 3vh;
  font-family: "MarinesBold", sans-serif;
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
    navigate("/main");
  };

  return (
    <HeaderWrapper onClick={hanbleMove}>
      <img src={OverlabLogo} alt="OVERLAB 로고" style={{ height: '4vh' }} />
    </HeaderWrapper>
  );
};

export default Header;
