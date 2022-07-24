import { Box, Button, Divider, Flex, FormControl, FormHelperText, FormLabel, HStack, Image, Input, Text, Textarea } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import userService from '../../services/userService';
import { fetchUserById } from '../../store/slices/userSlice';
import {useDropzone} from 'react-dropzone';
import RestaurantDefault from '../../shared/img/restaurantDefault.jpg';
import GoogleMapReact from 'google-map-react';
import Marker from '../Home/Marker';

const ProfileTabTwo = () => {
    const dispatch = useDispatch();
    const localUser = userService.getUser();
    const [showMap, setShowMap] = useState(false);
    const [localData, setLocalData] = useState({
      name: '',
      address: '',
      phone: '',
      description: '',
      tags: '',
      coords: {
        lat: '',
        lng: ''
      }
    });
    const apikey = '';
    const [mapData, setMapData] = useState({
      center: {
        lat:40.3396472,
        lng: -3.7729584,
      },
      zoom: 9,
      draggable: true,
      lat: 40.3396472,
      lng: -3.7729584
    });

    useEffect(() => {
        if(localUser){
            dispatch(fetchUserById(localUser.userId));
        }
    }, [])

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

  console.log('localData', localData);
  const mapStyles = {
    styles: [
      {
        featureType: 'poi',
        stylers: [
          {
            visibility: 'off',
          },
        ],
      },
      {
        featureType: 'administrative',
        stylers: [
          {
            visibility: 'off',
          },
        ],
      },
      {
        featureType: 'transit',
        stylers: [
          {
            visibility: 'off',
          },
        ],
      },
    ],
  };

  const getCoordenatesFromAddress = async (address) => {
    fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=AIzaSyBX0TpEhck6NtN8fwQ17TzYHjN_gaD6DPA`)
    .then(response => response.json())
    .then(data => {
      console.log('data', data);
      setLocalData({...localData, coords: {
        lat: data.results[0].geometry.location.lat,
        lng: data.results[0].geometry.location.lng
      },
      address: data.results[0].formatted_address
      });
      setMapData({...mapData, center: {
        lat: data.results[0].geometry.location.lat,
        lng: data.results[0].geometry.location.lng
      },
      lat: data.results[0].geometry.location.lat,
      lng: data.results[0].geometry.location.lng});
    })
    .catch(error => console.log(error));
    setShowMap(true);
}

const onCircleInteraction = (childKey, childProps, mouse) => {
  // function is just a stub to test callbacks
  setMapData({...mapData,
    draggable: false,
    lat: mouse.lat,
    lng: mouse.lng
  });
 
  console.log('onCircleInteraction called with', childKey, childProps, mouse);
}
const onCircleInteraction3 = (childKey, childProps, mouse) => {
  setMapData({...mapData, draggable: true});
  // function is just a stub to test callbacks  
  console.log('onCircleInteraction called with', childKey, childProps, mouse);
  
}

const handleOnChange = ({center, zoom}) => {
  setMapData({...mapData,
    center: center,
    zoom: zoom,      
  });
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
              02
            </Text>
            <Text fontSize='20px' color='brand.gray' fontWeight='700'>
              Manage your local
            </Text>
          </Flex>
         <HStack spacing='20px' mb='30px'>
            <Image alt={'local foto'} src={files[0]?.preview || RestaurantDefault} w='200px' h='200px'/>
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

          <HStack spacing='20px' mb='20px'>
            <FormControl>
              <FormLabel>Address</FormLabel>
              <Input type='text' value={localData.address} onChange={(e) => setLocalData({...localData, address: e.target.value})}/>
              <FormHelperText>Set address before submit to see your local coords.</FormHelperText>
            </FormControl>
            <Button variant='primary' onClick={() => getCoordenatesFromAddress(localData.address)}>Set Address</Button>
          </HStack>
          <HStack spacing='20px' mb='20px'>
            <FormControl>
              <FormLabel>Name</FormLabel>
              <Input type='text' value={localData.name} onChange={(e) => setLocalData({...localData, name: e.target.value})} />
              <FormHelperText>Name of your local </FormHelperText>
            </FormControl>
            <FormControl>
              <FormLabel>Tags</FormLabel>
              <Input type='text' value={localData.tags} onChange={(e) => setLocalData({...localData, tags: e.target.value.split(",")}) } />
              <FormHelperText>Split the tags with comma. Example: American,Italian </FormHelperText>
            </FormControl>
          </HStack>
          <HStack spacing='20px' mb='20px'>
            <FormControl>
              <FormLabel>Description</FormLabel>
              <Textarea
                value={localData.description}
                onChange={(e) => setLocalData({...localData, description: e.target.value})}
                placeholder='Description of your local'
                size='md'
              />
            </FormControl>
          </HStack>
          {showMap && <Box w='100%' h='600px'>
            <GoogleMapReact 
              draggable={mapData.draggable}
              onChange={({ zoom, center }) => handleOnChange({center,zoom})}
              center={mapData.center}
              defaultCenter={{
                lat:40.3396472,
                lng: -3.7729584,
              }}
              defaultZoom={15}
              zoom={mapData.zoom}
              options={mapStyles}
              bootstrapURLKeys={{ key: apikey, v: '3.31' }}
              onChildMouseDown={({childKey, childProps, mouse}) => onCircleInteraction(childKey, childProps, mouse)}
              onChildMouseUp={(childKey, childProps, mouse) => onCircleInteraction3(childKey, childProps, mouse)}
              onChildMouseMove={(childKey, childProps, mouse) => onCircleInteraction(childKey, childProps, mouse)}
              onChildClick={() => console.log('child click')}
              onClick={(e) => console.log('mapClick',e )}
            >
              <Marker
                key="local"
                lat={mapData.lat}
                lng={mapData.lng}
                name="Local location"
                icon="restaurant"
              />
            </GoogleMapReact>

          </Box>}
        </Flex>
        
      </Box>
      <Box h='15%'>
        <Divider color='brand.gray2' />
        <Flex p='0px 24px' justifyContent='flex-end' h='99%' alignItems='center'>
          <Button 
            variant='secondary2' 
            mr='20px'
            onClick={() => {}}
          >
            Save
          </Button>
        </Flex>
      </Box>
    </Flex>
  );
};

export default ProfileTabTwo