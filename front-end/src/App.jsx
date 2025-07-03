import { Routes, Route, useLocation } from 'react-router-dom';
import { useState } from 'react'
import './App.css'
import Header from './components/common/Header';
import BottomTab from './components/common/BottomTab';
import LoginPage from './pages/auth/LoginPage';
import SignUpPage from './pages/auth/SignUpPage';
import MainPage from './pages/main/MainPage';
import TeamListPage from './pages/teams/TeamListPage';
import FeedPage from './pages/feed/FeedPage';
import FeedDetailPage from './pages/feed/FeedDetailPage';
import LibPage from './pages/lib/LibPage';
import LibDetailPage from './pages/lib/LibDetailPage';
import ProfilePage from './pages/profile/ProfilePage';
import ProfileUpdatePage from './pages/profile/ProfileUpdatePage';
import MyTeamListPage from './pages/myTeam/MyTeamListPage';
import MyScheduleListPage from './pages/schedule/MyScheduleListPage';
import CalenderPage from './pages/schedule/CalenderPage';
import TeamDetailPage from './pages/teams/TeamDetailPage';
import TeamUpdatePage from './pages/teams/TeamUpdatePage';
import CreateGamePage from './pages/game/CreateGamePage';

import PositionPage from './pages/PositionPage';
import PositionUpdatePage from './pages/PositionUpdatePage';
import PRGameCheckPage from './pages/PRGameCheckPage';
import PRGameCreatePage from './pages/PRGameCreatePage';
import PRGamesListPage from './pages/PRGamesListPage';
import PRGamesPage from './pages/PRGamesPage';
import PRGamePage from './pages/PRGamePage';
import PRGameUpdatePage from './pages/PRGameUpdatePage';

function App() {
  const location = useLocation();

  // 게시판 자동 업로드용 상태
  const [teamFeedPosts, setTeamFeedPosts] = useState([]);

  // 로그인/회원가입 관련 경로에서는 BottomTab 숨기기
  const hideTabPaths = ['/', '/signup', '/signup/password', '/signup/position'];
  const shouldShowBottomTab = !hideTabPaths.includes(location.pathname);
  const shouldShowHeader = !hideTabPaths.includes(location.pathname);

  return (
    <>
      {/* Header */}
      {shouldShowHeader && <Header />}
      <Routes>
        {/* auth */}
        <Route path="/" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />

        {/* main */}
        <Route path='/main' element={<MainPage />} />

        {/* teams */}
        <Route path='/teams' element={<TeamListPage />} />
        <Route path="/team/:teamId" element={<TeamDetailPage />} />
        <Route path="/team/update/:teamId" element={<TeamUpdatePage />} />

        {/* feed */}
        <Route
          path="/feed"
          element={<FeedPage teamFeedPosts={teamFeedPosts} />}
        />
        <Route path="/feed/:contentId" element={<FeedDetailPage />} />

        {/* lib */}
        <Route path="/lib" element={<LibPage />} />
        <Route path="/lib/detail/:type/:id" element={<LibDetailPage />} />

        {/* profile */}
        <Route path="/profile" element={<ProfilePage />} />
        <Route path='/profile/update' element={<ProfileUpdatePage />} />

        {/* myTeam */}
        <Route path='/my-team' element={<MyTeamListPage />} />

        {/* schedule */}
        <Route path='/my-schedule' element={<MyScheduleListPage />} />
        <Route path='/calender' element={<CalenderPage />} />

        {/* game */}
        <Route path='/game/create' element={<CreateGamePage />} />

        <Route path="/game/:id" element={<PositionPage />} />
        <Route path="/position/update/:id" element={<PositionUpdatePage />} />

        <Route path="/pr/check/:prGameId" element={<PRGameCheckPage />} />
        <Route path="/pr/create" element={<PRGameCreatePage />} />
        <Route path="/pr/list/:gameId" element={<PRGamesListPage />} />
        <Route path="/user/pr/list/:prGameId" element={<PRGamesPage />} />
        <Route path="/user/pr/:prGameId" element={<PRGamePage />} />
        <Route path="/pr/update/:prGameId" element={<PRGameUpdatePage />} />
      </Routes>
      {shouldShowBottomTab && <BottomTab />}
    </>
  )
}

export default App
