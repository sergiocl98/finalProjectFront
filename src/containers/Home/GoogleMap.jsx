import React, { useEffect, useState } from 'react';

import GoogleMapReact from 'google-map-react';
import Marker from './Marker';
import { Button } from '@chakra-ui/react';

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

// Google maps API KEY
const apikey = ''; //process.env.REACT_APP_API_KEY || '';

const GoogleMap = ({
  selectedSite,
  setSelectedSite,
  siteList,
  zoom,
  setZoom,
  bounds,
  setBounds,
  userLocation,
  setUserLocation,
}) => {
  const [center, setCenter] = useState({});

  const { clusters } = useSupercluster({
    points: siteList,
    bounds,
    zoom,
    options: { radius: 50, maxZoom: 20 },
  });

  const [userPermission, setUserPermission] = useState('pending'); // controls whether the user has accepted location permissions

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

  useEffect(() => {
    if (selectedSite === undefined) return;

    const selectedSiteData = siteList.find(
      p => p.properties.id === selectedSite
    );

    setCenter({
      lng: selectedSiteData.geometry.coordinates[0],
      lat: selectedSiteData.geometry.coordinates[1],
    });
    setTimeout(() => setCenter({}), 1000);

    setZoom(() => 20);
  }, [selectedSite]);

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
          onClick={e => setSelectedSite(undefined)}
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
                  icon="cluster"
                />
              );
            }
            return (
              <Marker
                id={cluster.properties.id}
                key={cluster.properties.id}
                lat={latitude}
                lng={longitude}
                name={cluster.properties.name}
                setCenter={setCenter}
                setZoom={setZoom}
                icon="restaurant"
                setSelectedSite={setSelectedSite}
              />
            );
          })}
          {zoom > 12 && (
            <Marker
              key="user"
              lat={userLocation.lat}
              lng={userLocation.lng}
              name="Your location"
              setCenter={setCenter}
              setZoom={setZoom}
              icon="user"
            />
          )}
        </GoogleMapReact>
      )}
    </>
  );
};

export default GoogleMap;
