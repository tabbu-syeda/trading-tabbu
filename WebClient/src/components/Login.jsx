import { useEffect } from "react";
import { API_BASE_URL } from "../utils/Constant";

const Login = ({ isLoggedIn }) => {
  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (token) {
      isLoggedIn = true;
    }
  }, [isLoggedIn]);
  const loginToRedirect = ({ isLoggedIn }) => {
    if (!isLoggedIn) {
      window.location.href = `${API_BASE_URL}/auth/login`;
      isLoggedIn = true;
    } else {
    }
  };
  return (
    <div className="px-5">
      <button
        className="cursor-pointer border rounded-full px-7 py-3 text-white hover:text-amber-300"
        onClick={() => loginToRedirect({ isLoggedIn })}
      >
        {isLoggedIn ? "LOG OUT" : "LOG IN"}
      </button>
    </div>
  );
};

export default Login;
