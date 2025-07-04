import { useEffect, useState } from 'react';
import styled from 'styled-components';
import TeamMember from './TeamMember';

const Title = styled.h2`
  font-size: 2.4vh;
  font-weight: 600;
  margin: 3vh 0 2vh;
  text-align: center;
`;

const UsersBox = styled.ul`
  padding: 0;
  list-style: none;
  border-top: 1px solid #ddd;
`;

const TeamMemberList = ({ teamId }) => {
  const [users, setUsers] = useState([]);
  const userMail = sessionStorage.getItem('userMail');

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await fetch(`/api/teams/${teamId}/users-in-team`);
      const data = await res.json();
      setUsers(data.filter((user) => user.userMail !== userMail));
    };
    fetchUsers();
  }, [teamId, userMail]);

  return (
    <>
      <Title>팀원 목록</Title>
      <UsersBox>
        {users.map((user) => (
          <TeamMember
            key={user.userMail}
            user={user}
            teamId={teamId}
            refreshUsers={() => {
              // refetch users after actions
              fetch(`/api/teams/${teamId}/users-in-team`)
                .then((res) => res.json())
                .then((data) =>
                  setUsers(data.filter((u) => u.userMail !== userMail))
                );
            }}
          />
        ))}
      </UsersBox>
    </>
  );
};

export default TeamMemberList;