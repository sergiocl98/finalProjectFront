import { Flex,  Text, Avatar, Stack } from '@chakra-ui/react';
import React, { useContext, useEffect} from 'react';
import AuthContext from '../../../store/authContext';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser, SELECT_USER_DETAIL, fetchUserById } from '../../../store/slices/userSlice';
import userService from '../../../services/userService';

const TopbarProfile = () => {
  const { logout } = useContext(AuthContext);
  const dispatch = useDispatch();
  const userStored = useSelector(selectUser);
  const userDetailStored = useSelector(SELECT_USER_DETAIL);
  const {user} = userStored;
  const localUser = userService.getUser();
  console.log(localUser)


  const handleDisconnect = () => {
    logout();
  };

  useEffect(() => {
    if(localUser?.userId){
      dispatch(fetchUserById(localUser?.userId));
    }
  }, [user, dispatch])

  return (
    <Flex position='absolute' right='0' h='100%' mr='30px'>
      <Flex mb='0' ml='20px' position='relative' alignItems='center' alignContent='center'>
        <Flex mr='20px' direction='row' justifyContent='space-between' alignItems='center' gap='10px'>
          <Avatar size='md' name={localUser?.name}  src={userDetailStored?.image}/>
          <Stack>
            <Text 
            fontSize='14px' fontWeight='700'
            >
              {localUser?.email ? localUser?.email : "Email"}
            </Text>
            <Text 
            fontSize='10px' fontWeight='700' display='flex' justifyContent='flex-end'
            >
              {localUser?.name ? localUser?.name : "Usuario"}
            </Text>

          </Stack>
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