import { Box, Stack } from '@chakra-ui/react';
import React from 'react';
import TopbarLink from './TopbarLink';

const TopbarContent = () => {
  return (
    <Box pt="15px" h="100%" overflowX="hidden">
      <Stack
        direction="row"
        borderBottom="1px solid #eff1f5"
        _last={{ border: 'none' }}
      >
        <TopbarLink
          title={'Home'}
          activeRoutes={['/home']}
          route="/home"
          icon="home"
        />
        <TopbarLink
          title={'My profile'}
          activeRoutes={['/profile']}
          route="/profile"
          icon="user"
        />
        <TopbarLink
          title={'About'}
          activeRoutes={['/about']}
          route="/about"
          icon="about"
        />
      </Stack>
    </Box>
  );
};

export default TopbarContent;
