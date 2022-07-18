import { Box, Button, Flex, Heading, Text } from '@chakra-ui/react';
import { NavigationArrow } from 'phosphor-react';
import React from 'react';

import { NavLink } from 'react-router-dom';

const handleGetDirections = coords => {
  //link para visitar ese sitio en google maps
  window.open(
    `https://www.google.com/maps/dir//${coords[1]},${coords[0]}/?travelmode=walking`,
    '_blank'
  );
};

const Card = ({ siteData, handleSelectSite, canClose = true }) => {
  const handleBooking = e => {
    console.log('Redirecting to booking');
  };

  return (
    <Box overflow={'hidden'} mt="1rem" mb="1rem">
      <Flex justifyContent={'space-between'}>
        <Heading
          onClick={() => {
            handleSelectSite(siteData.properties.id);
          }}
        >
          {siteData.properties.name}
        </Heading>
        {canClose && (
          <Button bgColor="brand.primary" onClick={e => handleSelectSite()}>
            X
          </Button>
        )}
      </Flex>
      <Box display="inline-block" cursor={'pointer'}>
        <Flex
          w={'auto'}
          alignItems="center"
          onClick={() => handleGetDirections(siteData.geometry.coordinates)}
        >
          <Text>{siteData.properties.address}</Text>
          <NavigationArrow size={32} weight="fill" />
        </Flex>
      </Box>
      <Text mb="2rem" mt="1rem">
        {siteData.properties.availableTables > 0
          ? `We have ${siteData.properties.availableTables} free table${
              siteData.properties.availableTables > 1 ? 's' : ''
            }!`
          : 'Sorry, there are no tables available'}
      </Text>
      <Flex justifyContent={'space-between'}>
        <Button
          as={NavLink}
          to={`/detail/${siteData.id}`}
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
  );
};

export default Card;
