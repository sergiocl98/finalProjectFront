import restService from './restService';

class BookingService {
  createBooking = (local, user, startDate, endDate, location, people) => {
    const endPoint = `booking`;

    // return restService
    //   .put(endPoint, {
    //     local,
    //     user,
    //     startDate,
    //     endDate,
    //     location,
    //     people,
    //   })
    //   .then(res => {
    //     if (res.data) return res.data;
    //   });
    return "F"
  };

  getBookingById = id => {
    const endPoint = `booking/${id}`;

    return restService.get(endPoint).then(res => {
      if (res.data) return res.data;
    });
  };
}
export default new BookingService();
