import { Box, Button } from '@mui/material';
import '../App.css';
import React, { useContext, useEffect } from 'react';
import { Context } from '..';
import { GoogleAuthProvider, signInWithRedirect, getRedirectResult } from 'firebase/auth';

export default function Login() {
  const { auth } = useContext(Context);

  const login = () => {
    const provider = new GoogleAuthProvider();
    signInWithRedirect(auth, provider);
  };

  useEffect(() => {
    const handleRedirectResult = async () => {
      try {
        const result = await getRedirectResult(auth);
        const user = result.user;
        console.log(user);
      } catch (error) {
        // Обработка ошибки входа
        console.error(error);
      }
    };

    handleRedirectResult();
  }, [auth]);

  return (
    <div className='login_main'>
      <Box p={5}>
        <Button onClick={login} variant='outlined'>
          Войти с помощью Google
        </Button>
      </Box>
    </div>
  );
}
