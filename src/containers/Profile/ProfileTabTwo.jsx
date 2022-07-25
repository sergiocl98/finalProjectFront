import {
  Box,
  Button,
  Divider,
  Flex,
  List,
  ListItem,
  Text,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import userService from '../../services/userService';
import { fetchUserById } from '../../store/slices/userSlice';
import RestaurantDefault from '../../shared/img/restaurantDefault.jpg';
import localService from '../../services/localService';
import { useNavigate, NavLink } from 'react-router-dom';
import LocalForm from '../../components/LocalForm/LocalForm';

const getUserLocals = async () => {
  const data = await localService.getUserLocals();
  return data;
};

const ProfileTabTwo = () => {
  const dispatch = useDispatch();
  const localUser = userService.getUser();
  const [showMap, setShowMap] = useState(false);
  const [localData, setLocalData] = useState({
    user: localUser.userId,
    name: '',
    address: '',
    phone: '',
    description: '',
    tags: '',
    coords: {
      lat: '',
      lng: '',
    },
  });
  const [userLocals, setUserLocals] = useState([]);
  const [mapData, setMapData] = useState({
    center: {
      lat: 40.3396472,
      lng: -3.7729584,
    },
    zoom: 9,
    draggable: true,
    lat: 40.3396472,
    lng: -3.7729584,
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (localUser) {
      dispatch(fetchUserById(localUser.userId));
    }
  }, []);

  useEffect(() => {
    getUserLocals().then(data => {
      if (data) setUserLocals(data);
    });
  }, []);

  const [files, setFiles] = useState([]);

  const handleSave = async () => {
    localData.image = files[0] || RestaurantDefault;
    localData.menu = files[0] || RestaurantDefault;

    const formData = new FormData();
    for (const name in localData) {
      console.log(name, localData[name]);
      formData.append(
        name,
        name === 'coords'
          ? JSON.stringify({ lat: mapData.lat, lng: mapData.lng })
          : localData[name]
      );
    }

    const res = await localService.createLocal(formData);
    navigate(`/detail/${res._id}`);
  };

  return (
    <Flex direction="column" justifyContent="space-between" h="100%">
      <Box
        h="85%"
        overflowY="auto"
        css={{
          '&::-webkit-scrollbar': {
            width: '19px',
          },
          '&::-webkit-scrollbar-track': {
            margin: '0 10px',
          },
          '&::-webkit-scrollbar-thumb': {
            background: '#E8F0FE',
            borderRadius: '24px',
            border: '5px solid white',
            backgroundClip: 'padding-box',
          },
        }}
      >
        <Flex w="50%" m="0 auto" flexDirection="column" mt="70px">
          <Flex mb="10px">
            <Text
              fontSize="20px"
              color="brand.primary"
              fontWeight="700"
              mr="10px"
            >
              02
            </Text>
            <Text fontSize="20px" color="brand.gray" fontWeight="700">
              Manage your locals
            </Text>
          </Flex>
          <List>
            {userLocals.length &&
              userLocals.map((local, index)=> (
                <ListItem as={NavLink} to={`/detail/${local._id}`} key={index}>
                  <Flex alignItems="baseline" gap="1rem">
                    <Text color="brand.primary" fontSize="24px">
                      {local.name}
                    </Text>
                    <Text>{local.address}</Text>
                  </Flex>
                </ListItem>
              ))}
          </List>
          <Text fontSize="20px" color="brand.gray" fontWeight="700">
            Add a new Local
          </Text>
          <LocalForm
            localData={localData}
            setLocalData={setLocalData}
            mapData={mapData}
            setMapData={setMapData}
            showMap={showMap}
            setShowMap={setShowMap}
            files={files}
            setFiles={setFiles}
          ></LocalForm>
        </Flex>
      </Box>
      <Box h="15%">
        <Divider color="brand.gray2" />
        <Flex
          p="0px 24px"
          justifyContent="flex-end"
          h="99%"
          alignItems="center"
        >
          <Button variant="secondary2" mr="20px" onClick={() => handleSave()}>
            Save
          </Button>
        </Flex>
      </Box>
    </Flex>
  );
};

export default ProfileTabTwo;
