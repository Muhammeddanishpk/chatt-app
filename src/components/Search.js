import React, { useContext, useEffect, useState } from "react";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../firebase";
import { AuthContext } from "../context/auth";

import Drop from "./Dropdown";
function Search({ setUs }) {
  const [username, setUsername] = useState("");
  const [user, setUser] = useState(null);
  const [err, setErr] = useState(false);

  const { currentUser } = useContext(AuthContext);
  setUs(user);
  useEffect(() => {
    if (username.length !== 0) {
      handleSearch();
    }
  }, [username]);

  const handleSearch = async () => {
    const q = query(
      collection(db, "users"),
      where("displayName", "==", username)
    );
    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setUser(doc.data());
      });
    } catch (err) {
      alert(err);
      setErr(true);
    }
  };
  const handleKey = (e) => {
    e.code === "Enter" && handleSearch();
  };
  const handleSelect = async () => {
    const combinerId =
      currentUser.uid > user.uid
        ? currentUser.uid + user.uid
        : user.uid + currentUser.uid;
    try {
      const res = await getDoc(doc(db, "chats", combinerId));
      if (!res.exists()) {
        await setDoc(doc(db, "chats", combinerId), { messages: [] });

        await updateDoc(doc(db, "userChats", currentUser.uid), {
          [combinerId + ".userInfo"]: {
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
          },
          [combinerId + ".date"]: serverTimestamp(),
        });
        await updateDoc(doc(db, "userChats", user.uid), {
          [combinerId + ".userInfo"]: {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL,
          },
          [combinerId + ".date"]: serverTimestamp(),
        });
      }
    } catch (er) {
      setErr(false);
    }
  };
  return (
    <div className="search">
      <div className="relative">
        <div className="relative flex justify-around">
          <input
            data-tooltip-target="tooltip-default"
            type="text"
            id="search"
            onKeyDown={handleKey}
            className="w-0 h-0 opacity-0"
            placeholder="Search or start a new chat"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
          />

          <Drop
            username={username}
            setUsername={setUsername}
            handleSelect={handleSelect}
            handleKey={handleKey}
            handleSearch={handleSearch}
          />
        </div>
      </div>

      {err && <span className="text-center text-red-800">User not found</span>}
      {user && (
        <div
          onClick={handleSelect}
          className="p-[10px] flex items-center gap-3 text-white cursor-pointer hover:bg-gray-700"
        >
          <img
            className="w-[50px] h-[50px] rounded-full object-cover"
            src={user.photoURL}
            alt=""
          />
          <div className="">
            <span>{user.displayName}</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default Search;
