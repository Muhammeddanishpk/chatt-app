import React from "react";
import WelcomeImg from "../Images/welcome.png";
const Welcome = () => {
  return (
    <div className="h-full p-[10px] bg-[#e7e9e9] overflow-hidden">
      <div className="flex w-full h-full items-center justify-center flex-col">
        <h1 className="text-center font-medium text-[70px] gradient  pb-3 Welcome-font">
          Welcome to Chatty
        </h1>
        {/* <h2 className="text-center z-50 text-4xl  font-extrabold">
          Hang out anytime, anywhere
        </h2> */}
        <img src={WelcomeImg} className=" mt-5 [300px] h-[300px]" alt="" />
        <h3 className=" text-center gradient1 font-semibold">
          Chatty makes it easy and fun to stay close to your favourite people.
        </h3>

      </div>
    </div>
  ); 
};

export default Welcome;
