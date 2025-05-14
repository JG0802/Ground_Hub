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

const App = () => {
  const location = useLocation();

  // 로그인/회원가입 관련 경로에서는 BottomTab 숨기기
  const hideTabPaths = ['/', '/signup', '/signup/password', '/signup/position'];
  const shouldShowBottomTab = !hideTabPaths.includes(location.pathname);

  return (
    <>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/main" element={<MainPage />} />
        <Route path="/teams" element={<TeamListPage />} />
        <Route path="/feed" element={<FeedPage />} />
        <Route path="/formation" element={<FormationPage />} />
        <Route path="/formation/:id" element={<FormationDetailPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/signup" element={<SignUpEmailPage />} />
        <Route path="/signup/password" element={<SignUpPasswordPage />} />
        <Route path="/signup/position" element={<SelectPositionPage />} />
        <Route path="/myteam" element={<MyTeamPage />} />
        <Route path="/teams/:id" element={<TeamDetailPage />} />
        <Route path="/game/:id" element={<PositionPage />} />
      </Routes>

      {shouldShowBottomTab && <BottomTab />}
    </>
  );
};

export default App;
