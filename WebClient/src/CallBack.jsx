import { useEffect, useState } from "react";
import axios from "axios";
import Home from "./Home";
import { API_BASE_URL } from "./utils/Constant";

const CallBack = () => {
  const [success, setSuccess] = useState(false);
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");
    if (code) {
      axios
        .get(`${API_BASE_URL}/auth/callback?code=${code}`)
        .then((response) => {
          if (response.data.success) {
            setSuccess(true);
            console.log("Callback successful: " + response.data.accessToken);
            localStorage.setItem("access_token", response.data.accessToken);
          }
        })
        .catch((error) => {
          setSuccess(false);
          console.error("Callback error:", error);
        });
    }
  }, []);

  if (success) {
    window.location.href = "/";
  }
  return (
    <div>
      {success ? (
        <div>
          <Home />
        </div>
      ) : (
        <div>
          <h1>Callback Failed</h1>
          <p>There was an error processing your request.</p>
        </div>
      )}
    </div>
  );
};

export default CallBack;
