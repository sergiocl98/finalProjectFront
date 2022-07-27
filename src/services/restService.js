import axios from 'axios';
import moment from 'moment';
import userService from './userService';
import AuthService from './authService';
import { toast } from 'react-toastify';
import jwt_decode from 'jwt-decode';

//const AVAILABLE_REQUEST_CODES = [200,201,202];

class RestService {

    get = (url, mockCode = null, cancelToken = null, transformResponse = null) => {
        let config = {
            headers: AuthService.authHeader(),
        };

        if (cancelToken) {
            config.cancelToken = cancelToken.token;
        }

        if (transformResponse) {
            config.transformResponse = [(data) => (data)];
        }

        if (this.checkEnviromentIsDevelopmentOrTest() && mockCode) {
            config.headers.Prefer = `code=${mockCode}`;
        }
        try {
            return axios.get(`${process.env.REACT_APP_API_URL}${url}`, config)
                .catch((error) => {
                    if (!error.response) {
                        return;
                    }

                    if (error.response.status === 403 || error.response.status === 404) {
                        return error.response.status;
                    }

                    if (error.response.status === 401) {
                        const token = this.getToken();
                        const expiresAt = moment(token.exp);

                        if (moment().isAfter(expiresAt)) {
                            AuthService.logout();
                            window.location = '/login';
                        }
                    }
                });
        } catch (e) {
            //reject;
        }
    };
    getToken = () => {
        let user = userService.getUser();
        return jwt_decode(user.access_token);
    };

    post = (url, body, mockCode = null, customConfig = null) => {
        let config = {
            headers: {
                ...AuthService.authHeader(),
                ...customConfig
            }
        };

        if (this.checkEnviromentIsDevelopmentOrTest() && mockCode) {
            config.headers.Prefer = `code=${mockCode}`;
        }

        return axios.post(`${process.env.REACT_APP_API_URL}${url}`, body, config)
            .catch((error) => {
                if (!error.response) {
                    return;
                } else {
                    return error.response;
                }
            });
    };

    put = (url, body, mockCode = null) => {
        let config = {
            headers: AuthService.authHeader(),
        };
        if (this.checkEnviromentIsDevelopmentOrTest() && mockCode) {
            config.headers.Prefer = `code=${mockCode}`;
        }
        return axios.put(`${process.env.REACT_APP_API_URL}${url}`, body, config)
            .catch((error) => {
                if (!error.response) {
                    return;
                } else {
                    return error.response;
                }
            });
    };

    patch = (url, body, mockCode = null) => {
        let config = {
            headers: AuthService.authHeader(),
        };
        if (this.checkEnviromentIsDevelopmentOrTest() && mockCode) {
            config.headers.Prefer = `code=${mockCode}`;
        }
        return axios.patch(`${process.env.REACT_APP_API_URL}${url}`, body, config)
            .catch((error) => {
                if (!error.response) {
                    return;
                } else {
                    return error.response;
                }
            });
    };

    delete = (url, mockCode = null) => {
        let config = {
            headers: AuthService.authHeader(),
        };
        if (this.checkEnviromentIsDevelopmentOrTest() && mockCode) {
            config.headers.Prefer = `code=${mockCode}`;
        }
        return axios.delete(`${process.env.REACT_APP_API_URL}${url}`, config)
            .catch((error) => {
                if (!error.response) {
                    return;
                } else {
                    return error.response;
                }
            });
    };

    checkEnviromentIsDevelopmentOrTest = () => {
        return (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test');
    };
}

export default new RestService();