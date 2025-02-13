import { createContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

interface DecodedUserType {
  firstname: string;
  lastname: string;
  email: string;
  telephone: number;
  exp: number;
}

interface AuthContextType {
  user: DecodedUserType | null;
  logout: () => void;
}

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<DecodedUserType | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) return;

    try {
      const decodedUser: DecodedUserType = jwtDecode(token);
      console.log("Decoded User:", decodedUser);

      if (decodedUser.exp * 1000 < Date.now()) {
        console.warn("Token expired.    Logging out...");
        localStorage.removeItem("token");
        setUser(null);
      } else {
        setUser(decodedUser);
      }
    } catch (error) {
      console.error("Invalid token:", error);
      localStorage.removeiitem("token");
      setUser(null);
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };
  return (
    <AuthContext.Provider value={{ user, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
