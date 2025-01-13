import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const UpdateTriggerOnRouteChange = () => {
  const location = useLocation(); 
  const [trigger, setTrigger] = useState(false); // Local state for trigger

  useEffect(() => {
    setTrigger((prev) => !prev); 
  }, [location]); 

  return null; 
};

export default UpdateTriggerOnRouteChange;