import { Flex, Stack, Text, Select } from '@chakra-ui/react';
import React, { useContext } from 'react';
import AuthContext from '../../../store/authContext';

const TopbarProfile = () => {
  const { logout } = useContext(AuthContext);

  const handleDisconnect = () => {
    logout();
  };


  return (
    <Flex position='absolute' right='0' h='100%' mr='30px'>
      <Flex mb='0' ml='20px' position='relative' alignItems='center' alignContent='center'>
        <Text 
          data-testid='link_logout' 
          color='brand.primary' 
          fontSize='14px' fontWeight='700' textDecoration='underline' 
          onClick={ handleDisconnect }
          _hover={ {
            cursor: 'pointer'
          } }
        >
          {"Log out"}
        </Text>
      </Flex>
    </Flex>
  );
};

export default TopbarProfile;