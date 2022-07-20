import React from 'react';
import DatePicker from 'react-datepicker';
import { Controller } from 'react-hook-form';
import { FormControl, FormErrorMessage, InputGroup, InputRightAddon, InputRightElement, Stack } from '@chakra-ui/react';
import { getDate, getDay } from 'date-fns';
import { formatDate } from '../../utils/formatting';
import { getLocaleDateString } from '../../utils/dates';
import { CalendarIcon } from '@chakra-ui/icons';
import 'react-datepicker/dist/react-datepicker.css';
import './DatepickerController.css';

const DatepickerController = ({ 
  control, 
  name,
  label, 
  rules, 
  placeholder, 
  startDate, 
  minDate, 
  noWeekends=false, 
  holidays=[], 
  onlyOneDate,
  onChangeAux,
  'data-testid': dataTestId,
  ...props 
}) => {
  return (
    <Controller 
      control={ control }
      name={ name }
      rules={ rules }
      render={ ({ 
        field: { onChange, onBlur, value, ref },
        fieldState: { invalid, error}
      }) => {
      
        const onChangecustom = (date) => {
          onChange(date);
          onBlur();
          onChangeAux && onChangeAux(date);
        };
      
        const isValidDate = (date) => {    
          const indexDay = getDay(date);
          const day = getDate(date);
          const dateString = formatDate(date);
      
          if (onlyOneDate && day !== getDate(onlyOneDate)) return false;
          
          if (holidays && holidays.includes(dateString)) return false;
          
          if (noWeekends && (indexDay === 0 || indexDay === 6)) return false;
        
          return true;
        };

        return (
          <Stack w='full'>
            <FormControl isInvalid={ invalid }>
              {label}
              <InputGroup>
                <DatePicker
                  data-testid={ dataTestId || name }
                  forwardRef={ ref }
                  placeholderText={ placeholder }
                  onChange={ (date) => onChangecustom(date) }
                  onBlur={ onBlur }
                  onSelect={ onBlur }
                  selected={ startDate ? (value ? value : startDate) : value }
                  minDate={ minDate }
                  showPopperArrow={ false }
                  isClearable
                  dropdownMode="select"
                  dateFormat={ getLocaleDateString() }
                  calendarStartDay={ 1 }
                  filterDate={ isValidDate }
                  formatWeekDay={ nameOfDay => nameOfDay.substr(0,1) }
                  { ...props }
                />
                <InputRightElement w='' zIndex='1'>
                  <InputRightAddon children={ <CalendarIcon w='12px'/> }/>
                </InputRightElement>
              </InputGroup>
              <FormErrorMessage>{error && error.message}</FormErrorMessage>
            </FormControl>
          </Stack>
        );

      } }
    />
  );
};

export default DatepickerController;