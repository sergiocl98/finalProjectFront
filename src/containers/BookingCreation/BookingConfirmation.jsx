import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Clock, UsersThree } from 'phosphor-react';
import {
  Flex,
  Heading,
  Box,
  Text,
  GridItem,
  Grid,
  Button,
} from '@chakra-ui/react';
import bookingService from '../../services/bookingService';
import userService from '../../services/userService';
import localService from '../../services/localService';

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
        <Grid
          templateAreas={{
            base: `"titulo"
              "fecha"
              "gente"
              "mesa"
              "directions"`,
            md: `"titulo titulo titulo"
            "fecha gente mesa"
            "directions directions directions"`,
          }}
          templateRows={{ base: '1fr 1fr 1fr 1fr 1fr', md: '1fr 1fr auto' }}
          templateColumns={{ base: '1fr', md: '1fr 1fr 1fr' }}
          gap="1rem"
          bgColor="white"
          mt="1rem"
          p="1rem"
          pb="3rem"
        >
          <GridItem area="titulo">
            <Text>Your Booking at</Text>
            <Heading>{bookingData?.local?.name}</Heading>
          </GridItem>
          <GridItem area="fecha">
            <Flex alignItems="center">
              <Clock size={32} /> {data.time}
            </Flex>
          </GridItem>
          <GridItem area="gente">
            <Flex alignItems="center">
              <UsersThree size={32} /> {bookingData?.people} people
            </Flex>
          </GridItem>
          <GridItem area="mesa">
            <Text>table type</Text>
          </GridItem>
          <GridItem area="directions" justifySelf="center">
            <Button
              onClick={() => {
                const { lat, lng } = bookingData?.local.coords;
                localService.getLocalGoogleMapsURL([lng, lat]);
              }}
            >
              How to get there
            </Button>
          </GridItem>
        </Grid>
      ) : (
        <Box>There was an error with your booking, please try again</Box>
      )}
    </>
  );
};

export default BookingConfirmation;
