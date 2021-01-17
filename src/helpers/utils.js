const convertRideKey = (payloads, caseFormat = 'snakeCase') => {
  let modifiedPayloads = [];

  if (caseFormat === 'snakeCase') {
    modifiedPayloads = payloads.map(({
      rideID,
      startLat,
      startLong,
      endLat,
      endLong,
      riderName,
      driverName,
      driverVehicle,
      created,
    }) => ({
      ride_id: rideID,
      start_Lat: startLat,
      start_Long: startLong,
      end_Lat: endLat,
      end_Long: endLong,
      rider_Name: riderName,
      driver_Name: driverName,
      driver_Vehicle: driverVehicle,
      created,
    }));
  }

  return modifiedPayloads;
};

module.exports = {
  convertRideKey,
};
