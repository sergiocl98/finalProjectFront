import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Heading, Box, Text, Flex, Button } from '@chakra-ui/react';
import bookingService from '../../services/bookingService';
import userService from '../../services/userService';

const getBookingData = async (id, setBookingData) => {
  if (id === 'undefined') return null;
  const res = await bookingService.getBookingById(id);
  setBookingData(res);
};

const BookingConfirmation = () => {
  const { id } = useParams();

  const [bookingData, setBookingData] = useState(null);
  const [data, setData] = useState({});

  useEffect(() => {
    getBookingData(id, setBookingData);
  }, [id]);

  useEffect(() => {
    if (bookingData) {
      if (bookingData) {
        const book = bookingData.lastBook
          .reverse()
          .find(b => b.user === userService.getUser().userId);

        const date = new Date(book.start);

        setData(oldValue => {
          return { ...oldValue, time: date.toLocaleTimeString() };
        });
      }
    }
  }, [bookingData]);

  return (
    <>
      {id !== 'undefined' ? (
        <Flex
          justifyContent="center"
          alignItems="flexStart"
          flexDir="column"
          pr="20%"
          pl="20%"
        >
          <Box>
            <Heading>
              Your reservation at{' '}
              <Text display="inline-block" color="red">{bookingData?.local.name}</Text> is confirmed
            </Heading>
          </Box>
          <Box>
            <Heading>Time:</Heading>
            <Text>{data?.time}</Text>
            <Box>
              <Heading>People</Heading>
              <Text>{bookingData?.people}</Text>
            </Box>

            <Button>How to get there</Button>
          </Box>
        </Flex>
      ) : (
        <Box>There was an error with your booking, please try again</Box>
      )}
    </>
  );
};

export default BookingConfirmation;
