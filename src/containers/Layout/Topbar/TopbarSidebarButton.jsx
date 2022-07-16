import React from 'react';
import logoImg from './../../../shared/img/login_logo.png';
import { Box, Flex,  Link, Text } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const TopbarSidebarButton = () => {
  const navigate = useNavigate();

  const handleLogo = () => {
    navigate('/home');
  };

  return (
    <Flex  left='0' h='100%' w='30%' alignItems='center'>
      <Link data-testid='buttonLogo' display='block' w='80px' h='45px' m='auto 20px' bgRepeat='no-repeat' bgPosition='left center' bgSize='contain' bgImage={ logoImg } onClick={ handleLogo } />
      <Text fontSize='18px' color='brand.gray2' alignSelf='center'>
        { 'Dining Room Booking' }
      </Text>
      <Box ml='25px'>
        <Box border='1px solid #F26E02' borderRadius='4px' minH='23px' w='max-content' p='2px 8px'>
          <Text fontSize='12px' color='brand.primary'>
            {'Final project'}
          </Text>
        </Box>
      </Box>
    </Flex>
  );
};

export default TopbarSidebarButton;