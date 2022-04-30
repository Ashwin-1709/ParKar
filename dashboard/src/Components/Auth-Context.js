import React,{useState} from "react";
import { auth } from "../firestore";
const AuthContext = React.createContext({
    isLoggedIn : false,
    onLogout : () => {},
    onLogin : (user)=>{}
});
export const AuthContextProvider = (props) => {
    const [loggedIn,setloggedIn] = useState(false);
    const loginHandler = (token) => {
        setloggedIn(true);
    }
    const logoutHandler = () => {
        setloggedIn(false);
    }
    const contextValue = {
        isLoggedIn : loggedIn,
        onLogin:loginHandler,
        onLogout:logoutHandler
    }
    return (
        <AuthContext.Provider value={contextValue}>
            {props.children}
        </AuthContext.Provider>
    );
};
export default AuthContext;
