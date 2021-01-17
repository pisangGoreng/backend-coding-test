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
      start_lat: startLat,
      start_long: startLong,
      end_lat: endLat,
      end_long: endLong,
      rider_name: riderName,
      driver_name: driverName,
      driver_vehicle: driverVehicle,
      created,
    }));
  }

  return modifiedPayloads;
};

module.exports = {
  convertRideKey,
};
