import { createContext, useEffect, useState } from "react";
import { authApi } from "../services/api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuth, setIsAuth] = useState(null);

  useEffect(() => {
    const verifyAuth = async () => {
      try {
        const res = await authApi.post("/auth/refresh");

        localStorage.setItem("accessToken", res.data.accessToken);
        setIsAuth(true);
      } catch (error) {
        setIsAuth(false);
      }
    };
    verifyAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ isAuth }}>{children}</AuthContext.Provider>
  );
};
