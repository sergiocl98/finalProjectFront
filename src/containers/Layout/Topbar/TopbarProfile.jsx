import { Flex,  Text, Avatar, Stack, useMediaQuery } from '@chakra-ui/react';
import React, { useContext, useEffect} from 'react';
import AuthContext from '../../../store/authContext';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser, SELECT_USER_DETAIL, fetchUserById } from '../../../store/slices/userSlice';
import userService from '../../../services/userService';

const TopbarProfile = () => {
  const { logout } = useContext(AuthContext);
  const [isLargerThan768] = useMediaQuery('(min-width: 768px)')
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
  }, [user, dispatch, userDetailStored?.image])

  return (
    <Flex position='absolute' right='0' h='100%' gridColumn="3/4">
      <Flex mb='0' ml='20px' position='relative' alignItems='center' alignContent='center'>
        <Flex mr='20px' direction='row' justifyContent='space-between' alignItems='center' gap='10px'>
          <Avatar size='md' name={userDetailStored?.name}  src={userDetailStored?.image}/>
          {isLargerThan768 && <Stack>
            <Text 
            fontSize='14px' fontWeight='700'
            >
              {userDetailStored?.email ? userDetailStored?.email : "Email"}
            </Text>
            <Text 
            fontSize='10px' fontWeight='700' display='flex' justifyContent='flex-end'
            >
              {userDetailStored?.name ? userDetailStored?.name : "Usuario"}
            </Text>

          </Stack>}
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