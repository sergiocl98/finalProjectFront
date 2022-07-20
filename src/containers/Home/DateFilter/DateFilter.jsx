import React from 'react';
import { Heading, Flex } from '@chakra-ui/react';
import { useSelector, useDispatch } from 'react-redux';
import { setDate } from '../../../store/slices/bookingSlice';
import CustomDatePicker from '../../../components/DatePicker/CustomDatePicker';



const DateFilter = () => {
  const { date } = useSelector(state => state.booking);
  const dispatch = useDispatch();

  const handleDateChange = v => {
    dispatch(setDate(v));
  };

  return (
    <Flex flexDirection="column">
      <Heading>Date and hour</Heading>
      <CustomDatePicker
        date={date}
        handleDateChange={handleDateChange}
      ></CustomDatePicker>
    </Flex>
  );
};

export default DateFilter;
