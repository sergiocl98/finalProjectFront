import React from 'react';

import GoogleMapReact from 'google-map-react';
import Marker from './Marker';
import { Button } from '@chakra-ui/react';

import useSupercluster from 'use-supercluster';
import { useDispatch, useSelector } from 'react-redux';
import {
  setLocationPermission,
  setMapView,
  setSelectedSite,
} from '../../store/slices/mapsSlice';

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

const GoogleMap = () => {
  const dispatch = useDispatch();
  const {
    userPermission,
    visibleSiteList,
    center,
    userLocation,
    zoom,
    bounds,
  } = useSelector(state => state.maps);

  const { clusters } = useSupercluster({
    points: visibleSiteList,
    bounds,
    zoom,
    options: { radius: 50, maxZoom: 20 },
  });

  console.log(userPermission)
  console.log(center)

  const handleLocationPermission = e => {
    navigator.geolocation.getCurrentPosition(
      data => {
        const payload = {
          newCenter: {
            lat: data.coords.latitude,
            lng: data.coords.longitude,
          },
          permission: 'granded',
        };
        dispatch(setLocationPermission(payload));
      },
      () => {
        const payload = {
          newCenter: {
            lat: NaN,
            lng: NaN,
          },
          permission: 'denied',
        };
        dispatch(setLocationPermission(payload));
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
          onChange={({ zoom, bounds, center }) => {
            dispatch(
              setMapView({
                zoom,
                bounds,
                center,
              })
            );
          }}
          onClick={e => dispatch(setSelectedSite(undefined))}
          defaultZoom={15}
          bootstrapURLKeys={{ key: apikey, v: '3.31' }}
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
                icon="restaurant"
              />
            );
          })}
          {zoom > 12 && (
            <Marker
              key="user"
              lat={userLocation.lat}
              lng={userLocation.lng}
              name="Your location"
              icon="user"
            />
          )}
        </GoogleMapReact>
      )}
    </>
  );
};

export default GoogleMap;
