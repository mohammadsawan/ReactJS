import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const [user, setUser] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    user ? navigate("/") : navigate("/signup");
  }, []);

  return <div>Home</div>;
}

export default Home;
