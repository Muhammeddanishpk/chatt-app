import "./index.css";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/auth";
import Spinner from "./components/Spinner";
 
 
function App() {
  const { currentUser } = useContext(AuthContext);
  console.log(currentUser);
  const ProtectedRoute  = ({children})=>{
    if(!currentUser){
      return <Navigate to="/login"/>
    }
    return children
  }
  return (
    <BrowserRouter> 
      <Routes>
        
        <Route path="/">
          <Route index element={
         <ProtectedRoute>
          <Home />
          </ProtectedRoute> } />
          <Route path="/register" element={<Register/>} />
          <Route path="/login" element={<Login />} />
          <Route path="/spi" element={<Spinner />} />
 
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
