const { fetchMyIP, fetchCoordsByIP } = require("./iss");

fetchMyIP((error, ip) => {
  if (error) {
    console.log("It didn't work!", error);
    return;
  }

  console.log("It worked! Returned IP:", ip);
});

fetchCoordsByIP("142.181.60.175", (error, data) => {
  if (error) {
    console.log("Failed to collect Coords: ", error);
    return;
  }

  console.log("Location of your IP address:", data);
})