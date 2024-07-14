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
  needle.get((`http://ipwho.is/${ip}`), (error, reponse, body) => {
    // Handle local error:
    if (error) {
      callback(error, null);
      return;
    }

    if (!body.success) {
      callback(`Success status was ${body.success}. Server message says: ${body.message} when fetching for IP ${body.ip}`, null);
      return;
    }

    // Otherwise, return coordinates:
    const location = {
      latitude: body.latitude,
      longitude: body.longitude
    };
    callback(null, location);

  });
};

module.exports = { fetchMyIP, fetchCoordsByIP };