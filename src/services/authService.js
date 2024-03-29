import userService from './userService';
import restService from './restService';

class AuthService {
    authHeader() {
        let token = userService.getToken();
        if (token) {
            return {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
            };
        } else {
            return {};
        }
    }

    login(email, password) {
        return restService.post('user/login', {
             email: email,
             password: password,
            }).then(response => {
                if (response.data) {
                    return response;
                }
        });
    }

    register(email, password, name) {
        return restService.post('user/register', {
             email: email,
             password: password,
             name: name
            }).then(response => {
                if (response.data) {
                    return response;
                }
        });
    }
}
export default new AuthService ();