import { Avatar, Box, Text } from '@chakra-ui/react'
import React from 'react'
import userService from '../../services/userService'

const Profile = () => {

    const user = userService.getUser();

  return (
    <Box w='100%' h='100%' bgColor='white' borderRadius='20px' p='20px'>
        <Avatar size='2xl' name={user?.name} src={user?.image} m='50px' />

        <Text> Perfil </Text>

    </Box>
  )
}

export default Profile