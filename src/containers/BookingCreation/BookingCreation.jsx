import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Box, Flex, Heading, Text } from '@chakra-ui/react';
import { setDate } from '../../store/slices/bookingSlice';
import localService from '../../services/localService';
import CustomDatePicker from '../../components/DatePicker/CustomDatePicker';

const getSiteData = async (id, setSiteData) => {
  const res = await localService.getLocalById(id);
  setSiteData(res);
};

const BookingCreation = () => {
  const { local } = useParams();
  const { date } = useSelector(state => state.booking);
  const dispatch = useDispatch();

  const [siteData, setSiteData] = useState(null);

  const handleDateChange = v => {
    dispatch(setDate(v));
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
      <Button>Book</Button>
    </Flex>
  );
};

export default BookingCreation;
