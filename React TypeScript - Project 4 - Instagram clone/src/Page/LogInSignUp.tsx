import { useEffect, useState } from 'react';
import { LogInForm } from '../Components/LogInForm';
import { SignUpForm } from '../Components/SignUpForm';
import { useInstaContext } from '../Context/InstaContext';
import { useNavigate } from 'react-router-dom';
import { FaHome } from 'react-icons/fa';

export function LogInSignUp() {
  const navigate = useNavigate();
  const [LogOrSign, setLogOrSign] = useState<boolean>(true);

  const { tokenId } = useInstaContext();

  useEffect(() => {
    if (tokenId && tokenId.length > 1) navigate('/');
  }, [tokenId]);

  return (
    <div className='LogInSignUp'>
      <div className='LogInSignUp-close'>
        <button onClick={() => navigate('/')}>
          <FaHome />
        </button>
      </div>

      <div className='LogInSignUp-main'>
        <button onClick={() => setLogOrSign(!LogOrSign)}>
          {LogOrSign ? <>Sign Up</> : <>Log In</>}
        </button>

        {LogOrSign ? <LogInForm /> : <SignUpForm />}
      </div>
    </div>
  );
}
