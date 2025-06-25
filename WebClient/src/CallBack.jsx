import { useEffect } from "react";
import { useAuth } from "./context/AuthContext"; // Import useAuth if you want to use it
const CallBack = () => {
  const { isLoggedIn } = useAuth(); // If you want to check auth status immediately

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/"); // Redirect to home or dashboard after successful login
    }
  }, [isLoggedIn, navigate]);

  return (
    <div>
      <p>Processing login...</p>
      {/* You can add a loading spinner here */}
    </div>
  );
};

export default CallBack;
