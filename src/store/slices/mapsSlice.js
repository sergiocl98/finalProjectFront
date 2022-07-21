import { createSlice } from '@reduxjs/toolkit';

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
        _id: point._id,
        name: point.name,
        description: point.description,
        address: point.address,
        totalTables: point.totalTables,
        busyTables: point.busyTables,
        availableTables: point.availableTables,
        cluster: false,
        distToViewCenter: calculateDistanceBetweenCoords(
          { lng: point.coords.lng, lat: point.coords.lat },
          viewCenter
        ),
      },
      geometry: {
        type: 'Point',
        coordinates: [point.coords.lng, point.coords.lat],
      },
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

const getVisibleSites = (arr, viewCenter) => {
  return arr
    .map(site => {
      const siteCoords = {
        lat: site.geometry.coordinates[1],
        lng: site.geometry.coordinates[0],
      };
      const d = calculateDistanceBetweenCoords(siteCoords, viewCenter);
      return {
        ...site,
        properties: { ...site.properties, distToViewCenter: d },
      };
    })
    .sort((a, b) => {
      return a.properties.distToViewCenter - b.properties.distToViewCenter;
    })
    .filter(site => site.properties.distToViewCenter < 5000)
    .slice(0, 25);
};

const initialState = {
  siteList: [],
  visibleSiteList: [],
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
    setSites(state, action) {
      const parsed = parseToGeoJSON(action.payload);
      state.siteList = [...parsed];
      state.visibleSiteList = getVisibleSites([...parsed], state.viewCenter);
    },
    setSelectedSite(state, action) {
      state.selectedSite = action.payload;
      if (action.payload === undefined) {
        state.selectedSite = undefined;
      }

      const selectedSiteData = state.siteList.find(
        p => p.properties._id === action.payload
      );

      if (!selectedSiteData) return;

      const coords = {
        lng: selectedSiteData.geometry.coordinates[0],
        lat: selectedSiteData.geometry.coordinates[1],
      };

      state.zoom = 20;
      state.center = coords;
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
      if (center) {
        state.viewCenter = center;
        state.center = center;
      }

      state.visibleSiteList = getVisibleSites(
        [...state.siteList],
        state.viewCenter
      );
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
  setSites,
  setLocationPermission,
  setMapView,
  increaseZoom,
  setSelectedSite,
  moveCameraToPoint,
} = mapsSlice.actions;
export const selectActions = mapsSlice.actions;
