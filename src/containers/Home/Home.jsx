import React from 'react';

import { Box, Grid, GridItem } from '@chakra-ui/react';

import GoogleMap from './GoogleMap';
import HeaderPage from '../../components/HeaderPage/HeaderPage';
import SiteList from './SiteList/SiteList';

const Home = () => {
  return (
    <Grid
      templateAreas={{
        base: `"header"
                "Map"
                "List"`,
        md: `"header header"
                "Map List"
                "Map List"`,
      }}
      gridTemplateRows={{ base: 'auto auto auto', md: 'auto auto' }}
      gridTemplateColumns={{
        base: 'auto',
        md: '72% 26%',
      }}
      gap="2%"
    >
      <GridItem pl="2" area={'header'}>
        <HeaderPage
          title={'Home'}
          description={
            'Interact with the mapa to search your desired restaurant'
          }
        />
      </GridItem>
      <GridItem
        pl="2"
        area={'Map'}
        h={{
          base: '50vh',
          md: 'calc(100vh - 225px)',
        }}
      >
        <Box gridRow="2/3" h="100%" pos="relative">
          <GoogleMap />
        </Box>
      </GridItem>
      <GridItem
        pl="2"
        area={'List'}
        h={{
          base: 'auto',
          md: 'calc(100vh - 225px)',
        }}
      >
        <SiteList gridRow="1/2" />
      </GridItem>
    </Grid>
  );
};

export default Home;
