import MyScheduleList from '../../components/schedule/MyScheduleList';

const MyScheduleListPage = () => {
  return (
    <div className="w-full max-w-[768px] mx-auto min-h-[calc(100vh-12vh)] bg-[#f9f9f9] p-[8vh_2vw_6vh]">
      <h1 className="text-[2.4vh] font-bold text-center mb-[3vh]">경기 일정</h1>
      <MyScheduleList />
    </div>
  );
};

export default MyScheduleListPage;
