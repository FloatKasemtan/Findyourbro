import React, { useState, createContext } from "react";
import Cookies from 'js-cookie';
import jwt from 'jsonwebtoken';

export const userContext = createContext();

const getProfile = () => {
    const token = Cookies.get("token");
    if (token) {
        try {
            const decoded = jwt.verify(token, 'shhhhh');
            return {
                firstName: decoded.firstName,
                lastName: decoded.lastName,
                student_id: decoded.student_id,
            };
        }
        catch (err) {
            console.log(err);
            Cookies.set('token', '');
        }
    } else {
        return {
            firstName: "",
            lastName: "",
            student_id: "",
            quota: 0,
        };
    }
};

export const UserContextProvider = ({ children }) => {
    const [profile, setProfile] = useState(getProfile);
    const handlers = {
        profile: profile,
        setProfile: (newProfile) => {
            setProfile((profile) => ({
                ...profile,
                ...newProfile,
            }));
        },
        reload: () => {
            setProfile(getProfile());
        },
    };

    return (
        <userContext.Provider value={handlers}>
            {children}
        </userContext.Provider>
    );
};