import React, {useState} from 'react';

let logoutTimeout;

const AuthContext = React.createContext({
    token: '',
    isLoggedIn: false,
    email: '',
    roles: [],
    user: {},
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
    const storedUser =  localStorage.getItem('user');
    const remainingTime = calculateRemainingTime(storedExpirationTime);

    if (remainingTime <= 60000) {
        localStorage.removeItem('token');
        localStorage.removeItem('email');
        localStorage.removeItem('roles');
        localStorage.removeItem('user');
        localStorage.removeItem('expirationTime');
        return null;
    }

    return { token: storedToken, email: storedEmail, duration: remainingTime, roles: storedRoles, user: storedUser };

};

export const AuthContextProvider = (props) => {
    const storedData =  retrieveStoredToken();
    let initialData = {token: '', email: '', roles: [], user: {}};

    if (storedData) {
        initialData.token = storedData.token;
        initialData.email = storedData.email;
        initialData.roles = storedData.roles;
        initialData.user = storedData.user;
    }

    const [token, setToken] = useState(initialData.token);
    const [email, setEmail] = useState(initialData.email);
    const [roles, setRoles] = useState(initialData.roles);
    const [user, setUser] = useState(initialData.user);

    const userIsLoggedIn = !!token;

    const logoutHandler = () => {
        setToken(null);
        setEmail(null);
        setRoles(null);
        setUser(null);
        localStorage.removeItem('token');
        localStorage.removeItem('email');
        localStorage.removeItem('roles');
        localStorage.removeItem('expirationTime');
        localStorage.removeItem('user');

        if (logoutTimeout) {
            clearTimeout(logoutTimeout);
        }
    };

    const loginHandler = (email, token, expirationTime, roles, user) => {
        setToken(token);
        setEmail(email); 
        setRoles(roles);
        setUser(user);
        localStorage.setItem('token', token);
        localStorage.setItem('expirationTime', expirationTime);
        localStorage.setItem('email', email);
        localStorage.setItem('roles', roles);
        localStorage.setItem('user', user);
    };

    const contextValue = {
        token: token,
        email: email,
        roles: roles,
        user: user,
        isLoggedIn: userIsLoggedIn,
        login: loginHandler,
        logout: logoutHandler,
    };

    return <AuthContext.Provider value={ contextValue }>{props.children}</AuthContext.Provider>;
};

export default AuthContext;