import { createContext } from 'react';

export const AuthContext=createContext({
    isLoggesIn:false,
    userId:null,
    token:null,
    email:null,
    name:null,
    login: () => {},
    logout: () => {},
})