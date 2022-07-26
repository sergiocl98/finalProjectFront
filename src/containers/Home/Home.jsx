import React, { useEffect } from 'react';

import { Box, Center, Grid, GridItem, Image } from '@chakra-ui/react';

import GoogleMap from './GoogleMap';
import HeaderPage from '../../components/HeaderPage/HeaderPage';
import SiteList from './SiteList/SiteList';
import localService from '../../services/localService';
import { useDispatch, useSelector } from 'react-redux';
import { setMapView, setSites } from '../../store/slices/mapsSlice';
import DateFilter from './DateFilter/DateFilter';

import Logo from '../../shared/img/login_logo.png';
import BannerHome from '../../shared/img/bannerHome2.png';

const getLocals = async dispatcherFunction => {
  const res = await localService.getLocals();
  dispatcherFunction(res);
};

const Home = () => {
  const dispatch = useDispatch();
  const { siteList, userPermission } = useSelector(state => state.maps);
  const { date, people } = useSelector(state => state.booking);

  console.log(siteList);

  useEffect(() => {
    getLocals(v => dispatch(setSites(v)));
  }, []);

  useEffect(() => {
    dispatch(setMapView({ date, people }));
  }, [siteList, date, people]);

  return (
    <Grid
      position="relative"
      templateAreas={{
        base: `"header"
                "Map"
                "List"`,
        md: `"header header"
                "List Map"
                "List Map"`,
      }}
      gridTemplateRows={{ base: 'auto auto auto', md: 'auto auto' }}
      gridTemplateColumns={{
        base: 'auto',
        md: 'minmax(375px, 26%) minmax(auto, 72%)',
      }}
      gap="2%"
    >
      <GridItem pl="2" area={'header'}>
        <HeaderPage
          title={'Home'}
          description={
            'Interact with the mapa to search your desired restaurant'
          }
        />
      </GridItem>
      <GridItem
        pl="2"
        area={'Map'}
        h={{
          base: '50vh',
          md: 'calc(100vh - 225px)',
        }}
      >
        <Box gridRow="2/3" h="100%" pos="relative">
          <GoogleMap />
        </Box>
      </GridItem>
      <GridItem
        pl="2"
        area={'List'}
        h={{
          base: 'auto',
          md: 'calc(100vh - 225px)',
        }}
      >
        {userPermission !== 'pending' ? (
          <>
            <DateFilter />
            <SiteList gridRow="1/2" />
          </>
        ) : (
          <Box w="auto" h="100%" bgImage={BannerHome} bgPos="center" bgSize={'cover'} bgRepeat="no-repeat" borderRadius="1rem">
            <Center w={'100%'} h={{base:'100%',lg:'30%'}}>
              <Image src={Logo} alt="Logo" w={{base:'150px',lg:'300px'}} h={{base:'150px',lg:'300px'}} mt={{base:'10px',lg:'50px'}}/> 
            </Center>
            
          </Box>
        )}
      </GridItem>
    </Grid>
  );
};

export default Home;
