import { Avatar, Box, Button, Divider, Flex, HStack, Text } from '@chakra-ui/react';
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import InputController from '../../components/Form/InputController';
import userService from '../../services/userService';
import { fetchUserById } from '../../store/slices/userSlice';

const ProfileTabOne = ({
    control,
    getValues,
    watch,
    setValue,
    index,
    setIndex,
    optionsTabs,
    setOptionsTabs
  }) => {
    const dispatch = useDispatch;
    const localUser = userService.getUser();

    useEffect(() => {
        if(localUser){
            setValue('name', localUser.name);
            setValue('email', localUser.email);
            //dispatch(fetchUserById(localUser.userId));
        }
    }, [])
    
  return (
    <Flex direction='column' justifyContent='space-between' h='100%'>
      <Box
        h='85%' 
        overflowY='auto' 
        css={ {
          '&::-webkit-scrollbar': {
            width: '19px',
          },
          '&::-webkit-scrollbar-track': {
            margin: '0 10px'
          },
          '&::-webkit-scrollbar-thumb': {
            background: '#E8F0FE',
            borderRadius: '24px',
            border: '5px solid white',
            backgroundClip: 'padding-box'
          },
        } }
      >
        <Flex w='50%' m='0 auto' flexDirection='column' mt='70px'>
          <Flex mb='10px'>
            <Text fontSize='20px' color='brand.primary' fontWeight='700' mr='10px'>
              01
            </Text>
            <Text fontSize='20px' color='brand.gray' fontWeight='700'>
              General information
            </Text>
          </Flex>

          <Text fontSize='16px' color='brand.gray2' fontWeight='400' mb='30px'>
            Description
          </Text>

          <HStack spacing='20px' mb='30px'>
            <Avatar name='usuario anonimo' src='' size='2xl'/>
            <InputController 
                name='email'
                type='text'
                control={ control }
                formStyle={ {
                mb:'20px'
                } }
                label={
                <Text fontSize='14px' color='brand.gray2' fontWeight='500' mb='10px'>
                    Email
                </Text>
                }
                rules={ {
                required: 'Email is required.',
                maxLength: {
                    value: 255,
                    message: 'Too many characters'
                },
                } }
            />
          </HStack>

          <InputController 
            name='name'
            type='text'
            control={ control }
            formStyle={ {
              mb:'20px'
            } }
            label={
              <Text fontSize='14px' color='brand.gray2' fontWeight='500' mb='10px'>
                Name
              </Text>
            }
            rules={ {
              required: 'Name is required.',
              maxLength: {
                value: 255,
                message: 'Too many characters'
              },
            } }
          />

        </Flex>
      </Box>
      <Box h='15%'>
        <Divider color='brand.gray2' />
        <Flex p='0px 24px' justifyContent='flex-end' h='99%' alignItems='center'>
          <Button 
            variant='secondary2' 
            mr='20px' disabled
          >
            Save
          </Button>
          <Button 
            data-testid='button_next_step1'
            variant='primary' 
          >
            Next
          </Button>
        </Flex>
      </Box>
    </Flex>
  );
};

export default ProfileTabOne