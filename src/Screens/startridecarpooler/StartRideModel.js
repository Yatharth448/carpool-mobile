import connection from '../../network/connection';

export const apigetRideDetails = async id => {
  try {
    const result = await connection.getAPI('/api/ride/ride/details/' + id);

    console.log('result ', result);
    return result;
  } catch (error) {
    console.error('login modal', error);
    throw error;
  }
};

export const apiStartRide = async (ride_id, watchId) => {
  try {
    const result = await connection.postAPI('/api/ride/start', {
      ride_id: ride_id,
      watch_id: watchId,
    });

    if (result.status) {
      return result;
    } else {
      return result;
    }
  } catch (error) {
    console.error('login modal', error);
    throw error;
  }
};

export const apiUpdateLocation = async (ride_id, lat, lng) => {
  try {
    const result = await connection.postAPI('/api/ride/updatelocation', {
      ride_id: ride_id,
      lat: lat,
      long: lng,
    });
    console.log('Location update ', ride_id, lat, lng);
    if (result.status) {
      return result;
    } else {
      return result;
    }
  } catch (error) {
    console.error('login modal', error);
    throw error;
  }
};

export const apiUpdateLocationStatus = async (ride_id, status, error) => {
  try {
    const result = await connection.postAPI('/api/ride/updatelocationstatus', {
      ride_id: ride_id,
      status: status,
      error: error,
    });
    console.log('Location status update ', ride_id, status, error);
    if (result.status) {
      return result;
    } else {
      return result;
    }
  } catch (error) {
    console.error('login modal', error);
    throw error;
  }
};

export const apiUpdateRideWatch = async (ride_id, watch_id) => {
  try {
    const result = await connection.postAPI('/api/ride/updateridewatch', {
      ride_id: ride_id,
      watch_id: watch_id,
    });
    console.log('Ride watch updated ', ride_id, watch_id);
    if (result.status) {
      return result;
    } else {
      return result;
    }
  } catch (error) {
    console.error('login modal', error);
    throw error;
  }
};

export const apiEndRide = async ride_id => {
  try {
    const result = await connection.postAPI('/api/ride/closeride', {
      ride_id: ride_id,
    });
    console.log('Location update ', ride_id);
    if (result.status) {
      return result;
    } else {
      return result;
    }
  } catch (error) {
    console.error('login modal', error);
    throw error;
  }
};
