import { useState } from 'react';
import { useInstaContext } from '../Context/InstaContext';

export function LogInForm() {
  const { DarkMode, LogIn } = useInstaContext();

  const [response, setResponse] = useState<
    { success: boolean; message: string } | undefined
  >(undefined);

  const handleLogIn = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const form = event.currentTarget as HTMLFormElement;

      const email = (form.elements.namedItem('email') as HTMLInputElement)
        .value;
      const password = (form.elements.namedItem('password') as HTMLInputElement)
        .value;

      const res = await LogIn(email, password);

      setResponse(res);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <form
        className='Form'
        onSubmit={handleLogIn}
        onClick={() => setResponse(undefined)}
      >
        <label className='Form--label'>
          E-mail:
          <input
            type='email'
            name='email'
            required
            className={` ${DarkMode ? 'dark' : ''}`}
          />
        </label>
        <label className='Form--label'>
          Password:
          <input
            type='password'
            name='password'
            required
            className={`${DarkMode ? 'dark' : ''}`}
          />
        </label>
        {response && !response.success && (
          <label style={{ color: 'red', fontWeight: 'bold' }}>
            Error: {response.message}
          </label>
        )}
        <div className='Form--button'>
          <button>Log In</button>
        </div>
      </form>
    </>
  );
}
