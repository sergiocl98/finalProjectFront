import React from 'react';
import { Box, Flex } from '@chakra-ui/react';
import TopbarSidebarButton from './TopbarSidebarButton';
import TopbarProfile from './TopbarProfile';
import TopbarContent from './TopbarContent';

const Topbar = () => {
  return (
    <Box w='100%' position='fixed' top='0' h='80px' zIndex='101' boxShadow='0px -5px 10px 3px rgba(0,0,0,0.25)' bg='white' color='brand.gray2'>
      <Flex position='relative' h='80px'>
        <TopbarSidebarButton />
        <TopbarContent />
        <TopbarProfile />
      </Flex>
    </Box>
  );
};

export default Topbar;
