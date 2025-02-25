import { useEffect, useState } from 'react';
import { LogInForm } from '../Components/LogInForm';
import { SignUpForm } from '../Components/SignUpForm';
import { useInstaContext } from '../Context/InstaContext';
import { useNavigate } from 'react-router-dom';

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
        <button onClick={() => navigate(-1)}>X</button>
      </div>

      <div className='Form'>
        <button onClick={() => setLogOrSign(!LogOrSign)}>
          {LogOrSign ? <>Sign Up</> : <>Log In</>}
        </button>

        {LogOrSign ? <LogInForm /> : <SignUpForm />}
      </div>
    </div>
  );
}
