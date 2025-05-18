import { useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';

import LoginPage from './pages/LoginPage';
import MainPage from './pages/MainPage';
import TeamListPage from './pages/TeamListPage';
import TeamDetailPage from './pages/TeamDetailPage';
import FeedPage from './pages/FeedPage';
import FormationPage from './pages/FormationPage';
import ProfilePage from './pages/ProfilePage';
import SignUpEmailPage from './pages/SignUpEmailPage';
import SignUpPasswordPage from './pages/SignUpPasswordPage';
import SelectPositionPage from './pages/SelectPositionPage';
import FormationDetailPage from './pages/FormationDetailPage';
import BottomTab from './components/BottomTab';
import Header from './components/common/Header'; // ✅ Header import

const App = () => {
  const location = useLocation();

  // 게시판 자동 업로드용 상태
  const [teamFeedPosts, setTeamFeedPosts] = useState([]);

  // 로그인/회원가입 관련 경로에서는 BottomTab, Header 숨기기
  const hideTabPaths = ['/', '/signup', '/signup/password', '/signup/position'];
  const shouldShowBottomTab = !hideTabPaths.includes(location.pathname);
  const shouldShowHeader = !hideTabPaths.includes(location.pathname); // ✅ Header도 동일 조건으로

  return (
    <>
      {shouldShowHeader && <Header />} {/* ✅ Header 출력 */}

      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/main" element={<MainPage />} />
        <Route
          path="/teams"
          element={<TeamListPage setTeamFeedPosts={setTeamFeedPosts} />}
        />
        <Route
          path="/feed"
          element={<FeedPage teamFeedPosts={teamFeedPosts} />}
        />
        <Route path="/formation" element={<FormationPage />} />
        <Route path="/formation/:id" element={<FormationDetailPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/signup" element={<SignUpEmailPage />} />
        <Route path="/signup/password" element={<SignUpPasswordPage />} />
        <Route path="/signup/position" element={<SelectPositionPage />} />
        <Route path="/teams/:id" element={<TeamDetailPage />} />
      </Routes>

      {shouldShowBottomTab && <BottomTab />}
    </>
  );
};

export default App;
