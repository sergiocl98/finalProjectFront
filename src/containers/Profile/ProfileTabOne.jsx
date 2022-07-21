import { Avatar, Box, Button, Divider, Flex, HStack, Input, Text } from '@chakra-ui/react';
import React, { useContext, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import InputController from '../../components/Form/InputController';
import userService from '../../services/userService';
import { fetchUserById, putUserById, SELECT_USER_DETAIL, userActions } from '../../store/slices/userSlice';
import {useDropzone} from 'react-dropzone';
import AuthContext from '../../store/authContext';

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
    const dispatch = useDispatch();
    const localUser = userService.getUser();
    const userDetail = useSelector(SELECT_USER_DETAIL);

    useEffect(() => {
        if(localUser){
            dispatch(fetchUserById(localUser.userId));
        }
    }, [])

    useEffect(() => {
        if(userDetail){
            setValue('name', userDetail.name);
            setValue('email', userDetail.email);
        }
    }, [userDetail])

  const [files, setFiles] = useState([]);
  const {getRootProps, getInputProps} = useDropzone({
    maxFiles:1,
    accept: {
      'image/*': []
    },
    onDrop: acceptedFiles => {
        console.log('acceptedFiles', acceptedFiles)
      setFiles(acceptedFiles.map(file => Object.assign(file, {
        preview: URL.createObjectURL(file)
      })));
    }
  });

  const handleEdit = () => {
    const user = getValues();
    user.image = files[0]|| undefined;
    console.log(user);

    const formData = new FormData();
    for(const name in user) {
        formData.append(name, user[name]);
      }


   dispatch(putUserById({id: localUser.userId, user: formData}));
   localStorage.setItem('user',JSON.stringify({name: user.name, email:user.email, token: localUser.token, expires_in: localUser.expirationTime, userId: localUser.userId}));

   
  }

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
         <HStack spacing='20px' mb='30px'>
            <Avatar name={localUser?.name} src={files[0]?.preview || userDetail?.image} size='2xl'/>
            <div {...getRootProps({ className: 'dropzone' })}>
                <input {...getInputProps()} />
                <p>Drag 'n' drop some files here, or click to select files</p>
                <em>(1 files are the maximum number of files you can drop here)</em>
            </div>
         </HStack>
         {files.length > 0 && <HStack mb='30px'>
            <Text fontSize='14px' fontWeight='700'>Accepted files</Text>
            <Text  fontSize='14px'>{files[0]?.path} - {files[0]?.size} bytes</Text>
          </HStack>}

          <HStack spacing='20px' mb='30px'>
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
          </HStack>
          

          

        </Flex>
      </Box>
      <Box h='15%'>
        <Divider color='brand.gray2' />
        <Flex p='0px 24px' justifyContent='flex-end' h='99%' alignItems='center'>
          <Button 
            variant='secondary2' 
            mr='20px'
            onClick={() => handleEdit()}
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