import {
  Box,
  Button,
  Flex,
  Heading,
  List,
  ListItem,
  Text,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { NavigationArrow } from 'phosphor-react';
import GoogleMap from '../Home/GoogleMap';

const getSiteData = id => {
  return {
    id: 0,
    name: 'Awesome Restaurant',
    address: 'Awesome Street',
    menu: [
      {
        name: 'CheeseBurger',
        price: null,
        category: 'Burgers',
      },
      {
        name: 'DoubleBurger',
        price: null,
        category: 'Burgers',
      },
      {
        name: 'Cuatro Quesos',
        price: null,
        category: 'Pizza',
      },
      {
        name: 'Tarta de Queso',
        price: null,
        category: 'Postre',
      },
      {
        name: 'Helado',
        price: null,
        category: 'Postre',
      },
    ],
    description:
      'An awesome food, in an awesome place to have the most awesome food',
    coords: {
      lat: 38.34,
      lng: -0.49,
    },
    availableTables: 3,
  };
};

const parseMenu = menu => {
  return menu
    .map(ele => ele.category)
    .reduce((prev, curr) => (prev.includes(curr) ? prev : [...prev, curr]), []);
};

const handleGetDirections = siteData => {
  //link para visitar ese sitio en google maps
  window.open(
    `https://www.google.com/maps/dir//${siteData.coords.lat},${siteData.coords.lng}/?travelmode=walking`,
    '_blank'
  );
};

const Detail = () => {
  const { id } = useParams();
  const [siteData, setSiteData] = useState(null);

  const handleBooking = () => {
    console.log('!');
  };

  useEffect(() => {
    setSiteData(() => getSiteData(id));
  }, []);
  return (
    <Box>
      {siteData && (
        <>
          <Flex justifyContent={'space-between'} alignItems="center">
            <Heading>{siteData.name}</Heading>
            <Button
              onClick={handleBooking}
              bgColor="brand.primary"
              isDisabled={siteData.availableTables < 1}
            >
              Book a table
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
          <Heading fontSize={'150%'}>About the place</Heading>
          <Text>{siteData.description}</Text>
          <Heading fontSize={'150%'}>Menu</Heading>
          <Flex>
            {parseMenu(siteData.menu).map(cat => {
              return (
                <Box mr="1rem">
                  <Heading fontSize={'100%'}>{cat}</Heading>
                  <List>
                    {siteData.menu
                      .filter(ele => ele.category === cat)
                      .map(ele => (
                        <ListItem>{ele.name}</ListItem>
                      ))}
                  </List>
                </Box>
              );
            })}
          </Flex>
        </>
      )}
    </Box>
  );
};

export default Detail;
