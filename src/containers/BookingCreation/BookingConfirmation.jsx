import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Heading, Box, Text } from '@chakra-ui/react';
import bookingService from '../../services/bookingService';

const getBookingData = async (id, setBookingData) => {
  if (id === 'undefined') return null;
  const res = await bookingService.getBookingById(id);
  setBookingData(res);
};

const BookingConfirmation = () => {
  const { id } = useParams();

  const [bookingData, setBookingData] = useState(null);

  useEffect(() => {
    getBookingData(id, setBookingData);
  }, [id]);
  return (
    <>
      {id !== 'undefined' ? (
        <Box>
          <Heading>
            Your reservation id at {bookingData?.local} is confimed
          </Heading>
          <Box>
            <Text>Time: </Text>
            <Text>People: </Text>
            <Text>How to get there</Text>
          </Box>
        </Box>
      ) : (
        <Box>There was an error with your booking, please try again</Box>
      )}
    </>
  );
};

export default BookingConfirmation;
