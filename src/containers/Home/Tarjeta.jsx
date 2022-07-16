import { Box, Button, Collapse, Flex, Heading, Text } from '@chakra-ui/react';
import { NavigationArrow } from 'phosphor-react';
import React, { useEffect, useState } from 'react';

import { NavLink } from 'react-router-dom';


const handleGetDirections = (siteData) => {
  //link para visitar ese sitio en google maps
  window.open(
    `https://www.google.com/maps/dir//${siteData.coords.lat},${siteData.coords.lng}/?travelmode=walking`,
    '_blank'
  );
};
const getSiteData = id => {
  return {
    id: 0,
    name: 'Awesome Restaurant',
    address: 'Awesome Street',
    coords: {
      lat: 38.34,
      lng: -0.49,
    },
    availableTables: 3,
  };
};

const Tarjeta = ({ setSelectedSite, selectedSite }) => {
  const [siteData, setSiteData] = useState({});

  useEffect(() => {
    setSiteData(() => getSiteData(selectedSite));
  }, [selectedSite]);



  const handleBooking = e => {
    console.log('Redirecting to booking');
  };

  return (
    <Collapse id="tarjeta" in={selectedSite !== undefined} startingHeight={0}>
      <Box overflow={'hidden'} mt="1rem" mb="1rem">
        <Flex justifyContent={'space-between'}>
          <Heading>{siteData.name}</Heading>
          <Button
            bgColor="brand.primary"
            onClick={e => setSelectedSite(undefined)}
          >
            X
          </Button>
        </Flex>
        <Box display="inline-block" cursor={'pointer'}>
          <Flex
            w={'auto'}
            alignItems="center"
            onClick={() => handleGetDirections(siteData)}
          >
            <Text>{siteData.address}</Text>
            <NavigationArrow size={32} weight="fill" />
          </Flex>
        </Box>
        <Text mb="2rem" mt="1rem">
          {siteData.availableTables > 0
            ? `We have ${siteData.availableTables} free table${
                siteData.availableTables > 1 ? 's' : ''
              }!`
            : 'Sorry, here is no tables available'}
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
    </Collapse>
  );
};

export default Tarjeta;
