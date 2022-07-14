import React from 'react';
import logoImg from './../../../shared/img/login_logo.png';
import { Box, Button, Flex, Image, Link, Text } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const icon = `${process.env.PUBLIC_URL}/img/burger.svg`;

const TopbarSidebarButton = ({ changeSidebarVisibility }) => {
  const navigate = useNavigate();

  const handleLogo = () => {
    navigate('/home');
  };

  return (
    <Flex position='absolute' left='0' h='100%' w='50%' alignItems='center'>
      <Flex>
        <Button w='40px' h='40px' ml='20px' bg='transparent' border='none' display='flex' transition='0.3s' _hover={ { border:'1px solid #686868' } } _focus={ { outline:'none' } } onClick={ changeSidebarVisibility } >
          <Image src={ icon } w='16px' transition='all 0.3s' margin='auto' maxW='none'/>
        </Button>
      </Flex>

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