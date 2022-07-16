import React from 'react';

import { Box, Button } from '@chakra-ui/react';

import GoogleMap from './GoogleMap';
import Tarjeta from './Tarjeta';
import { useToggle } from '../../hooks/useToggle';

const Home = () => {
  const [showCard, toggleShowCard] = useToggle();
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
      <Button onClick={toggleShowCard}>Show Card</Button>
      <Tarjeta showCard={showCard} />
    </Box>
  );
};

export default Home;
