const needle = require("needle");

const fetchMyIP = function(callback) {
  needle.get("https://api.ipify.org?format=json", (error, response, body) => {
    // Handle local error:
    if (error) {
      return callback(error, null);
    }

    // Handle non-successful server error:
    if (response.statusCode !== 200) {
      callback(`Status Code ${response.statusCode} when fetching IP. Response: ${body}`, null);
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


const fetchISSFlyOverTimes = function(coords, callback) {
  const latAndLong = `?lat=${coords.latitude}&lon=${coords.longitude}`;

  needle.get(`https://iss-flyover.herokuapp.com/json/${latAndLong}`, (error, response, body) => {
    if (error) {
      return callback(error, null);
    }

    if (response.statusCode !== 200) {
      callback(`Server message says: "${body}"`);
      return;
    }

    callback(null, body.response);
  });
};


const nextISSTimesForMyLocation = function(callback) {
  fetchMyIP((error, ip) => {
    if (error) {
      return callback(error, null);
    }

    fetchCoordsByIP(ip, (error, loc) => {
      if (error) {
        return callback(error, null);
      }

      fetchISSFlyOverTimes(loc, (error, nextPasses) => {
        if (error) {
          return callback(error, null);
        }

        callback(null, nextPasses);
      });
    });
  });
};

module.exports = { nextISSTimesForMyLocation };