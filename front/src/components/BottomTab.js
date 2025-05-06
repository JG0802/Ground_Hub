// src/components/BottomTab.js
import { Link, useLocation } from 'react-router-dom';
import { MdStars, MdGroups, MdList, MdInbox, MdAccountCircle } from 'react-icons/md';
import styled from 'styled-components';

const TabBar = styled.nav`
  position: fixed;
  bottom: 0;
  width: 100%;
  max-width: 430px;
  background-color: #ffffff;
  height: 56px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  border-top: 1px solid #ddd;
  z-index: 999;
  left: 50%;
  transform: translateX(-50%); /* 화면 가운데 고정 */
`;

const TabItem = styled(Link)`
  color: ${(props) => (props.$active === 'true' ? '#000' : '#ccc')};
  font-size: 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-decoration: none;
`;

const BottomTab = () => {
  const location = useLocation();

  return (
    <TabBar>
      <TabItem to="/main" $active={(location.pathname === '/main').toString()}>
        <MdStars />
      </TabItem>
      <TabItem to="/teams" $active={(location.pathname === '/teams').toString()}>
        <MdGroups />
      </TabItem>
      <TabItem to="/feed" $active={(location.pathname === '/feed').toString()}>
        <MdList />
      </TabItem>
      <TabItem to="/formation" $active={(location.pathname === '/formation').toString()}>
        <MdInbox />
      </TabItem>
      <TabItem to="/profile" $active={(location.pathname === '/profile').toString()}>
        <MdAccountCircle />
      </TabItem>
    </TabBar>
  );
};

export default BottomTab;
