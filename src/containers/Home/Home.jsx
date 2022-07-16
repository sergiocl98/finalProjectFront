import React, { useState } from 'react';

import { Box, Button, Grid, GridItem } from '@chakra-ui/react';

import GoogleMap from './GoogleMap';
import Tarjeta from './Tarjeta';
import HeaderPage from '../../components/HeaderPage/HeaderPage';

const Home = () => {
  const [selectedSite, setSelectedSite] = useState(undefined);
  /**
   * Gets the physical user location to center the map
   * If the user denies permission uses the first point
   * in the array of markers
   */

  return (
    <Grid 
      templateAreas={
        {base:`"header"
                "Map"
                "List"`, 
          md: `"header header"
                "Map List"
                "Map List"`
        }} 
      gridTemplateRows={ 
        {base:'auto auto auto', 
          md: 'auto auto'
        }} 
      gridTemplateColumns={
        {
          base:'auto',
          md: '72% 26%'
        }
      } 
      gap='2%'
    >
      <GridItem pl='2' area={'header'}>
        <HeaderPage
            title={ "Home" } 
            description={ "Interact with the mapa to search your desired restaurant" }
          />
      </GridItem>
      <GridItem pl='2' area={'Map'}>
        <Box gridRow="2/3" h={{
          base:'50vh',
          md: "calc(100vh - 130px)"
        }}>
          <GoogleMap setSelectedSite={setSelectedSite} />
        </Box>
      </GridItem>
      <GridItem pl='2' area={'List'}>
        <Tarjeta gridRow="1/2" selectedSite={selectedSite} setSelectedSite={setSelectedSite} />
      </GridItem>
    </Grid>
  );
};

export default Home;
