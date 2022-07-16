import React, { useState } from 'react';

import GoogleMapReact from 'google-map-react';
import Marker from './Marker';
import { Box, Button } from '@chakra-ui/react';

import useSupercluster from 'use-supercluster';

const mapStyles = {
  styles: [
    {
      featureType: 'poi',
      stylers: [
        {
          visibility: 'off',
        },
      ],
    },
    {
      featureType: 'administrative',
      stylers: [
        {
          visibility: 'off',
        },
      ],
    },
    {
      featureType: 'transit',
      stylers: [
        {
          visibility: 'off',
        },
      ],
    },
  ],
};

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

// Points to draw, should be substituted by the retrieved from the API
const MARKERS = [
  { id: 0, name: 'Madrid', lat: 40.41, lng: -3.71 },
  { id: 1, name: 'Vigo', lat: 42.23, lng: -8.71 },
  { id: 2, name: 'El centro', lat: 38.34, lng: -0.49 },
  { id: 3, name: 'El local', lat: 38.36, lng: -0.49 },
  { id: 4, name: 'La uni', lat: 38.38, lng: -0.51 },
];

// Google maps API KEY
const apikey = "";//process.env.REACT_APP_API_KEY || '';

// GeoJSON points
const GeoJSONPoints = parseToGeoJSON(MARKERS);

const GoogleMap = () => {
  const [bounds, setBounds] = useState(null);
  const [zoom, setZoom] = useState(15);
  const [center, setCenter] = useState({});

  const { clusters } = useSupercluster({
    points: GeoJSONPoints,
    bounds,
    zoom,
    options: { radius: 150, maxZoom: 20 },
  });

  const [userPermission, setUserPermission] = useState('pending'); // controls whether the user has accepted location permissions
  const [userLocation, setUserLocation] = useState({}); // initial center of the map, there should be stored in;

  const handleLocationPermission = e => {
    navigator.geolocation.getCurrentPosition(
      data => {
        const newCenter = {
          lat: data.coords.latitude,
          lng: data.coords.longitude,
        };
        setUserLocation(newCenter);
        setCenter(newCenter);

        setUserPermission('granted');
      },
      () => {
        setUserLocation({ lat: 40.41, lng: -3.71 });
        setCenter({ lat: 40.41, lng: -3.71 });
        setUserPermission('denied');
      }
    );
  };

  return (
    <>
      {userPermission === 'pending' ? (
        <Button
          left="50%"
          top="50%"
          transform="translate(-50%, -50%)"
          onClick={handleLocationPermission}
          bgColor="brand.primary"
        >
          Search for near places
        </Button>
      ) : (
        <GoogleMapReact
          onChange={({ zoom, bounds }) => {
            setZoom(zoom);
            setBounds([
              bounds.nw.lng,
              bounds.se.lat,
              bounds.se.lng,
              bounds.nw.lat,
            ]);
          }}
          defaultZoom={15}
          bootstrapURLKeys={{ key: apikey }}
          options={mapStyles}
          defaultCenter={userLocation}
          center={center}
          zoom={zoom}
        >
          {clusters.map(cluster => {
            const [longitude, latitude] = cluster.geometry.coordinates;
            const { cluster: isCluster, point_count: pointCount } =
              cluster.properties;
            if (isCluster) {
              return (
                <Marker
                  key={JSON.stringify(cluster)}
                  lat={latitude}
                  lng={longitude}
                  name={pointCount}
                  setCenter={setCenter}
                  setZoom={() => setZoom(oldZoom => oldZoom + 1)}
                />
              );
            }
            return (
              <Marker
                key={cluster.properties.id}
                lat={latitude}
                lng={longitude}
                name={cluster.properties.name}
                setCenter={setCenter}
                setZoom={setZoom}
              />
            );
          })}
        </GoogleMapReact>
      )}
    </>
  );
};

export default GoogleMap;
