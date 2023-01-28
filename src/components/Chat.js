import React, { useContext, useEffect, useState } from "react";
import Messages from "./Messages";
import Input from "./Input";
import { ChatAuthContext } from "../context/chatContext";

function Chat({ setClick, user, welcome }) {
  const { data } = useContext(ChatAuthContext);
  const [showPicker, setShowPicker] = useState(false);
  const [text, setText] = useState("");
  const [image, setImage] = useState();
  const showChatshandler = () => {
    setClick(true);
  };
  return (
    <>
      {" "}
      <div className="flex-[2]  ">
        {welcome && (
          <div className=" w-full h-[58px] chatNav bg-[#f2f7f7] flex items-center justify-between p-[10px] text-[#97a6b2]">
            <span
              onClick={showChatshandler}
              class="  material-symbols-sharp sm:hidden"
            >
              {" "}
              arrow_back
            </span>
            <img
              className={
                data
                  ? "block w-[50px] h-[50px] rounded-full object-cover"
                  : "hidden"
              }
              src={data.user?.photoURL}
              alt=""
            />
            <span className="text-gray-800 font-medium ">
              {data.user?.displayName}
            </span>
            <div className="icons flex gap-3">
              <span className="hover:text-gray-600 cursor-pointer material-symbols-outlined">
                videocam
              </span>
              <span className="material-symbols-outlined hover:text-gray-600 cursor-pointer">
                person_add
              </span>
              <span className="hover:text-gray-600 cursor-pointer material-symbols-outlined">
                more_horiz
              </span>
            </div>
          </div>
        )}
        <Messages
      
          setText={setText}
          text={text}
              image={image}
          setShowPicker={setShowPicker}
          welcome={welcome}
        />
        <Input
       
       setImage={setImage}
          setText={setText}
          text={text}
          showPicker={showPicker}
          setShowPicker={setShowPicker}
          welcome={welcome}
        />
      </div>
    </>
  );
}

export default Chat;
