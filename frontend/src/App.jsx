import React,{Suspense,useEffect} from "react";
import { Routes, Route, Navigate, BrowserRouter } from "react-router-dom";
import { Dashboard, Auth } from "@/layouts";
import { SignIn, SignUp } from "@/pages/auth";
import { useDispatch,useSelector } from "react-redux";
import { Spinner } from "@material-tailwind/react";
import { ToastContainer } from "react-toastify";

import { isUserLoggedIn } from "./redux/actions/auth.actions";

function App() {
  const pathname = window.location.pathname;
const uri = pathname.split('/'[1]);
const dispatch = useDispatch();
const auth = useSelector(state =>state.auth);

useEffect(()=>{
  if(!auth.authenticate){
    dispatch(isUserLoggedIn());
  }
  if(auth.authenticate){

  }
},[auth.authenticate])
  return (
    
    <Suspense fallback={<div className="pt-3 text-center"><Spinner className="h-4 w-4"/></div>}>
      <Routes>
      <Route path="/dashboard/*" element={auth.authenticate ?<Dashboard />:<SignIn/>} />
      <Route path="auth/*" element={<SignIn />} />
      {/* <Route path="*" element={<Navigate to="/dashboard/home" replace />} /> */}
    </Routes>
    </Suspense>
  
    
  );
}

export default App;
