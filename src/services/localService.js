import restService from './restService';

class LocalService {
  getLocals = () => {
    const endPoint = 'locales';

    return restService.get(endPoint).then(res => {
      if (res.data) return res.data;
    });
  };

  getLocalById = id => {
    const endPoint = `locales/${id}`;

    return restService.get(endPoint).then(res => {
      if (res.data) return res.data;
    });
  };

  createLocal = (coords, name, address) => {
    const endPoint = `locales`;

    return restService
      .post(endPoint, {
        coords,
        name,
        address,
      })
      .then(res => {
        if (res.data) return res.data;
      });
  };
}
export default new LocalService();
