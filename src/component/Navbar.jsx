import React, { useContext, useEffect, useState } from 'react';
import { Context } from '..';
import '../App.css';
import { getAuth, signOut } from 'firebase/auth';
import { onAuthStateChanged } from 'firebase/auth';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { Button } from '@mui/material';
import { NavLink } from 'react-router-dom';
import { LOGIN_ROUTE } from '../utils/const';

export default function Navbar() {
  const { auth } = useContext(Context);
  const [user, setUser] = useState(null);

  const handleSignOut = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        setUser(null);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // Пользователь аутентифицирован
        setUser(user);
      } else {
        // Пользователь не аутентифицирован
        setUser(null);
      }
    });

    return () => {
      // Отписка от слушателя при размонтировании компонента
      unsubscribe();
    };
  }, [auth]);

  return (
    <AppBar color="secondary" position="static">
      <Toolbar variant="dense">
        <div className="btn_container">
          {user ? (
            <Button variant="outlined" onClick={handleSignOut}>
              Выйти
            </Button>
          ) : (
            <NavLink to={LOGIN_ROUTE}>
              <Button variant="outlined">Логин</Button>
            </NavLink>
          )}
        </div>
      </Toolbar>
    </AppBar>
  );
}
