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

module.exports = { fetchMyIP };