const request = require("request");

const geoCode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1IjoibWF0dGhld3NuIiwiYSI6ImNrMDN5Z2M0cDBmNmYzaXBueHAzdDVtcHMifQ.iR6QGqRsCTfv7FDp4BIX1A`;
  request(
    {
      url,
      json: true
    },
    (error, response) => {
      try {
        const { message } = response.body;
        if (message) {
          callback(message);
        } else {
          const { center, place_name } = response.body.features[0];
          const latitude = center[0];
          const longitude = center[1];
          callback(undefined, {
            latitude,
            longitude,
            location: place_name
          });
        }
      } catch (e) {
        callback("Unable to find location!!");
      }
    }
  );
};

module.exports = geoCode;
