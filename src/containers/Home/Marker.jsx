import { Box, Popover, PopoverArrow, PopoverBody, PopoverCloseButton, PopoverContent, PopoverHeader, PopoverTrigger,Tag, TagLabel } from '@chakra-ui/react';
import { MapPin, Person } from 'phosphor-react';
import React from 'react';

const renderIcon = (icon, name) => {
  const ICONS={
    user: <Person size={48} color="#ffc800" weight="fill" />,
    restaurant: <MapPin size={48} color="#ff0000" weight="fill" />,
    cluster: <Tag size='lg' colorScheme="red" borderRadius='full'>
              <TagLabel>{name}</TagLabel>
              <MapPin size={32} color="#ff0000" weight="fill" />
            </Tag>
  }

  return ICONS[icon];
}


const Marker = ({ name, lat, lng, $hover, setCenter, setZoom, icon }) => {
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
      cursor="pointer"
    >
      <Popover>
      <PopoverTrigger>
        {renderIcon(icon, name)}
      </PopoverTrigger>
      <PopoverContent>
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverHeader>{name}</PopoverHeader>
        {/* <PopoverBody>Are you sure you want to have that milkshake?</PopoverBody> */}
      </PopoverContent>
    </Popover>
    </Box>

    
  );
};

export default Marker;
