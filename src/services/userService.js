import restService from "./restService";

class UserService {

    getUser() {
        let user = JSON.parse(localStorage.getItem('user'));
        return user;
    }

    getToken() {
        let token = localStorage.getItem('token');
        return token;
    }

    getUserLng() {
        let lng = localStorage.getItem('lng');
        return lng;
    }

    getRoles() {
        let roles = localStorage.getItem('roles');
        return roles?.split(',');    
    }

    checkExistRole(roles) {
        return this.getRoles()?.some(role => roles.includes(role));
    }

    getUserById = id => {
        const endPoint = `user/${id}`;
    
        return restService.get(endPoint).then(response => {
            if (!response) return Promise.reject();
            return response?.data;
        });
      };
}
export default new UserService();