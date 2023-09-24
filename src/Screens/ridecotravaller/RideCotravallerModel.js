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
