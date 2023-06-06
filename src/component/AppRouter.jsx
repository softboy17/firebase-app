import React, { useContext, useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { privateRoutes, publicRoutes } from '../route';
import { CHAT_ROUTE, LOGIN_ROUTE } from '../utils/const';
import Chat from './Chat';
import Login from './Login';
import { Context } from '..';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

export default function AppRouter() {
  const { firebaseApp } = useContext(Context);
  const [user, setUser] = useState(null);
  const auth = getAuth(firebaseApp);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => {
      unsubscribe();
    };
  }, [auth]);

  return (
    <Routes>
      {user ? (
        // Маршруты для авторизованного пользователя
        <>
          {privateRoutes.map(({ path, component: Component }) => (
            <Route key={path} path={CHAT_ROUTE} element={<Chat />} />
          ))}
          <Route path="*" element={<Navigate to={CHAT_ROUTE} />} />
        </>
      ) : (
        // Маршруты для неавторизованного пользователя
        <>
          {publicRoutes.map(({ path, component: Component }) => (
            <Route key={path} path={LOGIN_ROUTE} element={<Login />} />
          ))}
          <Route path="*" element={<Navigate to={LOGIN_ROUTE} />} />
        </>
      )}
    </Routes>
  );
}
