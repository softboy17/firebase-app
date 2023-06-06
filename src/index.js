import React, { createContext } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Initialize Firebase
const app = initializeApp({
  apiKey: "AIzaSyCOCwOPbjwvI0WaWcvMlJOLVVI5whvjREk",
  authDomain: "chat-react-afcbc.firebaseapp.com",
  projectId: "chat-react-afcbc",
  storageBucket: "chat-react-afcbc.appspot.com",
  messagingSenderId: "476945571920",
  appId: "1:476945571920:web:18cd0a83a6b1a9b7583155",
  measurementId: "G-26SZ7RHH37"
});
export const Context = createContext(null)
const auth = getAuth()
const firestore = getFirestore


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Context.Provider value={{
      auth,
      app,
      firestore
    }}>
    <App />
    </Context.Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

