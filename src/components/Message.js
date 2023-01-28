import { Timestamp } from "firebase/firestore";
import React, { useContext, useEffect, useRef, useState } from "react";
import FileSaver, { saveAs } from "file-saver";
import { AuthContext } from "../context/auth";
import { ChatAuthContext } from "../context/chatContext";
import Login from "../pages/Login";

function Message({ message ,mess}) {
  const [curetImg, setCuretImg] = useState("");
  const [img, setImg] = useState(false);
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatAuthContext);
  const ref = useRef(); 
 
  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
     
  }, [message]);
 
  function handleFull(e) {
    const imgLink = e.target.currentSrc;
    setImg(true);
    setCuretImg(imgLink);
  }
 
  const remove = (e) => {
    setImg(false);
  };
 
  
 

  return (
    <>
    
      <div
        className={`message ${message.senderId === currentUser.uid && "owner"}`}
      >
        
        {img && (
          <div className="fixed top-0 left-0 h-screen w-full z-50 bg-[#0f0e0ea8]">
            <span
              onClick={remove}
              className="absolute top-0 right-4 text-4xl font-extrabold text-white cursor-pointer z-50 "
            >
              &times;
            </span>
            <img
              className="absolute top-[50%] left-[50%] transform-translate sm:max-h-[650px] rounded-lg w-[95%] md:w-[550px] object-cover"
              src={curetImg}
              alt=""
            />
          </div>
        )}
        <div ref={ref} className="flex flex-col text-gray-600">
          <img
            className="w-10 h-10 rounded-full object-cover"
            src={
              message.senderId === currentUser.uid
                ? currentUser.photoURL
                : data.user.photoURL
            }
            alt=""
          />
          <span className="text-xs">{message.chatDate}</span>
        </div>
        <div className="content max-w-[80%]   flex flex-col gap-3">
 
          {message.img && (
            <div   className={`messageImg ${message.senderId === currentUser.uid && "ownerImg"}`}>
              <img
              className="cursor-pointer w-[210px] sm:w-[260px] m-1  sm:max-h-[600px] object-cover rounded-lg  "
              onClick={handleFull}
              src={message.img}
              alt=""
            />
            <p className="bg-white max-w-[210px] sm:max-w-[260px] rounded-lg px-[10px] py-2 text-center">
            {message.text}
          </p>
            </div>
            
          )} 

         {message.img ? <span></span>: <p className="bg-white max-w-[290px] rounded-lg px-[10px] py-2 text-center">
            {message.text}
          </p>
 
}        </div>
      </div>
    </>
  );
}

export default Message;
