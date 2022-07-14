import React from 'react';
import SidebarContent from './SidebarContent';
import { Box } from '@chakra-ui/react';

const Sidebar = ({ sidebarShow }) => {
  return (
    <Box data-testid='sidebar' position='fixed' top='0' left='0' zIndex='99' h='100vh' w={ sidebarShow ? '240px' : '80px' } 
      boxShadow='4px 0px 4px 0px rgba(43, 45, 55, 0.01)' pt='60px' transition='transform 0.3s, width 0.3s' 
      bg='white' color='brand.gray2' transform={ sidebarShow ? 'translateX(0)' : {base:'translateX(-250px)', sm:'translateX(0)'} }
    >
      <SidebarContent sidebarShow={ sidebarShow } />
    </Box>
  );
};

export default Sidebar;
