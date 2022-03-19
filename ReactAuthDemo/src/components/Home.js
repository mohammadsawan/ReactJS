import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../hooks/userContext";

function Home() {
  const { user } = useContext(UserContext);

  const navigate = useNavigate();

  useEffect(() => {
    user ? navigate("/") : navigate("/signup");
  }, []);

  return <div>Home</div>;
}

export default Home;
