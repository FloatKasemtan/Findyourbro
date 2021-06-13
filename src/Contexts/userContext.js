import React, { useState, createContext } from "react";

export const userContext = createContext();

export const UserContextProvider = ({ children }) => {
    const [profile, setProfile] = useState({ name: "Float", });
    const [loggedIn, setloggedIn] = useState(false);
    const handlers = {
        profile: profile,
        loggedIn: loggedIn,
        setloggedIn: (newStatus) => {
            setloggedIn(newStatus)
        },
        setProfile: (newProfile) => {
            setProfile((profile) => ({
                ...profile,
                ...newProfile,
            }));
        },
        reload: () => {
            setProfile();
            setloggedIn();
        },
    };

    return (
        <userContext.Provider value={handlers}>
            {children}
        </userContext.Provider>
    );
};