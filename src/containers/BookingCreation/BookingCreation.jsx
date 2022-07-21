import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Select, Button, Box, Flex, Heading, Text } from '@chakra-ui/react';
import { setDate, setPeople } from '../../store/slices/bookingSlice';
import localService from '../../services/localService';
import CustomDatePicker from '../../components/DatePicker/CustomDatePicker';
import bookingService from '../../services/bookingService';
import userService from '../../services/userService';

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

  const dispatch = useDispatch();

  const user = userService.getUser();

  const [siteData, setSiteData] = useState(null);

  const navigate = useNavigate();

  const handleDateChange = v => {
    dispatch(setDate(v));
  };

  const handlePeopleChange = e => {
    dispatch(setPeople(e.target.value));
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
      <Text>People</Text>
        <Select onChange={handlePeopleChange}>{generateOptions(people)}</Select>
      </Box>
      <Box>
        <Text>Select your table</Text>
      </Box>
      <Button onClick={handleSubmit}>Book</Button>
    </Flex>
  );
};

export default BookingCreation;
