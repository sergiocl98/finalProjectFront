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

  getLocalGoogleMapsURL = local => {
    this.getLocalById(local).then(data => {
      window.open(
        `https://www.google.com/maps/dir//${data.coords.lat},${data.coords.lng}/?travelmode=walking`,
        '_blank'
      );
    });
  };
}
export default new LocalService();
