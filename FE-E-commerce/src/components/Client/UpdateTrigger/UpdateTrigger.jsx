import React, { useEffect,useContext } from "react";
import { useLocation } from "react-router-dom";
import { UserContext } from "../../../routes/UserContext.jsx";

const UpdateTriggerOnRouteChange = () => {
  const location = useLocation(); 
  const { setTrigger } = useContext(UserContext); 
  useEffect(() => {
    setTrigger((prev) => !prev); 
  }, [location]); 

  return null; 
};

export default UpdateTriggerOnRouteChange;
