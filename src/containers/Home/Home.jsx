import React, { useEffect, useState } from 'react';

import { Box, Grid, GridItem } from '@chakra-ui/react';

import GoogleMap from './GoogleMap';
import HeaderPage from '../../components/HeaderPage/HeaderPage';
import SiteList from './SiteList/SiteList';
import sites from './data.js';

import { useSelector, useDispatch } from 'react-redux';
import { setViewCenter as xxx } from '../../store/slices/mapsSlice';

/**
 * Converts an array of objects with name, lat and lng properties into an array
 * of GeoJSON elements
 *
 * @param {*} arr Array of markers with properties name, lat and lng
 * @returns Array of GeoJSON elements from the provided points
 */
const parseToGeoJSON = (arr, viewCenter) => {
  return arr.map(point => {
    return {
      type: 'Feature',
      properties: {
        id: point.id,
        name: point.name,
        address: point.address,
        availableTables: point.availableTables,
        cluster: false,
        distToViewCenter: calculateDistanceBetweenCoords(
          { lng: point.lng, lat: point.lat },
          viewCenter
        ),
      },
      geometry: { type: 'Point', coordinates: [point.lng, point.lat] },
    };
  });
};

/**
 * Calculates the distance betweent two coordinates in the format {lat:<float>, lng:<float>}
 * @param {*} p1 coordinate 1
 * @param {*} p2 coordinate 2
 * @returns distance in meters
 */
const calculateDistanceBetweenCoords = (p1, p2) => {
  const R = 6371e3; // metres
  const φ1 = (p1.lat * Math.PI) / 180; // φ, λ in radians
  const φ2 = (p2.lat * Math.PI) / 180;
  const Δφ = ((p2.lat - p1.lat) * Math.PI) / 180;
  const Δλ = ((p2.lng - p1.lng) * Math.PI) / 180;

  const a =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  const d = R * c; // in metres
  return d;
};

const Home = () => {

  // const dispatch = useDispatch();
  // dispatch(setViewCenter({ lat: 0, lng: 0 }));
  // const myList = useSelector(state => state.maps.visibleSiteList);
  // console.log(myList);

  const [userLocation, setUserLocation] = useState({}); // initial center of the map, there should be stored in;

  const [siteList, setSiteList] = useState(parseToGeoJSON(sites, userLocation));
  const [selectedSite, setSelectedSite] = useState(undefined);

  const [visibleSiteList, setVisibleSiteList] = useState([]);

  // map variables
  const [bounds, setBounds] = useState(null);
  const [zoom, setZoom] = useState(15);
  const [center, setCenter] = useState({});
  const [viewCenter, setViewCenter] = useState({});

  const calculateDistancesToViewCenter = () => {
    const newSiteList = parseToGeoJSON(sites, viewCenter).sort(
      (a, b) => a.properties.distToViewCenter - b.properties.distToViewCenter
    );

    setSiteList(() => newSiteList);

    setVisibleSiteList(() =>
      newSiteList
        .filter(site => site.properties.distToViewCenter <= 1000)
        .slice(0, 25)
    );
  };

  useEffect(() => {
    calculateDistancesToViewCenter();
  }, [viewCenter, userLocation, sites]);

  return (
    <Grid
      templateAreas={{
        base: `"header"
                "Map"
                "List"`,
        md: `"header header"
                "Map List"
                "Map List"`,
      }}
      gridTemplateRows={{ base: 'auto auto auto', md: 'auto auto' }}
      gridTemplateColumns={{
        base: 'auto',
        md: '72% 26%',
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
          <GoogleMap
            selectedSite={selectedSite}
            setSelectedSite={setSelectedSite}
            visibleSiteList={visibleSiteList}
            siteList={siteList}
            zoom={zoom}
            setZoom={setZoom}
            bounds={bounds}
            setBounds={setBounds}
            userLocation={userLocation}
            setUserLocation={setUserLocation}
            center={center}
            setCenter={setCenter}
            setViewCenter={setViewCenter}
          />
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
        <SiteList
          gridRow="1/2"
          siteList={siteList}
          visibleSiteList={visibleSiteList}
          selectedSite={selectedSite}
          setSelectedSite={setSelectedSite}
        />
      </GridItem>
    </Grid>
  );
};

export default Home;
