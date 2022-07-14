import React from 'react';
import { NavLink } from 'react-router-dom';
import { Box, Link } from '@chakra-ui/react';
import { House } from 'phosphor-react';

const SidebarLink = ({ title, icon, route, onClick, sidebarShow }) => {

  const selectIcon = () => {
    switch (icon) {
      case 'home':
        return <House size={ "20px" } weight="fill" />;
    }
  };
  
  return (
    <Link data-testid='linkSidebar' as={ NavLink }
      to={ route }
      onClick={ (e) => onClick(e) }
      h='36px' w={ sidebarShow ? '220px' : '60px' } ml='10px' mb='10px' borderRadius='4px' transition='all 0.2s' position='relative' cursor='pointer' display='flex' p='25px 20px' overflow='hidden' bg='transparent' border='none' alignItems='center' 
      _hover={ { bgColor:'brand.primary20', color:'brand.primary' } }
      _focus={ { outline:'none' } }
      _activeLink={ { color:'brand.primary', bgColor:'brand.primary20' } }
    >
      <Box>
        { selectIcon() }
        {sidebarShow && 
        <Box position='absolute' left='43px' w='160px' transition='left 0.3s' top='50%' transform='translateY(-50%)' pl='10px' color='brand.gray2'>
          {title}
        </Box>}
      </Box>
    </Link>
  );
};

SidebarLink.defaultProps = {
  icon: '',
  route: '/',
  onClick: () => {},
};

export default SidebarLink;
