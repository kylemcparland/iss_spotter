const needle = require("needle");

const fetchMyIP = function() {
  return needle("get", "https://api.ipify.org?format=json")
    .then((response) => {
      const body = response.body;
      const ip = body.ip;
      return ip;
    });
};

const fetchCoordsByIP = function(ip) {
  return needle("get", `http://ipwho.is/${ip}`)
    .then((response) => {
      const location = {
        latitude: response.body.latitude,
        longitude: response.body.longitude
      };
      return location;
    });
};

const fetchISSFlyOverTimes = function(coords) {
  const latAndLong = `?lat=${coords.latitude}&lon=${coords.longitude}`;
  return needle("get", `https://iss-flyover.herokuapp.com/json/${latAndLong}`)
    .then((response) => {
      return response.body.response;
    });
};

const nextISSTimesForMyLocation = function() {
  return fetchMyIP()
    .then((ip) => fetchCoordsByIP(ip))
    .then((coords) => fetchISSFlyOverTimes(coords))
    .then((times) => {
      return times;
    });
};

module.exports = { nextISSTimesForMyLocation };
