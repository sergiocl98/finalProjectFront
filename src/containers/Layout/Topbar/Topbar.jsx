import React from 'react';
import { Box, Grid } from '@chakra-ui/react';
import TopbarSidebarButton from './TopbarSidebarButton';
import TopbarProfile from './TopbarProfile';
import TopbarContent from './TopbarContent';

const Topbar = () => {
  return (
    <Box w='100%' position='fixed' top='0' h='80px' zIndex='101' boxShadow='0px -5px 10px 3px rgba(0,0,0,0.25)' bg='white' color='brand.gray2' p="0px 20px">
      <Grid position='relative' h='80px' templateColumns="1fr auto 1fr">
        <TopbarSidebarButton />
        <TopbarContent />
        <TopbarProfile />
      </Grid>
    </Box>
  );
};

export default Topbar;
