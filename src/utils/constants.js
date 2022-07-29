export const mapStyles = {
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
            visibility: 'on',
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
    gestureHandling:"greedy"
  };

// Google maps API KEY
export const apikey = process.env.REACT_APP_API_KEY || '';