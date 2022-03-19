import SignUp from "./Signup";
import Home from "./Home";
import LogIn from "./LogIn";
import { Route, Routes } from "react-router-dom";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/login" element={<LogIn />} />
    </Routes>
  );
};

export default App;
