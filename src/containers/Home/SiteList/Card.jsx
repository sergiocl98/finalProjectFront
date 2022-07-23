import { Box, Button, Flex, Heading, Text } from '@chakra-ui/react';
import { MapTrifold } from 'phosphor-react';
import React from 'react';
import { useSelector } from 'react-redux';

import { NavLink } from 'react-router-dom';

const handleGetDirections = coords => {
  //link para visitar ese sitio en google maps
  window.open(
    `https://www.google.com/maps/dir//${coords[1]},${coords[0]}/?travelmode=walking`,
    '_blank'
  );
};

const Card = ({
  siteData,
  handleSelectSite,
  canClose = true,
  isSearch = false,
  handleInputReset
}) => {
  
  return (
    <Box
      overflow={'hidden'}
      mt="1rem"
      mb="1rem"
      p={5}
      shadow="md"
      borderWidth="1px"
      bgColor="white"
    >
      <Flex justifyContent={'space-between'}>
        <Text
          fontSize="20px"
          fontWeight="700"
          onClick={() => {
            handleInputReset();
            handleSelectSite(siteData.properties._id);
          }}
        >
          {siteData.properties.name}
        </Text>
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
          <Text mr="4px">{siteData.properties.address}</Text>
          <MapTrifold size={26} weight="regular" color={'orange'} />
        </Flex>
      </Box>

      {!isSearch && (
        <Box>
          <Text mb="2rem" mt="1rem">
            {siteData.properties.available
              ? `We still have some free tables`
              : 'Sorry, there are no tables available'}
          </Text>
          <Flex justifyContent={'space-between'}>
            <Button
              as={NavLink}
              to={`/detail/${siteData.properties._id}`}
              variant="secondary2"
            >
              More Info
            </Button>
            <Button
              as={NavLink}
              to={`/book/${siteData.properties._id}`}
              variant="primary"
              isDisabled={!siteData.properties.available}
            >
              Book a table
            </Button>
          </Flex>
        </Box>
      )}
    </Box>
  );
};

export default Card;
