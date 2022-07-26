import React from 'react';
import logoImg from './../../../shared/img/login_logo.png';
import { Box, Grid,  Link, Text} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const TopbarSidebarButton = () => {
  const navigate = useNavigate();
  const handleLogo = () => {
    navigate('/home');
  };

  return (
    <Grid  left='0' h='100%' alignItems='center' templateColumns={{base:"auto", lg:"60px 120px 60px"}} gridColumn="1/2">
      <Link data-testid='buttonLogo' display='block' h='45px' bgRepeat='no-repeat' bgPosition='left center' bgSize='contain' bgImage={ logoImg } onClick={ handleLogo } />
      <Text fontSize='18px' color='brand.gray2' alignSelf='center' display={{base:"none", lg:"inline-block"}}>
        { 'Dining Room Booking' }
      </Text>
      <Box ml='25px' display={{base:"none", lg:"inline-block"}}>
        <Box border='1px solid #F26E02' borderRadius='4px' minH='23px' w='max-content' p='2px 8px'>
          <Text fontSize='12px' color='brand.primary'>
            {'Final project'}
          </Text>
        </Box>
      </Box>
    </Grid>
  );
};

export default TopbarSidebarButton;