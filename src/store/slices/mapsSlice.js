import { createSlice } from '@reduxjs/toolkit';
import sites from '../../containers/Home/data';

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
  try {
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
  } catch (err) {
    return -1;
  }
};

const getVisibleSites = state => {
  return state.siteList
    .map(site => {
      const siteCoords = {
        lat: site.geometry.coordinates[1],
        lng: site.geometry.coordinates[0],
      };
      const d = calculateDistanceBetweenCoords(siteCoords, state.viewCenter);
      return {
        ...site,
        properties: { ...site.properties, distToViewCenter: d },
      };
    })
    .sort((a, b) => {
      return a.properties.distToViewCenter - b.properties.distToViewCenter;
    })
    .slice(0, 25);
};

const parsedSites = parseToGeoJSON(sites, {});

const initialState = {
  siteList: parsedSites,
  visibleSiteList: parsedSites
    .filter(site => site.properties.distToViewCenter <= 1000)
    .slice(0, 25),
  userLocation: {},
  userPermission: 'pending',
  selectedSite: undefined,
  zoom: 15,
  bounds: null,
  center: {},
  viewCenter: {},
};

export const mapsSlice = createSlice({
  name: 'maps',
  initialState,
  reducers: {
    setSelectedSite(state, action) {
      state.selectedSite = action.payload;
      if (action.payload === undefined) {
        state.selectedSite = undefined;
        state.center = {};
      }

      const selectedSiteData = state.siteList.find(
        p => p.properties.id === action.payload
      );

      if (!selectedSiteData) return;

      const coords = {
        lng: selectedSiteData.geometry.coordinates[0],
        lat: selectedSiteData.geometry.coordinates[1],
      };

      state.zoom = 15;
      state.center = coords;
      state.viewCenter = coords;
      state.zoom = 20;
    },
    setLocationPermission(state, action) {
      const { newCenter, permission } = action.payload;

      state.userLocation = newCenter;
      state.center = newCenter;
      state.viewCenter = newCenter;
      state.userPermission = permission;
    },
    setMapView(state, action) {
      const { zoom, bounds, center } = action.payload;
      if (zoom) state.zoom = zoom;
      if (bounds)
        state.bounds = [
          bounds.nw.lng,
          bounds.se.lat,
          bounds.se.lng,
          bounds.nw.lat,
        ];
      if (center) state.viewCenter = center;

      state.visibleSiteList = getVisibleSites(state);
    },
    moveCameraToPoint(state, action) {
      state.center = action.payload;
    },
    increaseZoom(state, action) {
      state.zoom += action.payload;
    },
  },
});

export const {
  setLocationPermission,
  setMapView,
  increaseZoom,
  setSelectedSite,
  moveCameraToPoint,
} = mapsSlice.actions;
export const selectActions = mapsSlice.actions;
