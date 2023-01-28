import React, { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, storage, db } from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Logo from "../Images/chatty.png";

import Spinner from "../components/Spinner";
function Register() {
  const [err, setErr] = useState(false);
  const [loading, setLoader] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    setLoader(true);
    e.preventDefault();
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const file = e.target[3].files[0];

    try {
 
      const res = await createUserWithEmailAndPassword(auth, email, password);

 
      const date = new Date().getTime();
      const storageRef = ref(storage, `${displayName + date}`);

      await uploadBytesResumable(storageRef, file).then(() => {
        getDownloadURL(storageRef).then(async (downloadURL) => {
          try {
           
            await updateProfile(res.user, {
              displayName,
              photoURL: downloadURL,
            });
          
            await setDoc(doc(db, "users", res.user.uid), {
              uid: res.user.uid,
              displayName,
              email,
              photoURL: downloadURL,
            });

             
            await setDoc(doc(db, "userChats", res.user.uid), {});

            navigate("/");
          } catch (err) {
            console.log(err);
            setErr(true);
            setLoader(false);
          }
        });
      });
    } catch (err) {
      setErr(true);
      setLoader(false);
    }
  };
  return (
    <div className="formContainer">
      <div className="formWrapper">
      <div className="flex">
           <img className="w-[35px] h-[35px]" src={Logo} alt="" />
        <span className="logo logo-all ml-1 mt-[2px]">Chatty</span>
        </div>
        <span className="title">Register</span>
        <form
          action=""
          onSubmit={handleSubmit}
          className="form flex flex-col gap-[15px]"
        >
          <input type="text" placeholder="name" />
          <input type="email" placeholder="email" />
          <input type="password" placeholder="password" />
          <input type="file" className="hidden" id="file" />
          <label htmlFor="file" className="flex items-center">
            <img
              src="https://raw.githubusercontent.com/safak/youtube2022/react-chat/src/img/addAvatar.png"
              className=""
              alt=""
            />
            <span className="font-semibold text-[#8da4f1] text-[12px]">
              Add an Avatar
            </span>
          </label>
          <button
            disabled={loading}
            className="bg-[#51557E] text-white font-bold p-2 rounded-sm hover:cursor-pointer hover:bg-[#5f6283]"
          >
            Sign up
          </button>
          {loading && <Spinner />}
          {err && (
            <span className="text-red-900 text-center font-semibold">
              Something Went wrong
            </span>
          )}
        </form>
        <p className="text-[#00587A ] mt-2">
          {" "}
          You do have an account ?{" "}
          <Link to="/login" className="text-green-700 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
