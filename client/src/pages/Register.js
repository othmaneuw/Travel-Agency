import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import ValidationMessage from "../components/ValidationMessage";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState({
    show: false,
    type: "",
    text: "",
  });
  const registerUser = async (e) => {
    e.preventDefault();
    try {
      setMessage({
        ...message,
        show: false,
      });
      await axios.post("/register", {
        name,
        email,
        password,
      });
      setMessage({
        type: "success",
        text: "You have been registred succesfully",
        show: true,
      });
    } catch (error) {
      setMessage({
        ...message,
        show: false,
      });
      setMessage({
        text: "Registration Failed , please try again",
        type: "error",
        show: true,
      });
    }
  };
  return (
    <div className="mt-5 grow flex items-center justify-around">
      <div className="mb-32">
        <h1 className="text-3xl font-bold text-center mb-5">Register</h1>
        <form className="max-w-md mx-auto" onSubmit={registerUser}>
          <input
            type="text"
            placeholder="Peter Parker"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="email"
            placeholder="youremail@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="primary">Register</button>
          <div className="text-center text-gray-500">
            Already a member ?{" "}
            <Link to="/login" className="underline text-black">
              Login
            </Link>
          </div>
        </form>
        {message.show && <ValidationMessage {...message} />}
      </div>
    </div>
  );
};

export default Register;
