import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const MyTeamFormContainer = styled.form`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const MyTeamForm = () => {
  const [teams, setTeams] = useState([]);
  const userMail = sessionStorage.getItem('userMail');

  // 데이터 불러오기
  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const response = await fetch(`/api/teams/mail/${userMail}`);
        if (response.ok) {
          const data = await response.json();
          setTeams(data); // 화면에 보여주기 위해 저장
        } else {
          alert(await response.text());
        }
      } catch (err) {
        console.error(err);
        alert('서버와의 통신 중 오류가 발생했습니다.');
      }
    };

    fetchTeams();
  }, []);

  return (
    <MyTeamFormContainer>
      <ul>
        {(() => {
          const items = [];
          for (let i = 0; i < teams.length; i++) {
            const team = teams[i];
            items.push(
              <li key={team.teamId}>
                <Link to={`/teams/${team.teamId}`}>
                  {team.teamName} ({team.teamId})
                </Link>
              </li>,
            );
          }
          return items;
        })()}
      </ul>
    </MyTeamFormContainer>
  );
};

export default MyTeamForm;
