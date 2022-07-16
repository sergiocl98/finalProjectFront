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

    login(username, password) {
        return restService.post('/login', {
             username: username,
             password: password,
            }).then(response => {
                if (response.data) {
                    return response.data;
                }
        });
    }
}
export default new AuthService ();