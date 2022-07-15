import React, { useEffect, useState } from 'react';

import GoogleMapReact from 'google-map-react';
import MyMarker from './MyMarker';
import useSupercluster from 'use-supercluster';

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
      },
      geometry: { type: 'Point', coordinates: [point.lng, point.lat] },
    };
  });
};

// Points to draw, should be substituted by the retrieved from the API
const MARKERS = [
  { name: 'Madrid', lat: 40.41, lng: -3.71 },
  { name: 'Alicante', lat: 38.34, lng: -0.49 },
  { name: 'Vigo', lat: 42.23, lng: -8.71 },
];

// Google maps API KEY
const API_KEY = 'AIzaSyB_lyylykWMCpfn9_tlFpoN9mqWNVIV-a8';

// GeoJSON points
const GeoJSONPoints = parseToGeoJSON(MARKERS);

const Home = () => {
  const [bounds, setBounds] = useState(null);
  const [zoom, setZoom] = useState(10);


  const [userLocation, setUserLocation] = useState({}); // initial center of the map
  const [userPermission, setUserPermission] = useState('pending'); // controls whether the user has accepted location permissions

  const { clusters, supercluster } = useSupercluster({
    points: GeoJSONPoints,
    bounds,
    zoom,
    options: { radius: 150, maxZoom: 20 },
  });

  /**
   * Gets the physical user location to center the map
   * If the user denies permission uses the first point
   * in the array of markers
   */
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      data => {
        setUserPermission('granted');
        setUserLocation({
          lat: data.coords.latitude,
          lng: data.coords.longitude,
        });
      },
      () => {
        setUserPermission('denied');
        setUserLocation(MARKERS[0]);
      }
    );
  }, []);

  return (
    <div style={{ height: '400px' }}>
      {userPermission !== 'pending' && (
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
          bootstrapURLKeys={{ key: API_KEY }}
          defaultCenter={userLocation}
        >
          {clusters.map(cluster => {
            const [longitude, latitude] = cluster.geometry.coordinates;
            const { cluster: isCluster, point_count: pointCount } =
              cluster.properties;
            if (isCluster) {
              return (
                <MyMarker
                  key={cluster.properties.name}
                  lat={latitude}
                  lng={longitude}
                  name={pointCount}
                />
              );
            }
            return (
              <MyMarker
                key={cluster.properties.name}
                lat={latitude}
                lng={longitude}
                name={cluster.properties.name}
              />
            );
          })}
        </GoogleMapReact>
      )}
    </div>
  );
};

export default Home;
