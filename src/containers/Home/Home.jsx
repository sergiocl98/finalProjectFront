import React, { useState } from 'react';

import { Box, Button } from '@chakra-ui/react';

import GoogleMap from './GoogleMap';
import Tarjeta from './Tarjeta';
import { useToggle } from '../../hooks/useToggle';

const Home = () => {
  const [selectedSite, setSelectedSite] = useState(null);
  /**
   * Gets the physical user location to center the map
   * If the user denies permission uses the first point
   * in the array of markers
   */

  console.log(selectedSite)

  return (
    <Box h="100%" display="grid" gridTemplateRows="1fr auto">
      <Box gridRow="1/2">
        <GoogleMap setSelectedSite={setSelectedSite} />
      </Box>
      <Tarjeta selectedSite={selectedSite} />
    </Box>
  );
};

export default Home;
