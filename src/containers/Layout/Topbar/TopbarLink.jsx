import { Box, Link,useMediaQuery } from '@chakra-ui/react';
import { House, User, UsersThree } from 'phosphor-react';
import React from 'react'
import { NavLink } from 'react-router-dom';

const TopbarLink = ({ title, icon, route, onClick }) => {
    const [isLargerThan768] = useMediaQuery('(min-width: 768px)');
    console.log(isLargerThan768)
    const selectIcon = () => {
      switch (icon) {
        case 'home':
          return <House size={ "20px" } weight="fill" />;
        case 'user':
          return <User size={ "20px" } weight="fill" />;
        case 'about':
          return <UsersThree size={ "20px" } weight="fill" />
      }
    };
    
    return (
      <Link as={ NavLink }
        to={ route }
        onClick={ (e) => onClick(e) }
        h='36px' w={ {base: '40px', md: '220px'} } ml='10px' mb='10px' borderRadius='4px' transition='all 0.2s' position='relative' cursor='pointer' display='flex' p='25px 20px' overflow='hidden' bg='transparent' border='none' alignItems='center'  justifyContent={ !isLargerThan768 && 'center'}
        _hover={ { bgColor:'brand.primary20', color:'brand.primary' } }
        _focus={ { outline:'none' } }
        _activeLink={ { color:'brand.primary', bgColor:'brand.primary20' } }
      >
        <Box>
          { selectIcon() }
          {isLargerThan768 && <Box position='absolute' left={ {base: '10px', md: '43px'} } w='160px' transition='left 0.3s' top='50%' transform='translateY(-50%)' pl='10px' color='brand.gray2' >
            {title}
          </Box>}
        </Box>
      </Link>
    );
  };
  
  TopbarLink.defaultProps = {
    icon: '',
    route: '/',
    onClick: () => {},
  };

export default TopbarLink