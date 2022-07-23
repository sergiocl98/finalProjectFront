import React from 'react';
import { Box, Flex, Image, Center, Fade } from '@chakra-ui/react';
import login_image from '../../shared/img/login_image.jpeg';
import login_logo_white from '../../shared/img/login_logo_white.png';
import LoginForm from './LoginForm';

const Login = () => {

  return (
    <Fade in={ true }>
      <Flex data-testid='login_page' h='100vh' w='100%' minH='100vh' overflowY='auto'>
        <Box 
          bgImage={ login_image } 
          backgroundPosition='center' 
          backgroundRepeat='no-repeat' 
          w='50%' h='100%' 
          bgSize='cover' 
          display={ { base: 'none', md: 'block' } } 
        >
          <Box m='20% auto 0 auto' p='10px' w={ { sm:'100%', md: '50%', lg: '50%', xl: '50%' } } position='relative'>
            <Image src={ login_logo_white } verticalAlign='middle' borderStyle='none' />
          </Box>
          <Box m='auto' p='10px'>
            <Box mb='30px'>
              <Center m='auto' as='h3' fontSize='32' fontWeight='400' color='#fff'>{"Dining Room"}</Center>
              <Center m='auto' as='h3' fontSize='18' fontWeight='400' color='#fff'>{"Book"}</Center>
            </Box>
          </Box>
        </Box>

        <LoginForm />
      </Flex>
    </Fade>
  );
};

export default Login;
