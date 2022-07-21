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
import { NavLink, useParams } from 'react-router-dom';
import { NavigationArrow } from 'phosphor-react';
import LocalService from '../../services/localService';
import HeaderPage from '../../components/HeaderPage/HeaderPage';

const getSiteData = async (id, setSiteData) => {
  const res = await LocalService.getLocalById(id);
  setSiteData(res);
};

const parseMenu = (menu = []) => {
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

  useEffect(() => {
    getSiteData(id, setSiteData);
  }, [id]);
  return (
    <Box>
      <HeaderPage
        title={'Detail'}
        description={'Information about restaurant.'}
        hasGoBack
        urlBack={'/home'}
      />
      {siteData !== null && (
        <>
          <Flex justifyContent="space-between" alignItems="center">
            <Heading>{siteData.name}</Heading>
            <Button
              as={NavLink}
              to={`/book/${siteData._id}`}
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
