import axios from "axios";
import { useState, useContext } from "react";
import { Link, Navigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

const Login = () => {
  const { setUser, user } = useContext(UserContext);
  console.log("hello", user);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const [error, setError] = useState(false);
  const loginUser = async (e) => {
    e.preventDefault();
    setError(false);
    try {
      const response = await axios.post(
        "/login",
        { email, password },
        { withCredentials: true }
      );
      setUser(response.data);
      setRedirect(true);
    } catch (error) {
      setError(true);
    }
  };

  if (redirect) {
    return <Navigate to="/" />;
  }

  return (
    <div className="mt-5 grow flex items-center justify-around">
      <div className="mb-32">
        <h1 className="text-3xl font-bold text-center mb-5">Login</h1>
        <form className="max-w-md mx-auto" onSubmit={loginUser}>
          {error && (
            <p className="text-red-500 text-center text-sm flex gap-1 font-bold">
              Credentials are invalid
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.182 16.318A4.486 4.486 0 0012.016 15a4.486 4.486 0 00-3.198 1.318M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z"
                />
              </svg>
            </p>
          )}
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
          <div className="text-center">
            <button className="bg-primary py-3 px-20 text-white font-bold rounded-full">
              Login
            </button>
          </div>
          <div className="text-center text-gray-500">
            Don't have an account ?
            <Link to="/register" className="underline text-primary">
              Register now
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
