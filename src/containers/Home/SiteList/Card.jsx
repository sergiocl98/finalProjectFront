import { Box, Button, Flex, Heading, HStack, Image, SimpleGrid, Tag, Text } from '@chakra-ui/react';
import { MapTrifold } from 'phosphor-react';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import RestaurantDefault from '../../../shared/img/restaurantDefault.jpg';

import { NavLink } from 'react-router-dom';
import localService from '../../../services/localService';

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
    <SimpleGrid columns={2} spacing={5} templateColumns='73% 25%' gap='2%'>
      <Box>
      <Flex justifyContent={'space-between'}>
        <Text
          fontSize="20px"
          fontWeight="700"
          onClick={() => {
            handleInputReset();
            handleSelectSite(siteData.properties._id);
          }}
          cursor={'pointer'}
        >
          {siteData?.properties?.name}
        </Text>
        {canClose && (
          <Button bgColor="brand.primary" onClick={e => handleSelectSite()}>
            X
          </Button>
        )}
      </Flex>
      {siteData?.properties?.tags && <HStack spacing={'4px'} mb={'10px'}>
       {siteData?.properties?.tags.map(tag => (
        <Tag key={tag} variantColor='subtle' colorScheme='orange' textTransform={'capitalize'}>
          {tag}
        </Tag>
      ))}
      </HStack>}
      <Box cursor={'pointer'}>
        <Flex
          w={'auto'}
          alignItems="center"
          onClick={() => localService.getLocalGoogleMapsURL(siteData.geometry.coordinates)}
          whiteSpace={'wrap'}
        >
          <Flex gap='6px'> <Box minW={26} minH={26}><MapTrifold size={26} weight="regular" color={'orange'}/></Box> {siteData.properties.address} </Flex>
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
      <Box>
        <Image objectFit='cover' src={siteData.properties.image ||RestaurantDefault} alt="TableIcon" width={'100%'} height={'100%'} borderRadius='5px' />
      </Box>
    </SimpleGrid>
    </Box>
  );
};

export default Card;
