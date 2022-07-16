import { Box } from '@chakra-ui/react';
import React from 'react';

const Marker = ({ name, lat, lng, $hover, setCenter, setZoom }) => {
  const handleClick = e => {
    e.preventDefault();
    setCenter({ lat, lng });
    setZoom(() => 20);
    setTimeout(() => setCenter({}), 1000);
    // link para visitar ese sitio en google maps
    // window.open(
    //   `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`,
    //   "_blank"
    // );
    e.stopPropagation();
  };
  return (
    <Box
      key={name}
      lat={lat}
      lng={lng}
      onClick={handleClick}
      zIndex="99"
      h="4rem"
      w="4rem"
      transform="translate(-50%, -50%)"
      borderRadius="50%"
      color="white"
      bgColor={$hover ? 'brand.primary' : 'brand.secondary'}
      display="flex"
      justifyContent="center"
      alignItems="center"
      cursor="pointer"
    >
      {name}
    </Box>
  );
};

export default Marker;
