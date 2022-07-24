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

  getLocalGoogleMapsURL = coords => {
    window.open(
      `https://www.google.com/maps/dir//${coords[1]},${coords[0]}/?travelmode=walking`,
      '_blank'
    );
  };
}
export default new LocalService();
