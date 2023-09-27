import connection from '../../network/connection';

export const apigetRideDetails = async id => {
  try {
    const result = await connection.getAPI(
      '/api/ride/ride/cotraveller/details/' + id,
    );

    console.log('result ', result);
    return result;
  } catch (error) {
    console.error('login modal', error);
    throw error;
  }
};

export const apiUpdateRideRunningStatus = async (ride_id, status, message) => {
  try {
    const result = await connection.postAPI('/api/ride/cotravellerstatus', {
      ride_id: ride_id,
      status: status,
      message: message,
    });
    console.log('Ride status updated ', result);
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
