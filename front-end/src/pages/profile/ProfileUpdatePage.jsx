import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import CheckPassword from '../../components/profile/CheckPassword';
import ProfileUpdate from '../../components/profile/ProfileUpdate';
import ChangePassword from '../../components/profile/ChangePassword';

const ProfileUpdatePage = () => {
  const location = useLocation();
  const initialMode = location.state?.mode || 'update';
  const [step, setStep] = useState('check');

  if (step === 'check') {
    return <CheckPassword onSuccess={() => setStep(initialMode)} />;
  }

  if (step === 'update') {
    return <ProfileUpdate />;
  }

  if (step === 'password') {
    return <ChangePassword />;
  }

  return null;
};

export default ProfileUpdatePage;
