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
}
export default new UserService();