import altImage from '../../img/alt_image.png';

const CreateGame = async ({ versus, gameName, startDate, oppoLogo, teamId }) => {
  try {
    let finalLogoFile = oppoLogo;

    if (!finalLogoFile) {
      const response = await fetch(altImage);
      const blob = await response.blob();
      finalLogoFile = new File([blob], 'default-logo.png', { type: blob.type });
    }

    const formData = new FormData();
    formData.append('versus', versus);
    formData.append('gameName', gameName);
    formData.append('startDate', startDate);
    formData.append('teamId', teamId);
    formData.append('oppoLogo', finalLogoFile);

    const response = await fetch('/api/games/create-game', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const errText = await response.text();
      throw new Error(errText || '경기 생성 실패');
    }

    return true; // 성공
  } catch (err) {
    console.error(err);
    throw err; // 실패
  }
};

export default CreateGame;