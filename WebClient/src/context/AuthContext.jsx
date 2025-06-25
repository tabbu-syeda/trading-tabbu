import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import axios from "axios";
import { API_BASE_URL } from "../utils/Constant"; // Ensure this is correct

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true); // New state for initial loading

  // Memoize callback function to avoid re-creation
  const fetchAccessToken = useCallback(async (code) => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/auth/callback?code=${code}`
      );
      if (response.data.success) {
        const token = response.data.accessToken;
        localStorage.setItem("access_token", token);
        setIsLoggedIn(true);
        // Clean up URL after successful token exchange
        window.location.href = "/";
        return { token, error: null };
      } else {
        console.error("Auth callback failed:", response.data.error);
        return { token: null, error: response.data.error };
      }
    } catch (error) {
      console.error("Error fetching access token:", error);
      return { token: null, error: error.message || "Network error" };
    }
  }, []);

  const checkAuthStatus = useCallback(async () => {
    setAuthLoading(true); // Start loading
    const token = localStorage.getItem("access_token");

    if (!token) {
      setIsLoggedIn(false);
      setUser(null);
      setAuthLoading(false);
      return;
    }

    try {
      // Validate the token with your backend
      const response = await axios.get(`${API_BASE_URL}/auth/verify`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        console.log("User is authenticated:", response.data);
        setUser(response.data);
        setIsLoggedIn(true);
      } else {
        // Token might be invalid or expired based on backend response status
        localStorage.removeItem("access_token");
        setIsLoggedIn(false);
        setUser(null);
      }
    } catch (error) {
      console.error("Error verifying authentication status:", error);
      localStorage.removeItem("access_token");
      setIsLoggedIn(false);
      setUser(null);
    } finally {
      setAuthLoading(false); // End loading
    }
  }, []); // Dependencies for useCallback

  useEffect(() => {
    handleInitialAuth();
  }, [fetchAccessToken, checkAuthStatus]); // Dependencies for useEffect

  const handleInitialAuth = async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");
    const error = urlParams.get("error");
    if (code) {
      // Only process if no token is already set
      console.log("Found auth code, attempting to get access token...");
      const { token: fetchedToken, error: authError } = await fetchAccessToken(
        code
      );
      if (fetchedToken) {
        console.log("Access token successfully obtained and stored.");
        // No need to redirect here, the component will re-render
      } else if (authError) {
        console.error("Failed to get access token:", authError);
        // Handle the error (e.g., display a message to the user)
      }
    } else if (error) {
      console.error("Upstox auth error:", error);
      // Handle Upstox direct error (e.g., user denied access)
    }

    // After handling any callback, or if no code/error, check existing auth status
    checkAuthStatus();
  };

  const login = () => {
    // Redirect to your Node.js endpoint, which will then redirect to Upstox
    window.location.href = `${API_BASE_URL}/auth/login`;
    // Do NOT set isLoggedIn here, it's set after successful token exchange
  };

  const logout = async () => {
    try {
      // Optional: Call your backend to revoke token/clear session if necessary
      const response = await axios.get(`${API_BASE_URL}/auth/logout`); // Ensure this route exists and handles backend logout
      if (response.status === 200) {
        console.log("Backend logout successful.");
      } else {
        console.warn("Backend logout did not return 200 status.");
      }
    } catch (error) {
      console.error("Logout API failed on backend:", error);
    } finally {
      localStorage.removeItem("access_token"); // Always clear client-side token
      setIsLoggedIn(false);
      setUser(null);
      window.location.href = "/"; // Redirect to home or login page
    }
  };

  if (authLoading) {
    return <div>Loading authentication status...</div>; // Or a spinner
  }

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
