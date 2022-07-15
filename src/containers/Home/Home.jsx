import React, { useState } from 'react';

import GoogleMapReact from 'google-map-react';
import MyMarker from './MyMarker';
import useSupercluster from 'use-supercluster';

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

const MARKERS = [
  { name: 'Madrid', lat: 40.41, lng: -3.71 },
  { name: 'Alicante', lat: 38.34, lng: -0.49 },
  { name: 'Vigo', lat: 42.23, lng: -8.71 },
];

const API_KEY = 'AIzaSyB_lyylykWMCpfn9_tlFpoN9mqWNVIV-a8';

const points = parseToGeoJSON(MARKERS);

//console.log(points);

const Home = () => {
  const [bounds, setBounds] = useState(null);
  const [zoom, setZoom] = useState(10);

  const { clusters, supercluster } = useSupercluster({
    points,
    bounds,
    zoom,
    options: { radius: 150, maxZoom: 20 },
  });

  return (
    <div style={{ height: '400px' }}>
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
        defaultZoom={2}
        bootstrapURLKeys={{ key: API_KEY }}
        defaultCenter={{ lat: MARKERS[0].lat, lng: MARKERS[0].lng }}
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
    </div>
  );
};

export default Home;
