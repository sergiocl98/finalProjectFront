import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Box, Flex, Heading, Text } from '@chakra-ui/react';
import { setDate } from '../../store/slices/bookingSlice';
import localService from '../../services/localService';
import CustomDatePicker from '../../components/DatePicker/CustomDatePicker';
import bookingService from '../../services/bookingService';
import userService from '../../services/userService';

const getSiteData = async (id, setSiteData) => {
  const res = await localService.getLocalById(id);
  setSiteData(res);
};

const BookingCreation = () => {
  const { local } = useParams();

  const { date } = useSelector(state => state.booking);

  const dispatch = useDispatch();

  const user = userService.getUser();

  const [siteData, setSiteData] = useState(null);

  const navigate = useNavigate();

  const handleDateChange = v => {
    dispatch(setDate(v));
  };

  const handleSubmit = async () => {
    const res = await bookingService.createBooking(local, user.userId, date);
    if (res) {
      navigate(`/confirmation/${res._id}`);
    }
  };

  useEffect(() => {
    getSiteData(local, setSiteData);
  }, [local]);

  return (
    <Flex
      flexDir="column"
      alignItems="center"
      justifyContent="center"
      textAlign="center"
    >
      <Box>
        <Text>Booking for</Text>
        <Heading>{siteData?.name}</Heading>
      </Box>
      <Box>
        <Text>Your Date</Text>

        <CustomDatePicker
          date={date}
          handleDateChange={handleDateChange}
        ></CustomDatePicker>
      </Box>
      <Box>
        <Text>Select your table</Text>
      </Box>
      <Button onClick={handleSubmit}>Book</Button>
    </Flex>
  );
};

export default BookingCreation;
