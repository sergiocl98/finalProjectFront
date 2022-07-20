import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Box, Text } from '@chakra-ui/react';

const BookingCreation = () => {
  const { local } = useParams();
  const { date } = useSelector(state => state.booking);
  console.log(local, date);
  return (
    <Box>
      <Text>{local}</Text>
      <Text>{date.toString()}</Text>
    </Box>
  );
};

export default BookingCreation;
