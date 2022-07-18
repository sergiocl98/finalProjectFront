import restService from './restService';

class LocalService {
  getLocals = () => {
    const endPoint = '/locales';

    return restService.get(endPoint).then(res => {
      if (res.data) return res.data;
    });
  };

  getLocal = id => {
    const endPoint = `/locales/${id}`;

    return restService.get(endPoint).then(res => {
      if (res.data) return res.data;
    });
  };
}
export default new LocalService();
