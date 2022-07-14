import React, { useContext, useState } from 'react';
import { Box, Button, Flex, FormControl, Heading, Image, Text } from '@chakra-ui/react';
import AuthContext from '../../store/authContext';
import { useNavigate } from 'react-router-dom';
//import authService from '../../services/authService';
import packageJson from '../../../package.json';

const LoginForm = () => {
  const navigation = useNavigate();
  const { login } = useContext(AuthContext);

  const [isLoading, setIsLoading] = useState(false);

   /* const handleLogin = (e) => {
    e.preventDefault();
    setIsLoading(true);

    authService
      .login('admin@bbva.es','secret')
      .then( (response) => {
        setIsLoading(false);

        const {access_token, expires_in, roles, username} = response;

        const expirationTime = new Date(
          new Date().getTime() + expires_in * 1000
        );

        login(
          username,
          access_token,
          expirationTime,
          [...roles, 'ADMIN']
        );

        navigation('/loans');
      });
  }; */ 

  const handleLogin = (e) => {
    e.preventDefault();
    login(
    'Agent',
    '1234',
    null,
    ['ADMIN']
    );
    navigation('/home');
  };

  return (
    <Box data-testid='log-in-form' w={ { sm:'100%', md: '50%', xl: '50%' } }>
      <Flex h='100%' direction='column' justifyContent='center'>
        <Box ml='auto' mr='auto' h='254px'>
          <Box mb='30px'>
            <Heading as='h3' mb='10px' fontSize='20' fontWeight='700' color='#696C78'>{"Sign in"}</Heading>
            <Heading data-testid='text_greeting' as='h3' fontSize='28' fontWeight='700'>{"Welcome to"}</Heading>
            <Heading as='h3' mb='20px' fontSize='28' fontWeight='700'>{"Dining Room App"}</Heading>
            <Heading as='h4' p='10px 0 0 0' fontSize='18' fontWeight='500'color='#999999' lineHeight='16px'>{"Your portal to reserve a place in a restaurant"}</Heading>
          </Box>

          <Box mt='50px'>
            <form onSubmit={ (e) => handleLogin(e) }>
              <Box w='100%'>
                <FormControl>
                  <Button data-testid='button-signin' bgColor='brand.primary' w='370px' type='submit' isLoading={ isLoading }>{"Enter"}</Button> 
                </FormControl>
                
                <Flex position='absolute' bottom='20px' right='20px' color='#5e5e5e' fontSize='12px' alignItems='center'>
                  <Text fontSize='10' fontWeight='500' color='brand.gray3' mr='10px'>v.{packageJson.version}</Text>
                  <Text fontSize='10' fontWeight='500' color='brand.gray3' mr='10px'>
                    © Dining Room
                  </Text>
                </Flex> 
              </Box>
            </form>
          </Box>
        </Box>
      </Flex>
    </Box>
  );
};

export default LoginForm;
