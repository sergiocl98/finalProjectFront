import { Flex,  Text, Avatar } from '@chakra-ui/react';
import React, { useContext } from 'react';
import AuthContext from '../../../store/authContext';
import UserService from '../../../services/userService.js'

const TopbarProfile = () => {
  const { logout } = useContext(AuthContext);
  const user = UserService.getUser();
  console.log(user);

  const handleDisconnect = () => {
    logout();
  };


  return (
    <Flex position='absolute' right='0' h='100%' mr='30px'>
      <Flex mb='0' ml='20px' position='relative' alignItems='center' alignContent='center'>
        <Flex mr='20px' direction='row' justifyContent='space-between' alignItems='center' gap='10px'>
          <Avatar size='sm' name={user?.name} />
          <Text 
          fontSize='14px' fontWeight='700'
          >
            {user?.name} Usuario
          </Text>
        </Flex>
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