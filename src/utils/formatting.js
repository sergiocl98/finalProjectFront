import { Text } from '@chakra-ui/react';
import React from 'react';
import NumberFormat from 'react-number-format';

export const capitalizeFirstLetter = (string) => {
  string = string.toLowerCase();
  
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export const formatDate = (date='') => {
  return new Date(date).toLocaleDateString(navigator.language,{
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  });
};

export const formatTime = (date='') => {
  return new Date(date).toLocaleTimeString(navigator.language,{
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  });
};

export const formatAmount = ({ amount=0, ...props }) => {
  return (
    <NumberFormat 
      displayType='text' 
      thousandSeparator='.' 
      decimalSeparator=',' 
      value={ amount }
      { ...props }
    />
  );
};

export const formatStatus = (step) => {
  return (
    <Text color='#D6A413'>
      { step }
    </Text>
  );
};

export const formatMonth = ( {date, language=navigator.language} ) => {
  return new Date(date).toLocaleString(language, { month: 'long' });
};

export const dateOrdinal = (d) => {
  return (31==d||21==d||1==d?'st':22==d||2==d?'nd':23==d||3==d?'rd':'th');
};

export const formatDateToMonthDay = ( {date, language=navigator.language} ) => {
  let formatDate = new Date(date).toLocaleString(language, { month:'long', day:'numeric'});
  if (language?.includes('en')) {
    formatDate += dateOrdinal(new Date(date).getDate());
  }
  return formatDate;
};

export const updateDateDay = ({date=new Date(), days= 0, language=navigator.language}) => {
  return new Date (new Date(date).setDate(days)).toLocaleDateString(language,{
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  });
};

export const modifyDateDay = ({date=new Date(), days= 0}) => {
  return new Date (new Date(date).setDate(date.getDate()+days));
};

export const getFirstDayOfMonth = (date) => {
  return new Date (new Date(date).setDate(1));
};

export const formatArrayToListString = ({array, language=navigator.language}) => {
  const formatter = new Intl.ListFormat(language, { style: 'long', type: 'conjunction' });

  return formatter.format(array);
};
