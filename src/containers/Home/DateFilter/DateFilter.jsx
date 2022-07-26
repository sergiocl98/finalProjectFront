import React from 'react';
import { Select, Flex, Text } from '@chakra-ui/react';
import { useSelector, useDispatch } from 'react-redux';
import { setDate, setPeople } from '../../../store/slices/bookingSlice';
import CustomDatePicker from '../../../components/DatePicker/CustomDatePicker';
import { UsersThree } from 'phosphor-react';

const generateOptions = people => {
  let opts = [];
  for (let i = 1; i < 13; i++) {
    opts.push(
      <option key={i} value={i}>
        {i}
      </option>
    );
  }

  return opts;
};

const DateFilter = () => {
  const { date, people } = useSelector(state => state.booking);
  console.log(people);
  const dispatch = useDispatch();

  const handleDateChange = v => {
    dispatch(setDate(v));
  };

  const handlePeopleChange = e => {
    dispatch(setPeople(e.target.value));
  };

  return (
    <Flex flexDirection="column">
      <Text fontSize="26px" fontWeight="700">
        Filters
      </Text>
      <CustomDatePicker
        date={date}
        handleDateChange={handleDateChange}
      ></CustomDatePicker>
      <Flex mt="6px">
        <Select
          variant="outline"
          bgColor={'white'}
          icon={<UsersThree size={32} weight="thin" />}
          onChange={handlePeopleChange}
          defaultValue={people}
          focusBorderColor="brand.primary"
        >
          {generateOptions(people)}
        </Select>
      </Flex>
    </Flex>
  );
};

export default DateFilter;
