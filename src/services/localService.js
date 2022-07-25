import restService from './restService';
import UserService from './userService';

class LocalService {
  getLocals = () => {
    const endPoint = 'locales';

    return restService.get(endPoint).then(res => {
      if (res.data) return res.data;
    });
  };

  getUserLocals = () => {
    const userID = UserService.getUser().userId;

    return restService.get(`user/locales/${userID}`).then(res => {
      if (res.data) return res.data.locales;
    });
  };

  getLocalById = id => {
    const endPoint = `locales/${id}`;

    return restService.get(endPoint).then(res => {
      if (res.data) return res.data;
    });
  };

  createLocal = data => {
    const endPoint = `locales`;

    return restService.post(endPoint, data).then(res => {
      if (res.data) return res.data;
    });
  };

  updateLocal = (id, data) => {
    const endPoint = `locales/edit/${id}`;

    return restService.patch(endPoint, data).then(res => {
      if (res.data) return res.data;
    });
  };

  getLocalGoogleMapsURL = coords => {
    window.open(
      `https://www.google.com/maps/dir//${coords[1]},${coords[0]}/?travelmode=walking`,
      '_blank'
    );
  };
}
export default new LocalService();
