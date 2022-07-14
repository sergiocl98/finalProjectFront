import React from 'react';
import SidebarLink from './SidebarLink';
import { Box, List } from '@chakra-ui/react';

const SidebarContent = ({ sidebarShow }) => {

  return (
    <Box pt='30px' h='100%' overflowX='hidden'>
      <List data-testid='listSidebarLink' borderBottom='1px solid #eff1f5' _last={ { border:'none' } }>
        <SidebarLink 
          title={ 'Home' }
          activeRoutes={ ['/home'] } 
          route="/home" 
          icon='home'
          sidebarShow={ sidebarShow }
        />
      </List>
    </Box>
  );
};

export default SidebarContent;
