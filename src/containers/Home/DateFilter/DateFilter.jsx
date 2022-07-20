import React from 'react';
import { Heading, Flex } from '@chakra-ui/react';
import { useSelector, useDispatch } from 'react-redux';
import { setDate } from '../../../store/slices/bookingSlice';
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const DateFilter = () => {
  const { date } = useSelector(state => state.booking);
  const dispatch = useDispatch();

  const handleDateChange = v => {
    dispatch(setDate(v));
  };

  return (
    <Flex flexDirection="column">
      <Heading>Date and hour</Heading>
      <ReactDatePicker
        selected={date}
        onChange={handleDateChange}
        showTimeSelect
        timeIntervals={30}
        timeCaption="time"
        dateFormat="dd/MM/yyyy hh:mm aa"
      ></ReactDatePicker>
    </Flex>
  );
};

export default DateFilter;
