import React, {useState} from 'react';

let logoutTimeout;

const AuthContext = React.createContext({
    token: '',
    isLoggedIn: false,
    email: '',
    roles: [],
    login: () => {},
    logout: () => {}
});

const calculateRemainingTime = (expirationTime) => {
    const currentTime = new Date().getTime();
    const adjExpirationTime = new Date(expirationTime).getTime();
    const remainingDuration = adjExpirationTime - currentTime;

    return remainingDuration;
};

const retrieveStoredToken = () => {
    const storedToken =  localStorage.getItem('token');
    const storedExpirationTime =  localStorage.getItem('expirationTime');
    const storedEmail =  localStorage.getItem('email');
    const storedRoles =  localStorage.getItem('roles');
    const remainingTime = calculateRemainingTime(storedExpirationTime);

    if (remainingTime <= 60000) {
        localStorage.removeItem('token');
        localStorage.removeItem('email');
        localStorage.removeItem('roles');
        localStorage.removeItem('expirationTime');
        return null;
    }

    return { token: storedToken, email: storedEmail, duration: remainingTime, roles: storedRoles };

};

export const AuthContextProvider = (props) => {
    const storedData =  retrieveStoredToken();
    let initialData = {token: '', email: '', roles: []};

    if (storedData) {
        initialData.token = storedData.token;
        initialData.email = storedData.email;
        initialData.roles = storedData.roles;
    }

    const [token, setToken] = useState(initialData.token);
    const [email, setEmail] = useState(initialData.email);
    const [roles, setRoles] = useState(initialData.roles);

    const userIsLoggedIn = !!token;

    const logoutHandler = () => {
        setToken(null);
        setEmail(null);
        setRoles(null);
        localStorage.removeItem('token');
        localStorage.removeItem('email');
        localStorage.removeItem('roles');
        localStorage.removeItem('expirationTime');

        if (logoutTimeout) {
            clearTimeout(logoutTimeout);
        }
    };

    const loginHandler = (email, token, expirationTime, roles) => {
        setToken(token);
        setEmail(email); 
        setRoles(roles);
        localStorage.setItem('token', token);
        localStorage.setItem('expirationTime', expirationTime);
        localStorage.setItem('email', email);
        localStorage.setItem('roles', roles);
    };

    const contextValue = {
        token: token,
        email: email,
        roles: roles,
        isLoggedIn: userIsLoggedIn,
        login: loginHandler,
        logout: logoutHandler,
    };

    return <AuthContext.Provider value={ contextValue }>{props.children}</AuthContext.Provider>;
};

export default AuthContext;