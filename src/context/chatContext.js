import { onChatAuthStateChanged } from "firebase/auth";
import { createContext, useContext, useEffect, useReducer, useState } from "react";
import { auth } from "../firebase";
import { AuthContext } from "./auth";
export const ChatAuthContext = createContext()
export const ChatAuthContextProvider = ({children})=>{
  const INTIAL_STATE = {
    chatId:"null",
    user:{}
  }
  const {currentUser} = useContext(AuthContext)
  const chatReducer = (state,action)=>{
    switch(action.type){
      case "CHANGE_USER":
      return {
        user:action.payload,
        chatId:  currentUser.uid > action.payload.uid ? currentUser.uid + action.payload.uid : action.payload.uid + currentUser.uid
      }
      default:
        return state
    }
  }
   const [state,dispatch] = useReducer(chatReducer,INTIAL_STATE)
return(
    <ChatAuthContext.Provider value={{data:state,dispatch}}> 
    {children}
  </ChatAuthContext.Provider>
)

}