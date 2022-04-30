import React, { useState,useEffect } from "react";
const RegistrationContext = React.createContext({
    firstname: '',
    lastname: '',
    email: '',
    isLoggedIn: 0,
    userType : '',
    user: {}
});
export const RegistrationProvider = (props) => {
    var def = {
        firstname: '',
        lastname: '',
        email: '',
        isLoggedIn: 0,
        userType : '',
        user: {
            firstname: "",
            lastname : "",
            email : "",
            address: "",
            app_user_role: "",
            phone_num: "",
            reg_id: "",
            username: ""
        }
    };
    if (localStorage.getItem("regCtx") !== null) {
        const str = JSON.parse(localStorage.getItem('regCtx'));
        def = str;
    }

    const [regCtx, setRegCtx] = useState(def);
    const obj = {
        regCtx,
        setRegCtx
    }
    return <RegistrationContext.Provider value={obj}>{props.children}</RegistrationContext.Provider>
}
export default RegistrationContext;
