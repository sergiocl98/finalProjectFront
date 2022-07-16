import React, { useState } from 'react';

import { Box, Button } from '@chakra-ui/react';

import GoogleMap from './GoogleMap';
import Tarjeta from './Tarjeta';

const Home = () => {
  const [selectedSite, setSelectedSite] = useState(undefined);
  /**
   * Gets the physical user location to center the map
   * If the user denies permission uses the first point
   * in the array of markers
   */

  return (
    <Box display="grid" gridTemplateRows="1fr auto">
      <Box gridRow="2/3" h="calc(100vh - 130px)">
        <GoogleMap setSelectedSite={setSelectedSite} />
      </Box>
      <Tarjeta gridRow="1/2" selectedSite={selectedSite} setSelectedSite={setSelectedSite} />
    </Box>
  );
};

export default Home;
