import { useState } from 'react';
import { useInstaContext } from '../Context/InstaContext';

export function SignUpForm() {
  const { DarkMode, SignUp } = useInstaContext();

  const [response, setResponse] = useState<
    { success: boolean; message: string } | undefined
  >(undefined);

  const handleSingUp = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const form = event.currentTarget as HTMLFormElement;

      const userName = (form.elements.namedItem('userName') as HTMLInputElement)
        ?.value;
      const email = (form.elements.namedItem('email') as HTMLInputElement)
        ?.value;
      const password = (form.elements.namedItem('password') as HTMLInputElement)
        ?.value;

      const res = await SignUp(userName, email, password);

      setResponse(res);

      if (res.success) {
        form.reset();
      }
    } catch (error) {
      console.error('Error during registration', error);
    }
  };

  return (
    <>
      <form
        className='Form'
        onSubmit={handleSingUp}
        onClick={() => setResponse(undefined)}
      >
        <label className='Form--label'>
          User name:
          <input
            type='text'
            required
            name='userName'
            className={` ${DarkMode ? 'dark' : ''}`}
          />
        </label>
        <label className='Form--label'>
          E-mail:
          <input
            type='email'
            required
            name='email'
            className={`${DarkMode ? 'dark' : ''}`}
          />
        </label>
        <label className='Form--label'>
          Password:
          <input
            type='password'
            required
            name='password'
            className={` ${DarkMode ? 'dark' : ''}`}
          />
        </label>

        {response && !response.success && (
          <label style={{ color: 'red', fontWeight: 'bold' }}>
            Error: {response.message}
          </label>
        )}
        {response && response.success && (
          <label style={{ color: 'green', fontWeight: 'bold' }}>
            Sucess: {response.message}
          </label>
        )}

        <div className='Form--button'>
          <button type='submit'>Sign In</button>
        </div>
      </form>
    </>
  );
}
