import React from 'react';
import { Box, Flex } from '@chakra-ui/react';
import TopbarSidebarButton from './TopbarSidebarButton';
import TopbarProfile from './TopbarProfile';

const Topbar = ({ changeSidebarVisibility }) => {
  return (
    <Box w='100%' position='fixed' top='0' h='60px' zIndex='101' boxShadow='0px -5px 10px 3px rgba(0,0,0,0.25)' bg='white' color='brand.gray2'>
      <Flex position='relative' h='60px'>
        <TopbarSidebarButton changeSidebarVisibility={ changeSidebarVisibility } />
        <TopbarProfile />
      </Flex>
    </Box>
  );
};

export default Topbar;
