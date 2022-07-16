import { Box, Button, Collapse, Flex, Heading, Text } from '@chakra-ui/react';
import { NavigationArrow } from 'phosphor-react';
import React from 'react';

const Tarjeta = ({ showCard, siteData }) => {
  siteData = {
    id: 0,
    name: 'Awesome Restaurant',
    adress: 'Awesome Street',
    coords: {
      lat: 38.34,
      lng: -0.49,
    },
    availableTables: 3,
  };
  const handleGetDirections = e => {
    //link para visitar ese sitio en google maps
    window.open(
      `https://www.google.com/maps/dir//${siteData.coords.lat},${siteData.coords.lng}/?travelmode=walking`,
      '_blank'
    );
  };

  const handleBooking = e => {
    console.log('!');
  };

  return (
    <Collapse in={showCard} startingHeight={0}>
      <Box overflow={'hidden'}>
        <Heading>{siteData.name}</Heading>
        <Flex alignItems="center" onClick={handleGetDirections}>
          <Text>{siteData.adress}</Text>
          <NavigationArrow size={32} weight="fill" />
        </Flex>
        <Text mb="2rem" mt="1rem">
          {siteData.availableTables > 0
            ? `We have ${siteData.availableTables} free table${siteData.availableTables > 1 ? 's' : ''}!`
            : 'Sorry, here is no tables available'}
        </Text>
        <Flex justifyContent={'space-between'}>
          <Button
            as={'a'}
            href={`/detail/${siteData.id}`}
            bgColor="brand.secondary"
            color="white"
          >
            More Info
          </Button>
          <Button
            onClick={handleBooking}
            bgColor="brand.primary"
            isDisabled={siteData.availableTables < 1}
          >
            Book a table
          </Button>
        </Flex>
      </Box>
    </Collapse>
  );
};

export default Tarjeta;
