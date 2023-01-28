import { doc, onSnapshot } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/auth";
import { ChatAuthContext } from "../context/chatContext";
import { db } from "../firebase";
import Lgo from "../Images/chatty.png";

function Chats({ set, setWelcome }) {
  const { currentUser } = useContext(AuthContext);
  const { dispatch } = useContext(ChatAuthContext);
  const [chats, setChats] = useState([]);
  const [noti, setNoti] = useState("");

  const hideChat = () => {
    setWelcome(true);
    set(false);
  };
 
  
  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
        console.log(doc);
        setChats(doc.data());
      });
      return () => {
        unsub();
      };
    };
    currentUser.uid && getChats();
  }, [currentUser.uid]);
  const handleSelect = (user, us) => {
    dispatch({ type: "CHANGE_USER", payload: user });
  };
  return (
    <div
      className="chats scrollBar overflow-y-scroll overflow-x-hidden max-h-[80%] ease-in duration-300"
      onClick={hideChat}
    >
      {Object.entries(chats)
        ?.sort((a, b) => b[1].date - a[1].date)
        .map((chat) => (
          <div
            onClick={() =>
              handleSelect(chat[1].userInfo, chat[1].lastMessage?.text)
            }
            key={chat[0]}
            className=" p-[10px] flex items-center gap-3 text-white cursor-pointer hover:bg-gray-700"
          >
            <img
              className="w-[50px] h-[50px] rounded-full object-cover"
              src={chat[1].userInfo.photoURL}
              alt=""
            />
            <div className="">
              <span
                className={
                  chat[1].userInfo.displayName === "Danish"
                    ? "font-semibold text-lg text-yellow-500"
                    : "font-semibold text-lg"
                }
              >
                {chat[1].userInfo.displayName}
              </span>
              <p className="text-sm text-gray-400">
                {chat[1].lastMessage?.text}
              </p>
            </div>
          </div>
        ))}
    </div>
  );
}

export default Chats;
