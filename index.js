const { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes } = require("./iss");

fetchMyIP((error, ip) => {
  if (error) {
    console.log("It didn't work!", error);
    return;
  }

  console.log("It worked! Returned IP:", ip);
});

fetchCoordsByIP("142.181.60.175", (error, coordinates) => {
  if (error) {
    console.log("Error with fetchCoordsByIP: ", error);
    return;
  }

  console.log("fetchCoordsByIP success! Returned coordinates:", coordinates);
});

fetchISSFlyOverTimes(({latitude: 43.653226, longitude: -79.3831843}), (error, result) => {
  if (error) {
    console.log(error);
    return;
  }

  console.log(result.response);
});