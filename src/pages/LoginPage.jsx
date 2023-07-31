import axios from 'axios';

import LoginForm from '../components/LoginForm.jsx';
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
  const navigate = useNavigate()

  const handleLogin = async (event, formData) => {
    event.preventDefault();

    const res = await axios.post('/api/auth', formData);

    if (res.data.success) {
      navigate('/me');
    }
  };

  return (
    <>
      <h1>Log In</h1>
      <LoginForm onLogin={handleLogin} />
    </>
  );
}
