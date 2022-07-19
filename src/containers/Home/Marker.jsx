import {
  Box,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Tag,
  TagLabel,
} from '@chakra-ui/react';
import { MapPin, Person } from 'phosphor-react';
import React from 'react';
import { useDispatch } from 'react-redux';
import {
  increaseZoom,
  moveCameraToPoint,
  setSelectedSite,
} from '../../store/slices/mapsSlice';

const renderIcon = (icon, name) => {
  const ICONS = {
    user: (
      <Box
        position="absolute"
        left="50%"
        top="50%"
        transform="translate(-50%, -100%)"
      >
        <Person size={48} color="#ffc800" weight="fill" />
      </Box>
    ),
    restaurant: (
      <Box
        position="absolute"
        left="50%"
        top="50%"
        transform="translate(-50%, -100%)"
      >
        <MapPin size={48} color="#ff0000" weight="fill" />
      </Box>
    ),
    cluster: (
      <Box
        position="absolute"
        left="50%"
        top="50%"
        transform="translate(-50%, -100%)"
      >
        <Tag size="lg" colorScheme="red" borderRadius="full">
          <TagLabel>{name}</TagLabel>
          <MapPin size={32} color="#ff0000" weight="fill" />
        </Tag>
      </Box>
    ),
  };

  return ICONS[icon];
};

const Marker = ({ id, name, lat, lng, icon }) => {
  const dispatch = useDispatch();

  const handleClick = e => {
    e.preventDefault();
    if (id !== undefined) {
      dispatch(setSelectedSite(id));
    } else {
      dispatch(
        moveCameraToPoint({
          lat,
          lng,
        })
      );
      dispatch(increaseZoom(1));
    }
    e.stopPropagation();
  };
  return (
    <Box
      onClick={handleClick}
      zIndex={'10'}
      cursor="pointer"
      transform="translateX(-50%) translateY(-50%)"
      w="100px"
      h="100px"
    >
      <Popover>
        <PopoverTrigger transform="translate(-50%, -50%)">
          {renderIcon(icon, name)}
        </PopoverTrigger>
        {id !== undefined && (
          <PopoverContent onClick={e => e.stopPropagation()}>
            <PopoverArrow />
            <PopoverCloseButton />
            <PopoverHeader>{name}</PopoverHeader>
            {/* <PopoverBody>Are you sure you want to have that milkshake?</PopoverBody> */}
          </PopoverContent>
        )}
      </Popover>
    </Box>
  );
};

export default Marker;
