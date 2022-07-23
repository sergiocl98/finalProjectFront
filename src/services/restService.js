import axios from 'axios';
import moment from 'moment';
import userService from './userService';
import AuthService from './authService';
import { toast } from 'react-toastify';
import jwt_decode from 'jwt-decode';

//const AVAILABLE_REQUEST_CODES = [200,201,202];

class RestService {

    subscribeEvent = (url) => {
        let sse = new EventSource(url, { withCredentials: true });

        sse.onmessage = (e) => {
            console.log(JSON.parse(e.data));
        };

        sse.onerror = (e) => {
            console.log(e); 
            sse.close();
        };

        return () => {
            sse.close();
        };
    }


    getWithToast = (url, onSuccess = 'Resolve', onError = 'Error', onPending = 'Pending', mockCode = null, cancelToken = null) => {

        return new Promise((resolve, reject) => {
            const id = toast.loading(onPending);

            let config = {
                headers: AuthService.authHeader(),
            };

            if (cancelToken) {
                config.cancelToken = cancelToken.token;
            }

            if (this.checkEnviromentIsDevelopmentOrTest() && mockCode) {
                config.headers.Prefer = `code=${mockCode}`;
            }
            try {
                
                axios.get(this.resolveUrl(url), config).then((e) => {
                        toast.update(id, { render: onSuccess, type: 'success', isLoading: false, autoClose: 3000, closeOnClick: true, closeButton: true, hideProgressBar: false });
                        resolve(e);
                    })
                    .catch((error) => {

                        toast.update(id, { render: 
                            (error.response?.data?.errors !== undefined && error.response?.data?.errors.length > 0 ? error.response?.data?.errors[0].detail : onError), 
                            type: 'error', isLoading: false, autoClose: 3000, closeOnClick: true, closeButton: true, hideProgressBar: false });

                        if (!error.response) {
                            reject(error);
                        }

                        if (error.response.status === 403 || error.response.status === 404) {
                            reject(error);
                        }

                        if (error.response.status === 401) {
                            const token = this.getToken();
                            const expiresAt = moment(token.exp);

                            if (moment().isAfter(expiresAt)) {
                                AuthService.logout();
                                window.location = '/log_in';
                            }

                            reject(error);
                        }
                    });
            } catch (e) {
                //reject;
            }
        });

    }

    postWithToast = (url, body, onSuccess = 'Resolve', onError = 'Error', onPending = 'Pending', mockCode = null, customConfig = null) => {

        return new Promise((resolve, reject) => {
            const id = toast.loading(onPending);

            let config = {
                headers: {
                    ...AuthService.authHeader(),
                    ...customConfig
                }
            };
    
            if (this.checkEnviromentIsDevelopmentOrTest() && mockCode) {
                config.headers.Prefer = `code=${mockCode}`;
            }
    
            return axios.post(this.resolveUrl(url), body, config).then((e) => {
                    toast.update(id, { render: onSuccess, type: 'success', isLoading: false, autoClose: 3000, closeOnClick: true, closeButton: true, hideProgressBar: false });
                    resolve(e);
                })
                .catch((error) => {

                    toast.update(id, { render: 
                        (error.response?.data?.errors !== undefined && error.response?.data?.errors.length > 0 ? error.response?.data?.errors[0].detail : onError), 
                        type: 'error', isLoading: false, autoClose: 3000, closeOnClick: true, closeButton: true, hideProgressBar: false });

                    if (!error.response) {
                        reject(error);
                    }

                    if (error.response.status === 403 || error.response.status === 404) {
                        reject(error);
                    }

                    if (error.response.status === 401) {
                        const token = this.getToken();
                        const expiresAt = moment(token.exp);

                        if (moment().isAfter(expiresAt)) {
                            AuthService.logout();
                            window.location = '/log_in';
                        }

                        reject(error);
                    }
                });
    
        });

    }

