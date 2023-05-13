import {
  arrayUnion,
  doc,
  serverTimestamp,
 
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import React, { useContext, useState } from "react";
import { AuthContext } from "../context/auth";
import { ChatAuthContext } from "../context/chatContext";
import { db, storage } from "../firebase";
import { v4 as uuid } from "uuid";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import EmojiPicker from "emoji-picker-react";
 
import ImageConsole from "./ImageConsole";

function Input({ welcome,showPicker,setShowPicker,setImage,setText,text,setSendFunc }) {
  // document.querySelector('emoji-picker').addEventListener('emoji-click', event => console.log(event.detail));
  const [loading, setLoader] = useState(false);
 
  const [img, setImg] = useState(null);
  setImage(img)
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatAuthContext);
  function formatAMPM() {
    let date = new Date();
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? "0" + minutes : minutes;
    var strTime = hours + ":" + minutes + " " + ampm;
    return strTime;
  }
  // const [chosenEmoji, setChosenEmoji] = useState(null);

  const onEmojiClick = (EmojiClickData, event) => {
    setText((prevInput) => prevInput + EmojiClickData.emoji);
    setShowPicker(false);
  };
  if (text.length !== 0) {
    var handleSend = async () => {
     
      setText("");
      if (img) {
         setLoader(true)
        const storageRef = ref(storage, uuid());

        await uploadBytesResumable(storageRef, img).then(() => {
          getDownloadURL(storageRef).then(async (downloadURL) => {
            try {
              await updateDoc(doc(db, "chats", data.chatId), {
                messages: arrayUnion({
                  id: uuid(),
                  text,
                  senderId: currentUser.uid,
                  date: Timestamp.now(),
                  chatDate: formatAMPM(),
                  img: downloadURL,
                }),
              });
            } catch (err) {
              console.log(err);
              // setErr(true);
            }
          });
        });
      } else {
        setText("");
        await updateDoc(doc(db, "chats", data.chatId), {
          messages: arrayUnion({
            id: uuid(),
            chatDate: formatAMPM(),
            text,
            senderId: currentUser.uid,
            date: Timestamp.now(),
          }),
        });
      }

      await updateDoc(doc(db, "userChats", currentUser.uid), {
        [data.chatId + ".lastMessage"]: {
          text,
        },
        [data.chatId + ".data"]: serverTimestamp(),
      });
      await updateDoc(doc(db, "userChats", data.user.uid), {
        [data.chatId + ".lastMessage"]: {
          text,
        },
        [data.chatId + ".data"]: serverTimestamp(),
      });

      setImg(null);
    };
 
    var handleKey = (e) => {
        e.code === "Enter" && handleSend();
    };
  }
  return (
    

    <> <div className="absolute bottom-14 right-2 ">
            <ImageConsole loading={loading} func={handleSend} setText={setText} text={text} imgUrl={img}/>
            {showPicker && (
              <EmojiPicker Theme={"dark"} autoFocusSearch={false}   onEmojiClick={onEmojiClick} />
            )}
          </div>
         {img ? null: <>
      {welcome && (
        <div className=" shad  h-[50px] bg-white p-[10px] flex items-center justify-between">
         
          <span
            onClick={() => setShowPicker((val) => !val)}
            class="cursor-pointer material-symbols-outlined text-[#7c7c7c] p-1"
          >
            mood
          </span>
        {img ? null :  <input
            onChange={(e) => setText(e.target.value)}
            value={img ? null:text}
            onKeyDown={handleKey}
            type="text"
            className="border-none outline-none w-full  text-[#7c7c7c] placeholder:text-[#8a8e92]"
            placeholder={"Type something..."}
          />}

          <div className="text-3xl">
            <input
              type="file"
              onChange={(e) => setImg(e.target.files[0])}
              id="file"
              className="hidden "
            />
            <div className="flex">
              <label htmlFor="file" className="mr-3 text-[#b5b5b5]">
                <span className="cursor-pointer material-symbols-sharp flex items-center">
                  add_a_photo
                </span>
              </label>
              <button
                onClick={handleSend}
                className="text-[#54d38a] gap-3 flex items-center font-extrabold"
              >
                <span class="material-symbols-sharp">send</span>
              </button>
            </div>
          </div>
        </div>
      )}
     </>}
    </>
  );
}

export default Input;
