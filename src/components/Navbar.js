import { signOut } from "firebase/auth";
import React, { useContext, useState } from "react";
import { AuthContext } from "../context/auth";
import { auth } from "../firebase";
import './Navbar.css'
import Logo from '../Images/chatty.png'
import { Link } from "react-router-dom";
function Navbar() {
  const [alert,setAlert]= useState(false)
  const {currentUser} = useContext(AuthContext)
  const Handleralert =()=>{
    setAlert(true)
  }
  const conformBtn =()=>{
    signOut(auth)
  }
  const unconformBtn =()=>{
    setAlert(false)
  }
  return (
    <>
    <div className="flex items-center bg-[#303841] justify-between p-3 h-14 text-white">
      {alert && <div className="cd-popup" role="alert">
	<div className="cd-popup-container">
		<p>Are you sure you want to signOut ?</p>
		<ul className="cd-buttons">
			<li onClick={conformBtn} ><a href="#0">Yes</a></li>
			<li onClick={unconformBtn} ><a href="#0">No</a></li>
		</ul>
		{/* <a href="#0" className="cd-popup-close img-replace">Close</a> */}
	</div> 
</div> }
    <div className="flex ">
        <img className="w-[25px] h-[25px]" src={Logo} alt="" />
      <a href="/" className="ml-1 mt-[2px] logo-all">Chatty</a>
    </div>
    
      {/* user */}
      <div className="flex gap-3">
        <img
          className="bg-[#ddddf7] rounded-full h-[24px] w-[24px] object-cover"
          src={currentUser.photoURL}
          alt=""
        />
        <span>{currentUser.displayName}</span>
        <span onClick={Handleralert} className="cursor-pointer
         material-symbols-outlined font-semibold">logout</span>
      </div>
    </div>
    </>
  );
}

export default Navbar;
