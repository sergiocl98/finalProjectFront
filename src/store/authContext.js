import React, {useState} from 'react';

let logoutTimeout;

const AuthContext = React.createContext({
    token: '',
    isLoggedIn: false,
    username: '',
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
    const storedUsername =  localStorage.getItem('userName');
    const storedRoles =  localStorage.getItem('roles');
    const remainingTime = calculateRemainingTime(storedExpirationTime);

    if (remainingTime <= 60000) {
        localStorage.removeItem('token');
        localStorage.removeItem('userName');
        localStorage.removeItem('roles');
        localStorage.removeItem('expirationTime');
        return null;
    }

    return { token: storedToken, userName: storedUsername, duration: remainingTime, roles: storedRoles };

};

export const AuthContextProvider = (props) => {
    const storedData =  retrieveStoredToken();
    let initialData = {token: '', userName: '', roles: []};

    if (storedData) {
        initialData.token = storedData.token;
        initialData.userName = storedData.userName;
        initialData.roles = storedData.roles;
    }

    const [token, setToken] = useState(initialData.token);
    const [userName, setUserName] = useState(initialData.userName);
    const [roles, setRoles] = useState(initialData.roles);

    const userIsLoggedIn = !!token;

    const logoutHandler = () => {
        setToken(null);
        setUserName(null);
        setRoles(null);
        localStorage.removeItem('token');
        localStorage.removeItem('userName');
        localStorage.removeItem('roles');
        localStorage.removeItem('expirationTime');

        if (logoutTimeout) {
            clearTimeout(logoutTimeout);
        }
    };

    const loginHandler = (userName, token, expirationTime, roles) => {
        setToken(token);
        setUserName(userName); 
        setRoles(roles);
        localStorage.setItem('token', token);
        localStorage.setItem('expirationTime', expirationTime);
        localStorage.setItem('userName', userName);
        localStorage.setItem('roles', roles);
    };

    const contextValue = {
        token: token,
        username: userName,
        roles: roles,
        isLoggedIn: userIsLoggedIn,
        login: loginHandler,
        logout: logoutHandler,
    };

    return <AuthContext.Provider value={ contextValue }>{props.children}</AuthContext.Provider>;
};

export default AuthContext;