import React, { useState } from 'react';

import GoogleMapReact from 'google-map-react';
import Marker from './Marker';

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
        id: point.id,
      },
      geometry: { type: 'Point', coordinates: [point.lng, point.lat] },
    };
  });
};

// Points to draw, should be substituted by the retrieved from the API
const MARKERS = [
  { id: 0, name: 'Madrid', lat: 40.41, lng: -3.71 },
  { id: 1, name: 'Alicante', lat: 38.34, lng: -0.49 },
  { id: 2, name: 'Vigo', lat: 42.23, lng: -8.71 },
];

// Google maps API KEY
const API_KEY = 'AIzaSyB_lyylykWMCpfn9_tlFpoN9mqWNVIV-a8';

// GeoJSON points
const GeoJSONPoints = parseToGeoJSON(MARKERS);

const GoogleMap = ({ userLocation }) => {
  const [bounds, setBounds] = useState(null);
  const [zoom, setZoom] = useState(15);
  const [center, setCenter] = useState(userLocation);

  const { clusters } = useSupercluster({
    points: GeoJSONPoints,
    bounds,
    zoom,
    options: { radius: 150, maxZoom: 20 },
  });

  return (
    <GoogleMapReact
      onChange={({ zoom, bounds }) => {
        setZoom(zoom);
        setBounds([bounds.nw.lng, bounds.se.lat, bounds.se.lng, bounds.nw.lat]);
      }}
      defaultZoom={15}
      bootstrapURLKeys={{ key: API_KEY }}
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
  );
};

export default GoogleMap;
