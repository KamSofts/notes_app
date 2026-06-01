import { createContext, useEffect, useState, useCallback } from "react";
import api from "./api";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchUser = async () => {
        try {
            const response = await api.get("/auth/me");
            setUser(response.data);
        } catch (error) {
            setUser(null);
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const login = async (userData) => {
        try {
            const response = await api.post("/auth/login", userData);
            if (response.data.message === "Login success") {
                await fetchUser();
                return true;
            }
            return false;
        } catch (error) {
            setUser(null);
            console.error(error);
        }
    };

    const logout = async () => {
        try {
            await api.post("/auth/logout");
        } catch (error) {
            console.error("Logout failed:", error);
        } finally {
            setUser(null);
        }
    };

    useEffect(() => {
        fetchUser();
    }, []);

    return <AuthContext.Provider value={{ user, setUser, login, logout, loading }}>
        {children}
    </AuthContext.Provider>;
};
