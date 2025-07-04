import { Link, useLocation } from 'react-router-dom';
import {
  MdHome,
  MdGroup,
  MdSportsSoccer,
  MdMap,
  MdAccountCircle,
} from 'react-icons/md';
import styled from 'styled-components';

const TabBar = styled.nav`
  position: fixed;
  bottom: 0;
  width: 50vh;
  max-width: 100vw;
  background-color: #ffffff;
  height: 7vh;
  display: flex;
  justify-content: space-around;
  align-items: center;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
  left: 50%;
  transform: translateX(-50%);
  z-index: 1001;
`;

const TabItem = styled(Link)`
  color: ${(props) => (props.$active === 'true' ? '#00C851' : '#ccc')};
  font-size: 2.5vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-decoration: none;
  gap: 0.5vh;
`;

const Label = styled.span`
  font-size: 1.2vh;
`;

const BottomTab = () => {
  const location = useLocation();

  return (
    <TabBar>
      <TabItem to="/main" $active={(location.pathname === '/main').toString()}>
        <MdHome />
        <Label>홈</Label>
      </TabItem>
      <TabItem to="/teams" $active={(location.pathname === '/teams').toString()}>
        <MdGroup />
        <Label>팀 목록</Label>
      </TabItem>
      <TabItem to="/feed" $active={(location.pathname === '/feed').toString()}>
        <MdSportsSoccer />
        <Label>경기 모집</Label>
      </TabItem>
      <TabItem to="/lib" $active={(location.pathname === '/lib').toString()}>
        <MdMap />
        <Label>전술</Label>
      </TabItem>
      <TabItem to="/profile" $active={(location.pathname === '/profile').toString()}>
        <MdAccountCircle />
        <Label>프로필</Label>
      </TabItem>
    </TabBar>
  );
};

export default BottomTab;
