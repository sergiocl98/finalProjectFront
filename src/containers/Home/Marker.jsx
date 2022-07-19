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
import { useDispatch, useSelector } from 'react-redux';
import {
  increaseZoom,
  moveCameraToPoint,
  selectSite,
  setMapView,
  setSelectedSite,
} from '../../store/slices/mapsSlice';

const renderIcon = (icon, name) => {
  const ICONS = {
    user: <Person size={48} color="#ffc800" weight="fill" />,
    restaurant: <MapPin size={48} color="#ff0000" weight="fill" />,
    cluster: (
      <Tag size="lg" colorScheme="red" borderRadius="full">
        <TagLabel>{name}</TagLabel>
        <MapPin size={32} color="#ff0000" weight="fill" />
      </Tag>
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
      setTimeout(() => dispatch(setSelectedSite(undefined)), 1000);
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
      key={name}
      lat={lat}
      lng={lng}
      onClick={handleClick}
      zIndex={'10'}
      h="4rem"
      w="6rem"
      transform="translate(-50%, -50%)"
      borderRadius="50%"
      cursor="pointer"
    >
      <Popover>
        <PopoverTrigger>{renderIcon(icon, name)}</PopoverTrigger>
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
