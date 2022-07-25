import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  HStack,
  Image,
  Input,
  Text,
  Textarea,
} from '@chakra-ui/react';
import React from 'react';
import Marker from '../../containers/Home/Marker';
import GoogleMapReact from 'google-map-react';
import RestaurantDefault from '../../shared/img/restaurantDefault.jpg';
import { useDropzone } from 'react-dropzone';

// Google maps API KEY
const apikey = process.env.REACT_APP_API_KEY || '';

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

const LocalForm = ({
  localData,
  setLocalData,
  mapData,
  setMapData,
  showMap,
  setShowMap,
  files,
  setFiles
}) => {
  const { getRootProps, getInputProps } = useDropzone({
    maxFiles: 1,
    accept: {
      'image/*': [],
    },
    onDrop: acceptedFiles => {
      setFiles(
        acceptedFiles.map(file =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    },
  });
  const getCoordenatesFromAddress = async address => {
    fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${apikey}`
    )
      .then(response => response.json())
      .then(data => {
        setLocalData({
          ...localData,
          coords: {
            lat: data.results[0].geometry.location.lat,
            lng: data.results[0].geometry.location.lng,
          },
          address: data.results[0].formatted_address,
        });
        setMapData({
          ...mapData,
          center: {
            lat: data.results[0].geometry.location.lat,
            lng: data.results[0].geometry.location.lng,
          },
          lat: data.results[0].geometry.location.lat,
          lng: data.results[0].geometry.location.lng,
        });
      })
      .catch(error => console.log(error));
    setShowMap(true);
  };

  const onCircleInteraction = (childKey, childProps, mouse) => {
    // function is just a stub to test callbacks
    setMapData({
      ...mapData,
      draggable: false,
      lat: mouse.lat,
      lng: mouse.lng,
    });

    console.log('onCircleInteraction called with', childKey, childProps, mouse);
  };
  const onCircleInteraction3 = (childKey, childProps, mouse) => {
    setMapData({ ...mapData, draggable: true });
    // function is just a stub to test callbacks
    console.log('onCircleInteraction called with', childKey, childProps, mouse);
  };

  const handleOnChange = ({ center, zoom }) => {
    setMapData({ ...mapData, center: center, zoom: zoom });
  };

  return (
    <Box>
      <HStack spacing="20px" mb="30px">
        <Image
          alt={'local foto'}
          src={files[0]?.preview || RestaurantDefault}
          w="200px"
          h="200px"
        />
        <div {...getRootProps({ className: 'dropzone' })}>
          <input {...getInputProps()} />
          <p>Drag 'n' drop some files here, or click to select files</p>
          <em>(1 files are the maximum number of files you can drop here)</em>
        </div>
      </HStack>
      {files.length > 0 && (
        <HStack mb="30px">
          <Text fontSize="14px" fontWeight="700">
            Accepted files
          </Text>
          <Text fontSize="14px">
            {files[0]?.path} - {files[0]?.size} bytes
          </Text>
        </HStack>
      )}
      <HStack spacing="20px" mb="20px">
        <FormControl>
          <FormLabel>Address</FormLabel>
          <Input
            type="text"
            value={localData.address}
            onChange={e =>
              setLocalData({ ...localData, address: e.target.value })
            }
          />
          <FormHelperText>
            Set address before submit to see your local coords.
          </FormHelperText>
        </FormControl>
        <Button
          variant="primary"
          onClick={() => getCoordenatesFromAddress(localData.address)}
        >
          Set Address
        </Button>
      </HStack>
      <HStack spacing="20px" mb="20px">
        <FormControl>
          <FormLabel>Name</FormLabel>
          <Input
            type="text"
            value={localData.name}
            onChange={e => setLocalData({ ...localData, name: e.target.value })}
          />
          <FormHelperText>Name of your local </FormHelperText>
        </FormControl>
        <FormControl>
          <FormLabel>Tags</FormLabel>
          <Input
            type="text"
            value={localData.tags}
            onChange={e =>
              setLocalData({
                ...localData,
                tags: e.target.value.split(','),
              })
            }
          />
          <FormHelperText>
            Split the tags with comma. Example: American,Italian{' '}
          </FormHelperText>
        </FormControl>
      </HStack>
      <HStack spacing="20px" mb="20px">
        <FormControl>
          <FormLabel>Description</FormLabel>
          <Textarea
            value={localData.description}
            onChange={e =>
              setLocalData({ ...localData, description: e.target.value })
            }
            placeholder="Description of your local"
            size="md"
          />
        </FormControl>
      </HStack>
      {showMap && (
        <Box w="100%" h="600px">
          <GoogleMapReact
            draggable={mapData.draggable}
            onChange={({ zoom, center }) => handleOnChange({ center, zoom })}
            center={mapData.center}
            defaultCenter={{
              lat: 40.3396472,
              lng: -3.7729584,
            }}
            defaultZoom={15}
            zoom={mapData.zoom}
            options={mapStyles}
            bootstrapURLKeys={{ key: apikey, v: '3.31' }}
            onChildMouseDown={({ childKey, childProps, mouse }) =>
              onCircleInteraction(childKey, childProps, mouse)
            }
            onChildMouseUp={(childKey, childProps, mouse) =>
              onCircleInteraction3(childKey, childProps, mouse)
            }
            onChildMouseMove={(childKey, childProps, mouse) =>
              onCircleInteraction(childKey, childProps, mouse)
            }
            onChildClick={() => console.log('child click')}
            onClick={e => console.log('mapClick', e)}
          >
            <Marker
              key="local"
              lat={mapData.lat}
              lng={mapData.lng}
              name="Local location"
              icon="restaurant"
            />
          </GoogleMapReact>
        </Box>
      )}
    </Box>
  );
};

export default LocalForm;
