import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  Select,
  Button,
  Box,
  Flex,
  Heading,
  Text,
  GridItem,
  Grid,
} from '@chakra-ui/react';
import { setDate, setPeople } from '../../store/slices/bookingSlice';
import localService from '../../services/localService';
import CustomDatePicker from '../../components/DatePicker/CustomDatePicker';
import bookingService from '../../services/bookingService';

const getSiteData = async (id, setSiteData) => {
  const res = await localService.getLocalById(id);
  setSiteData(res);
};

const generateOptions = people => {
  let opts = [];
  for (let i = 1; i < 13; i++) {
    opts.push(
      <option key={i} value={i} selected={i == people ? 'selected' : ''}>
        {i}
      </option>
    );
  }
  return opts;
};

const BookingCreation = () => {
  const { local } = useParams();

  const { date, people } = useSelector(state => state.booking);

  const [bookings, setBookings] = useState([]);

  const dispatch = useDispatch();

  const [siteData, setSiteData] = useState(null);

  const navigate = useNavigate();

  const handleDateChange = v => {
    dispatch(setDate(v));
  };

  const handlePeopleChange = e => {
    dispatch(setPeople(e.target.value));
  };

  const handleSubmit = async () => {
    const res = await bookingService.createBooking(bookings, date);
    if (res) {
      console.log(res);
      navigate(`/confirmation/${res._id}`);
    }
  };

  useEffect(() => {
    getSiteData(local, setSiteData);
  }, [local]);

  useEffect(() => {
    if (siteData)
      setBookings(
        siteData.bookings.filter(b =>
          bookingService.getAvailability(b, date, people)
        )
      );
  }, [siteData, date, people]);

  console.log(bookings);

  return (
    <Grid
      templateAreas={{
        base: `"titulo"
              "fecha"
              "gente"
              "mesa"
              "enviar"`,
        md: `"titulo titulo titulo"
            "fecha gente mesa"
            "enviar enviar enviar"`,
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
        <Text>Booking for</Text>
        <Heading>{siteData?.name}</Heading>
      </GridItem>
      <GridItem area="fecha">
        <Text>When?</Text>

        <CustomDatePicker
          date={date}
          handleDateChange={handleDateChange}
        ></CustomDatePicker>
      </GridItem>
      <GridItem area="gente">
        <Text>How many people?</Text>
        <Select onChange={handlePeopleChange}>{generateOptions(people)}</Select>
      </GridItem>
      <GridItem area="mesa">
        <Text>Which table?</Text>
        <Select onChange={handlePeopleChange} disabled={true}></Select>
      </GridItem>
      <GridItem area="enviar" justifySelf="center">
        <Button onClick={handleSubmit} disabled={bookings.length === 0}>
          Book
        </Button>
      </GridItem>
    </Grid>
  );
};

export default BookingCreation;
