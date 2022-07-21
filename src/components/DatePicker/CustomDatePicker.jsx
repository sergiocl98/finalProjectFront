import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '../Form/DatepickerController.css';
import { InputGroup, InputRightElement } from '@chakra-ui/react';
import { Calendar } from 'phosphor-react';

const filterPassedDate = date => {
  const currentDate = new Date();
  const selectedDate = new Date(date);

  const currentDateMod = new Date(
    currentDate.getUTCFullYear() +
      '/' +
      currentDate.getUTCMonth() +
      '/' +
      currentDate.getUTCDate()
  );
  const selectedDateMod = new Date(
    selectedDate.getUTCFullYear() +
      '/' +
      selectedDate.getUTCMonth() +
      '/' +
      selectedDate.getUTCDate()
  );

  return (
    currentDateMod.getTime() <= selectedDateMod.getTime() + 1000 * 60 * 60 * 24
  );
};

const filterPassedTime = time => {
  const currentDate = new Date();
  const selectedDate = new Date(time);

  return currentDate.getTime() < selectedDate.getTime();
};

const CustomDatePicker = ({ date, handleDateChange }) => {
  return (
    <InputGroup>
      <DatePicker
        selected={date}
        onChange={handleDateChange}
        showTimeSelect
        timeIntervals={30}
        filterDate={filterPassedDate}
        filterTime={filterPassedTime}
        timeCaption="time"
        dateFormat="dd/MM/yyyy HH:mm"
      />
      <InputRightElement w="" zIndex="1" mr={'6px'}>
        <Calendar size={32} weight="thin" />
      </InputRightElement>
    </InputGroup>
  );
};

export default CustomDatePicker;
