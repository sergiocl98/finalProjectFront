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
                    console.log('Response en auth',response);
                    return response;
                }
        });
    }
}
export default new AuthService ();