import restService from './restService';
import userService from './userService';

class BookingService {
  createBooking = (bookings, date) => {
    const endPoint = `booking/request`;

    const user = userService.getUser();

    const start = new Date(date);
    const end = new Date(start.getTime() + 1000 * 60 * 90);

    return restService
      .patch(endPoint, {
        user: user.userId,
        bookings,
        lastBook: { start, end },
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

  getAvailability = (booking, date, people) => {
    if (date === '') return true;
    const peopleFilter = parseInt(booking.people) === parseInt(people);
    if (!peopleFilter) return false;

    const res = booking.lastBook.map(b => {
      if (b.start === '' && b.end === '') return true;

      const reqDate = new Date(date);
      const strDate = new Date(b.start);
      const endDate = new Date(b.end);

      const reqTime = reqDate.getTime();
      const strTime = strDate.getTime();
      const endTime = endDate.getTime();

      const TIME = 1000 * 60 * 90;

      const dateFilter = reqTime <= strTime - TIME || reqTime >= endTime;
      if (!dateFilter) return false;

      return true;
    });
    return res.every(v => v);
  };
}
export default new BookingService();
