const needle = require("needle");

const fetchMyIP = function(callback) {
  needle.get("https://api.ipify.org?format=json", (error, response, body) => {
    // Handle local error:
    if (error) {
      return callback(error, null);
    }

    // Handle non-successful server error:
    if (response.statusCode !== 200) {
      callback(Error(`Status Code ${response.statusCode} when fetching IP. Response: ${body}`), null);
      return;
    }

    // Otherwise, return IP:
    const IP = body.ip;
    callback(null, IP);
  });
};

const fetchCoordsByIP = function(ip, callback) {
  needle.get((`http://ipwho.is/${ip}`), (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }
    const location = {
      latitude: body.latitude,
      longitude: body.longitude
    };
    callback(null, location);

  });
};

module.exports = { fetchMyIP, fetchCoordsByIP };