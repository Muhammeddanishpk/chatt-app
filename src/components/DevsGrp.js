import React, { useContext, useRef, useState } from 'react';
 

import firebase from 'firebase/app';


import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { AuthContext } from '../context/auth';


 

function ChatRoom() {
  const dummy = useRef();
  const firestore = firebase.firestore();
  const messagesRef = firestore.collection('messages');
  const query = messagesRef.orderBy('createdAt').limit(25);

  const [messages] = useCollectionData(query, { idField: 'id' });

  const [formValue, setFormValue] = useState('');

  const { currentUser } = useContext(AuthContext);
  const sendMessage = async (e) => {
    e.preventDefault();

 let uid = currentUser.uid
 let photoURL = currentUser.photoURL

    await messagesRef.add({
      text: formValue,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid,
      photoURL
    })

    setFormValue('');
    dummy.current.scrollIntoView({ behavior: 'smooth' });
  }

  return (<>
    <main>

      {messages && messages.map(msg => <ChatMessage key={msg.id} message={msg} />)}

      <span ref={dummy}></span>

    </main>

    <form onSubmit={sendMessage}>

      <input value={formValue} onChange={(e) => setFormValue(e.target.value)} placeholder="say something nice" />

      <button type="submit" disabled={!formValue}>🕊️</button>

    </form>
  </>)
}


function ChatMessage(props) {
  const { text, uid, photoURL } = props.message;

  const { currentUser } = useContext(AuthContext);
  const messageClass = uid === currentUser.uid ? 'sent' : 'received';

  return (<>
    <div className={`message ${uid === currentUser.uid && "owner"}`}>
      <img src={currentUser.photoURL} />
      <p>{text}</p>
    </div>
  </>)
}


export default ChatRoom;