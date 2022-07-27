import { Avatar, Box, Button, Divider, Fade, Flex, Stack, Text, Tooltip, useMediaQuery } from '@chakra-ui/react';
import React, { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import InputController from '../../components/Form/InputController';
import userService from '../../services/userService';
import { fetchUserById, putUserById, SELECT_USER_DETAIL,} from '../../store/slices/userSlice';
import {useDropzone} from 'react-dropzone';
import TableSimple from '../../components/Table/TableSimple';
import { InfoIcon} from '@chakra-ui/icons';

const ProfileTabOne = ({
    control,
    getValues,
    setValue,
  }) => {
    const dispatch = useDispatch();
    const localUser = userService.getUser();
    const userDetail = useSelector(SELECT_USER_DETAIL);
    const [history, setHistory] = useState([]);
    const [files, setFiles] = useState([]);
    const [greaterThan880] = useMediaQuery('(min-width: 880px)');

    useEffect(() => {
        if(localUser){
            dispatch(fetchUserById(localUser.userId));
        }
    }, [])

    useEffect(() => {
        if(userDetail && userDetail.bookings){
            setValue('name', userDetail.name);
            setValue('email', userDetail.email);
            calculateHistory(userDetail.bookings);

        }
    }, [userDetail])

    const calculateHistory = (history) => {
      let historyArray = [];
        history.forEach(bookings => {
            bookings.lastBook.forEach(book => {
              historyArray.push( {
                local: {
                  name: bookings.local.name,
                  address: bookings.local.address,
                },
                people: bookings.people,
                dateStart: book.start,
                dateEnd: book.end,
              });
            })
        })
      setHistory(historyArray);
      }


  
  const {getRootProps, getInputProps} = useDropzone({
    maxFiles:1,
    accept: {
      'image/*': []
    },
    onDrop: acceptedFiles => {
      setFiles(acceptedFiles.map(file => Object.assign(file, {
        preview: URL.createObjectURL(file)
      })));
    }
  });

  const handleEdit = () => {
    const user = getValues();
    user.image = files[0]|| undefined;

    const formData = new FormData();
    for(const name in user) {
        formData.append(name, user[name]);
      }


   dispatch(putUserById({id: localUser.userId, user: formData}));
   localStorage.setItem('user',JSON.stringify({name: user.name, email:user.email, token: localUser.token, expires_in: localUser.expirationTime, userId: localUser.userId}));

   
  }

  const formatDate = (date='') => {
    let result = ''
    result = new Date(date).toLocaleDateString(navigator.language,{
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    });
    result = result + ' ' + new Date(date).toLocaleTimeString(navigator.language,{
      hour: '2-digit',
      minute: '2-digit',
    });
    return result;
  };

  const renderCellName = (row) => {
    console.log(row)
    return (
      <Flex align="center">
        <Text>{row.original.local?.name}</Text>
        <Tooltip hasArrow label={ row.original.local?.address } fontSize='14px' bgColor='#333333' >
            <InfoIcon w={ 3 } h={ 3 } color="brand.gray1" marginLeft={ 2 }/>
          </Tooltip> 
      </Flex>
    )
  }

  const columns = useMemo(() => [
    {
      Header: 'Local',
      accessor: 'local.name',
      Cell: ({ cell: { value } }) => value ? value : '-',
    },
    {
      Header: 'Address',
      accessor: 'local.address',
      Cell: ({ cell: { value } }) => value ? value : '-',
    },
    {
      Header: 'Customers',
      accessor: 'people',
      Cell: ({ cell: { value } }) => value ? value : '-',
    },
    {
      Header: 'Date Start',
      accessor: 'dateStart',
      Cell: ({ cell: { value } }) => value ?  formatDate(new Date(value)) : '-'
    },
    {
      Header: 'Date End',
      accessor: 'dateEnd',
      Cell: ({ cell: { value } }) => value ? formatDate(new Date(value)) : '-'
    },
  ]);

  const columnsMobile = useMemo(() => [
    {
      Header: 'Local',
      accessor: 'local.name',
      Cell: ({ cell: { row } }) => row ? renderCellName(row) : '-',
    },
    {
      Header: 'Customers',
      accessor: 'people',
      Cell: ({ cell: { value } }) => value ? value : '-',
    },
    {
      Header: 'Date Start',
      accessor: 'dateStart',
      Cell: ({ cell: { value } }) => value ?  formatDate(value) : '-'
    },
  ]);

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
        <Flex w={{base: '70%' , md: '50%'}} m='0 auto' flexDirection='column' mt='70px'>
          <Flex mb='10px'>
            <Text fontSize='20px' color='brand.primary' fontWeight='700' mr='10px'>
              01
            </Text>
            <Text fontSize='20px' color='brand.gray' fontWeight='700'>
              General information
            </Text>
          </Flex>
          <Stack direction={['column', 'row']} spacing='20px' mb='30px'>
            <Avatar name={localUser?.name} src={files[0]?.preview || userDetail?.image} size='2xl'/>
            <div {...getRootProps({ className: 'dropzone' })}>
                <input {...getInputProps()} />
                <p>Drag 'n' drop some files here, or click to select files</p>
                <em>(1 files are the maximum number of files you can drop here)</em>
            </div>
         </Stack>
         {files.length > 0 && <Stack direction={['column', 'row']} mb='30px'>
            <Text fontSize='14px' fontWeight='700'>Accepted files</Text>
            <Text  fontSize='14px'>{files[0]?.path} - {files[0]?.size} bytes</Text>
          </Stack>}

          <Stack direction={['column', 'row']} spacing='20px' mb='30px'>
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
          </Stack>
          {history.length > 0 && (
                    <Fade in={ true }>
                    <Text fontSize='14px' color='brand.gray1' fontWeight='700'> History </Text>
                      <Box mt='70px'>
                        <TableSimple
                          columns={ greaterThan880 ? columns : columnsMobile}
                          data={ history }
                          isSorty
                          variant='list'
                          whiteSpace='wrap'
                        />
                      </Box>
                    </Fade>
                  )}
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
        </Flex>
      </Box>
    </Flex>
  );
};

export default ProfileTabOne