import React, { useState } from 'react';

import { Box, Button, Grid, GridItem } from '@chakra-ui/react';

import GoogleMap from './GoogleMap';
import HeaderPage from '../../components/HeaderPage/HeaderPage';
import SiteList from './SiteList';

// Points to draw, should be substituted by the retrieved from the API
const sites = [
  { id: 0, name: 'Madrid', lat: 40.41, lng: -3.71 },
  { id: 1, name: 'Vigo', lat: 42.23, lng: -8.71 },
  { id: 2, name: 'El centro', lat: 38.34, lng: -0.49 },
  { id: 3, name: 'El local', lat: 38.36, lng: -0.49 },
  { id: 4, name: 'La uni', lat: 38.38, lng: -0.51 },
];

/**
 * Converts an array of objects with name, lat and lng properties into an array
 * of GeoJSON elements
 *
 * @param {*} arr Array of markers with properties name, lat and lng
 * @returns Array of GeoJSON elements from the provided points
 */
const parseToGeoJSON = arr => {
  return arr.map(point => {
    return {
      type: 'Feature',
      properties: {
        cluster: false,
        name: point.name,
        id: point.id,
      },
      geometry: { type: 'Point', coordinates: [point.lng, point.lat] },
    };
  });
};

// GeoJSON points
const GeoJSONPoints = parseToGeoJSON(sites);

// sort sites by proximity
const calculateDistaceBetweenCoords = (p1, p2) => {
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
  const [siteList, setSiteList] = useState(sites);
  const [selectedSite, setSelectedSite] = useState(undefined);

  // map variables
  const [bounds, setBounds] = useState(null);
  const [zoom, setZoom] = useState(15);

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
        <Box gridRow="2/3" h="100%">
          <GoogleMap
            selectedSite={selectedSite}
            setSelectedSite={setSelectedSite}
            GeoJSONPoints={GeoJSONPoints}
            zoom={zoom}
            setZoom={setZoom}
            bounds={bounds}
            setBounds={setBounds}
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
          selectedSite={selectedSite}
          setSelectedSite={setSelectedSite}
        />
      </GridItem>
    </Grid>
  );
};

export default Home;
