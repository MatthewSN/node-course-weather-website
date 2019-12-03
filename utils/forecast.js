const request = require("request");

const forecast = (latitude, longitude, callback) => {
  const url = `https://api.darksky.net/forecast/4a79123a115d05457ed955a79cf4fcfb/${latitude},${longitude}`;

  request(
    {
      url,
      json: true
    },
    (error, response) => {
      try {
        const { code } = response.body;
        if (code === 400) {
          callback("Unable to get data");
        } else {
          const { summary } = response.body.currently;
          callback(undefined, {
            forecast: summary
          });
        }
      } catch (e) {
        callback("Unable to get data");
      }
    }
  );
};

module.exports = forecast;
