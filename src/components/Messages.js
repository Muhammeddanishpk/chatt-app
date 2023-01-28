import { doc, onSnapshot } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { ChatAuthContext } from "../context/chatContext";
import { db } from "../firebase";
 
import Message from "./Message";
import Welcome from "./Welcome";

function Messages({ welcome, setShowPicker, image, setText, text, sendFunc }) {
  const [messages, setMessages] = useState([]);
  const { data } = useContext(ChatAuthContext);
  useEffect(() => {
    const unsub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
      doc.exists() && setMessages(doc.data().messages);
    });
    return () => {
      unsub();
    };
  }, [data.chatId]);

  return (
    <>
      {welcome ? (
        <div
          onClick={() => setShowPicker(false)}
          className={
            image
              ? "h-[calc(100%-56.5px)]  bg-[#e7e9e9] p-[10px]  overflow-scroll overflow-x-hidden relative"
              : " h-[calc(100%-106.5px)] bg-[#e7e9e9] p-[10px]  overflow-scroll overflow-x-hidden relative"
          }
        >
       
          
          {/* <ImageConsole sendFunc={sendFunc} setText={setText} text={text} imgUrl={imgUrl} /> */}
          {messages.map((m) => (
            <Message mess={messages} message={m} key={m.id} />
          ))}
        </div>
      ) : (
        <Welcome welcome={welcome} />
      )}
    </>
  );
}

export default Messages;
