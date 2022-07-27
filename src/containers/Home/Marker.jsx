import {
  Box,
  Popover,
  PopoverArrow,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Tag,
  TagLabel,
} from '@chakra-ui/react';
import { MapPin, Person } from 'phosphor-react';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  increaseZoom,
  moveCameraToPoint,
  setSelectedSite,
} from '../../store/slices/mapsSlice';

const renderIcon = (icon, name, available) => {
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
        opacity={available? "1": "0.5"}
      >
        <MapPin size={48} color={available ? "#8BC34A" : "#E62A10"} weight="fill" />
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

const Marker = ({ id, name, lat, lng, icon, available = true }) => {
  const dispatch = useDispatch();
  const {date, people} = useSelector(state => state.booking)

  const handleClick = e => {
    e.preventDefault();
    if (id !== undefined) {
      dispatch(setSelectedSite({id, date, people}));
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
          {renderIcon(icon, name, available)}
        </PopoverTrigger>
        {id !== undefined && (
          <PopoverContent onClick={e => e.stopPropagation()}>
            <PopoverArrow />
            <PopoverCloseButton />
            <PopoverHeader>{name}</PopoverHeader>
          </PopoverContent>
        )}
      </Popover>
    </Box>
  );
};

export default Marker;
