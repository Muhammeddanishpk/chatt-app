import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AuthContextProvider } from './context/auth';
import {   ChatAuthContextProvider } from './context/chatContext';
 

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AuthContextProvider>
    <ChatAuthContextProvider>
  

  

      <React.StrictMode>
    <App />
  </React.StrictMode> 
     </ChatAuthContextProvider>
  </AuthContextProvider>

);

 
 
