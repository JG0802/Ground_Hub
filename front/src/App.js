import { Routes, Route, useLocation } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import MainPage from './pages/MainPage';
import TeamListPage from './pages/TeamListPage';
import FeedPage from './pages/FeedPage';
import FormationPage from './pages/FormationPage';
import ProfilePage from './pages/ProfilePage';
import SignUpEmailPage from './pages/SignUpEmailPage';
import SignUpPasswordPage from './pages/SignUpPasswordPage';
import SelectPositionPage from './pages/SelectPositionPage';
import FormationDetailPage from './pages/FormationDetailPage';
import BottomTab from './components/BottomTab';
import MyTeamPage from './pages/MyTeamPage';
import TeamDetailPage from './pages/TeamDetailPage';
import PositionPage from './pages/PositionPage';
import PositionUpdatePage from './pages/PositionUpdatePage';
import CheckPasswordPage from './pages/CheckPasswordPage';
import ChangeProfilePage from './pages/ChangeProfilePage';
import ChangePasswordPage from './pages/ChangePasswordPage';
import TeamUpdatePage from './pages/TeamUpdatePage';
import CreateGamePage from './pages/CreateGamePage';
import SchedulePage from './pages/SchedulePage';
import MySchedulePage from './pages/MySchedulePage';
import Header from './components/common/Header';
import PRGameCheckPage from './pages/PRGameCheckPage';
import PRGameCreatePage from './pages/PRGameCreatePage';
import PRGamesListPage from './pages/PRGamesListPage';
import { useState } from 'react';
import PRGamesPage from './pages/PRGamesPage';
import PRGamePage from './pages/PRGamePage';
import PRGameUpdatePage from './pages/PRGameUpdatePage';

const App = () => {
  const location = useLocation();

  // 게시판 자동 업로드용 상태
  const [teamFeedPosts, setTeamFeedPosts] = useState([]);

  // 로그인/회원가입 관련 경로에서는 BottomTab 숨기기
  const hideTabPaths = ['/', '/signup', '/signup/password', '/signup/position'];
  const shouldShowBottomTab = !hideTabPaths.includes(location.pathname);
  const shouldShowHeader = !hideTabPaths.includes(location.pathname);

  return (
    <>
      {shouldShowHeader && <Header />} {/* ✅ Header 출력 */}
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/signup/password" element={<SignUpPasswordPage />} />
        <Route path="/signup/position" element={<SelectPositionPage />} />
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
        <Route path="/myteam" element={<MyTeamPage />} />
        <Route path="/teams/:id" element={<TeamDetailPage />} />
        <Route path="/position/view/:id" element={<PositionPage />} />
        <Route path="/position/update/:id" element={<PositionUpdatePage />} />
        <Route path="/user/checkpassword" element={<CheckPasswordPage />} />
        <Route path="/user/change/info" element={<ChangeProfilePage />} />
        <Route path="/user/change/password" element={<ChangePasswordPage />} />
        <Route path="/team/update/:id" element={<TeamUpdatePage />} />
        <Route path="/game/create" element={<CreateGamePage />} />
        <Route path="/schedule" element={<SchedulePage />} />
        <Route path="/my-schedule" element={<MySchedulePage />} />
        <Route path="/pr/check/:prGameId" element={<PRGameCheckPage />} />
        <Route path="/pr/create" element={<PRGameCreatePage />} />
        <Route path="/pr/list/:gameId" element={<PRGamesListPage />} />
        <Route path="/user/pr/list/:prGameId" element={<PRGamesPage />} />
        <Route path="/user/pr/:prGameId" element={<PRGamePage />} />
        <Route path="/pr/update/:prGameId" element={<PRGameUpdatePage />} />
      </Routes>
      {shouldShowBottomTab && <BottomTab />}
    </>
  );
};

export default App;
