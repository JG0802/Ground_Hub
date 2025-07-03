import MyTeamList from '../../components/myTeam/MyTeamList';

const MyTeamListPage = () => {
  return (
    <div className="w-full max-w-[768px] mx-auto min-h-[calc(100vh-12vh)] bg-[#f9f9f9] p-[7vh_2vw_10vh]">
      <div className="w-full max-w-[50vh] mx-auto">
        <h1 className="text-[2.4vh] font-bold text-center mb-[3vh] mt-[2vh]">My Teams</h1>
        <MyTeamList />
      </div>
    </div>
  );
};

export default MyTeamListPage;
