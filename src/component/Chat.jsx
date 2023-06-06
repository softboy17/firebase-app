import React, { useContext, useState, useEffect } from 'react';
import { Context } from '..';
import { Avatar, Container, Grid, TextField } from '@mui/material';
import { Button } from '@mui/material';
import Loader from './Loader';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { collection, addDoc, serverTimestamp, onSnapshot, query, orderBy } from 'firebase/firestore';
import { getFirestore } from 'firebase/firestore';

export default function Chat() {
  const { firebaseApp } = useContext(Context);
  const auth = getAuth(firebaseApp);
  const firestore = getFirestore(firebaseApp);
  const [user, setUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [value, setValue] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => {
      unsubscribe();
    };
  }, [auth]);

  useEffect(() => {
    if (!loading) {
      const messageRef = collection(firestore, 'messages');
      const q = query(messageRef, orderBy('createdAt'));
      const unsubscribe = onSnapshot(q, (snapshot) => {
        const fetchedMessages = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setMessages(fetchedMessages);
      });

      return () => {
        unsubscribe();
      };
    }
  }, [firestore, loading]);

  const sendMessage = async () => {
    const messageRef = collection(firestore, 'messages');
    await addDoc(messageRef, {
      uid: user.uid,
      displayName: user.displayName,
      photoURL: user.photoURL,
      text: value,
      createdAt: serverTimestamp()
    });
    setValue('');
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <Container>
      <Grid
        container
        justifyContent="center"
        style={{ height: window.innerHeight - 50, marginTop: '20px' }}
      >
        <div style={{ width: '80%', height: '70vh', border: '1px solid gray', overflowY: 'auto' }}>
          {/* Render messages */}
          {messages.map((message) => (
            <div style={{
              margin: 10,
              border: user.uid === message.uid ? '2px solid green' : '2px dashed red',
              marginLeft: user.uid === message.uid ? 'auto' : '10px',
              width: 'fit-content',
              padding: 5

            }}>
              <Avatar src= {message.photoURL}/>
              <div>{message.displayName}</div>
            <div key={message.id}>{message.text}</div>
            </div>
          ))}
        </div>
        <Grid container direction="column" alignItems="flex-end" style={{ width: '80%' }}>
          <TextField
            fullWidth
            maxRows={2}
            variant="outlined"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <Button onClick={sendMessage}>Отправить</Button>
        </Grid>
      </Grid>
    </Container>
  );
}
