import React, { useState } from 'react';

import { Box, Button } from '@chakra-ui/react';

import GoogleMap from './GoogleMap';

const Home = () => {
  const [userPermission, setUserPermission] = useState('pending'); // controls whether the user has accepted location permissions
  const [userLocation, setUserLocation] = useState({}); // initial center of the map, there should be stored in

  /**
   * Gets the physical user location to center the map
   * If the user denies permission uses the first point
   * in the array of markers
   */
  const handleLocationPermission = e => {
    navigator.geolocation.getCurrentPosition(
      data => {
        setUserLocation({
          lat: data.coords.latitude,
          lng: data.coords.longitude,
        });
        setUserPermission('granted');
      },
      () => {
        setUserLocation({ lat: 40.41, lng: -3.71 });
        setUserPermission('denied');
      }
    );
  };
  return (
    <Box h="100%">
      {userPermission !== 'pending' ? (
        <GoogleMap userLocation={userLocation} />
      ) : (
        <Button
          left="50%"
          top="50%"
          transform="translate(-50%, -50%)"
          onClick={handleLocationPermission}
          bgColor="brand.primary"
        >
          Click to load near places
        </Button>
      )}
    </Box>
  );
};

export default Home;