    putWithToast = (url, onSuccess = 'Resolve', onError = 'Error', onPending = 'Pending', mockCode = null, customConfig = null) => {

        return new Promise((resolve, reject) => {
            const id = toast.loading(onPending);

            let config = {
                headers: {
                    ...AuthService.authHeader(),
                    ...customConfig
                }
            };
    
            if (this.checkEnviromentIsDevelopmentOrTest() && mockCode) {
                config.headers.Prefer = `code=${mockCode}`;
            }
    
            return axios.put(this.resolveUrl(url), {}, config).then((e) => {
                    toast.update(id, { render: onSuccess, type: 'success', isLoading: false, autoClose: 3000, closeOnClick: true, closeButton: true, hideProgressBar: false });
                    resolve(e);
                })
                .catch((error) => {

                    toast.update(id, { render: 
                        (error.response?.data?.errors !== undefined && error.response?.data?.errors.length > 0 ? error.response?.data?.errors[0].detail : onError), 
                        type: 'error', isLoading: false, autoClose: 3000, closeOnClick: true, closeButton: true, hideProgressBar: false });

                    if (!error.response) {
                        reject(error);
                    }

                    if (error.response.status === 403 || error.response.status === 404) {
                        reject(error);
                    }

                    if (error.response.status === 401) {
                        const token = this.getToken();
                        const expiresAt = moment(token.exp);

                        if (moment().isAfter(expiresAt)) {
                            AuthService.logout();
                            window.location = '/log_in';
                        }

                        reject(error);
                    }
                });
    
        });

    }
    
    putWithToastBody = (url, body, onSuccess = 'Resolve', onError = 'Error', onPending = 'Pending', mockCode = null, customConfig = null) => {

        return new Promise((resolve, reject) => {
            const id = toast.loading(onPending);

            let config = {
                headers: {
                    ...AuthService.authHeader(),
                    ...customConfig
                }
            };
    
            if (this.checkEnviromentIsDevelopmentOrTest() && mockCode) {
                config.headers.Prefer = `code=${mockCode}`;
            }
    
            return axios.put(this.resolveUrl(url), body, config).then((e) => {
                    toast.update(id, { render: onSuccess, type: 'success', isLoading: false, autoClose: 3000, closeOnClick: true, closeButton: true, hideProgressBar: false });
                    resolve(e);
                })
                .catch((error) => {

                    toast.update(id, { render: 
                        (error.response?.data?.errors !== undefined && error.response?.data?.errors.length > 0 ? error.response?.data?.errors[0].detail : onError), 
                        type: 'error', isLoading: false, autoClose: 3000, closeOnClick: true, closeButton: true, hideProgressBar: false });

                    if (!error.response) {
                        reject(error);
                    }

                    if (error.response.status === 403 || error.response.status === 404) {
                        reject(error);
                    }

                    if (error.response.status === 401) {
                        const token = this.getToken();
                        const expiresAt = moment(token.exp);

                        if (moment().isAfter(expiresAt)) {
                            AuthService.logout();
                            window.location = '/log_in';
                        }

                        reject(error);
                    }
                });
    
        });

    }

    deleteWithToast = (url, onSuccess = 'Resolve', onError = 'Error', onPending = 'Pending', mockCode = null, customConfig = null) => {

        return new Promise((resolve, reject) => {
            const id = toast.loading(onPending);

            let config = {
                headers: {
                    ...AuthService.authHeader(),
                    ...customConfig
                }
            };
    
            if (this.checkEnviromentIsDevelopmentOrTest() && mockCode) {
                config.headers.Prefer = `code=${mockCode}`;
            }
    
            return axios.delete(this.resolveUrl(url), config).then((e) => {
                    toast.update(id, { render: onSuccess, type: 'success', isLoading: false, autoClose: 3000, closeOnClick: true, closeButton: true, hideProgressBar: false });
                    resolve(e);
                })
                .catch((error) => {

                    toast.update(id, { render: 
                        (error.response?.data?.errors !== undefined && error.response?.data?.errors.length > 0 ? error.response?.data?.errors[0].detail : onError), 
                        type: 'error', isLoading: false, autoClose: 3000, closeOnClick: true, closeButton: true, hideProgressBar: false });

                    if (!error.response) {
                        reject(error);
                    }

                    if (error.response.status === 403 || error.response.status === 404) {
                        reject(error);
                    }

                    if (error.response.status === 401) {
                        const token = this.getToken();
                        const expiresAt = moment(token.exp);

                        if (moment().isAfter(expiresAt)) {
                            AuthService.logout();
                            window.location = '/log_in';
                        }

                        reject(error);
                    }
                });
    
        });

    }

    resolveUrl(url) {
        return url.startsWith('http') ? url : `${process.env.REACT_APP_API_URL}${url}`;
    }

    getDocument = (url) => {
        let config = {
            headers: AuthService.authHeader(),
            responseType: 'arraybuffer'
        };
        try {
            return axios.get(`${process.env.REACT_APP_API_URL}${url}`, config);
        } catch (e) {
            //reject;
        }
    };

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

    checkEnviromentIsDevelopmentOrTest = () => {
        return (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test');
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
}

export default new RestService();