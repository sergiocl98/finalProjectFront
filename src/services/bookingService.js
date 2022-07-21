import restService from './restService';

class BookingService {
  createBooking = (local, user, date) => {
    const endPoint = `booking`;

    return restService
      .post(endPoint, {
        local,
        user,
        date,
      })
      .then(res => {
        if (res.data) return res.data;
      });
  };

  getBookingById = id => {
    const endPoint = `booking/${id}`;

    return restService.get(endPoint).then(res => {
      if (res.data) return res.data;
    });
  };
}
export default new BookingService();
