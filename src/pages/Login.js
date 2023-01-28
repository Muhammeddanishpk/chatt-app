import React, { useState } from "react";
import {  useNavigate } from "react-router";
import {signInWithEmailAndPassword} from 'firebase/auth'
import { auth } from "../firebase";
import { Link } from "react-router-dom";
import Spinner from "../components/Spinner";
import Logo from "../Images/chatty.png";

function Login() {
  const [err, setErr] = useState(false);
  const [loading, setLoader] = useState(false);

  const navigate=useNavigate()
  const handleSubmit = async (e) => {
    setLoader(true);

    e.preventDefault();

    const email = e.target[0].value;
    const password = e.target[1].value;

    try {
      await signInWithEmailAndPassword(auth,email,password)
      navigate("/")
    } catch (err) {
      setErr(true);
    setLoader(false);

    }
  }
  return (
    <div className="formContainer ">
      <div className="formWrapper mx-10">
      <div className="flex">
           <img className="w-[35px] h-[35px]" src={Logo} alt="" />
        <span className="logo logo-all ml-1 mt-[2px]">Chatty</span>
        </div>
       
        <span className="title">Login</span>
        <form action="" onSubmit={handleSubmit} className="form flex flex-col gap-[15px]">
 
          <input type="email" placeholder="email" />
          <input type="password" placeholder="password" />
       
           
          <button disabled={loading} className="bg-[#51557E] text-white font-bold p-2 rounded-sm hover:cursor-pointer hover:bg-[#5a5d80]">
           Sign in
          </button>
          {loading && <Spinner/>}
          {err && <span className="text-red-900 text-center font-semibold">Something Went wrong</span>}
        </form>
        <p className="text-[#00587A ] mt-2 text-center"> You don't have an account ? <Link to="/register" className="text-green-700 hover:underline">Register</Link> </p>
      </div>
    </div>
  );

}

export default Login;
