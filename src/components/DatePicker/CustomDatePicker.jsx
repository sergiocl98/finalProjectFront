import React from 'react';
import ReactDatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';

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

const CustomDatePicker = ({date, onChange}) => {
  console.log(date)
  return (
    <ReactDatePicker
      selected={date}
      onChange={onChange}
      showTimeSelect
      timeIntervals={30}
      filterDate={filterPassedDate}
      filterTime={filterPassedTime}
      timeCaption="time"
      dateFormat="dd/MM/yyyy HH:mm"
    ></ReactDatePicker>
  );
};

export default CustomDatePicker;
