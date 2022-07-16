import React from 'react';

import { Box } from '@chakra-ui/react';

import GoogleMap from './GoogleMap';
import Tarjeta from './Tarjeta';

const Home = () => {
  /**
   * Gets the physical user location to center the map
   * If the user denies permission uses the first point
   * in the array of markers
   */

  return (
    <Box h="100%" display="grid" gridTemplateRows="1fr auto">
      <Box gridRow="1/2">
        <GoogleMap />
      </Box>
      <Tarjeta />
    </Box>
  );
};

export default Home;
