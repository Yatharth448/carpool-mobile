import connection from "../../network/connection"

export const hitApiToGetRideList = async (pickUp, drop, date, seat) => {

    try {
        const result = await connection.postAPI('/api/ride/request/list', { 'journey_start_from': pickUp, 'journey_end_to': drop, 'journey_start_at': date, 'seat_available': seat, 'route': 0})

        if (result.success) {
            return result
        }
        else {
            return result
        }

    } catch (error) {

        console.error('login modal', error);
        throw error
    }

}

export const hitApiToRequestARide = async (rideId, seat, sourceLat, sourceLong, destinationLat, destinationlong) => {

    try {
        const result = await connection.postAPI('/api/ride/request', { 'ride_id': rideId, 'seat': seat, 'sourcelat': sourceLat, 'sourcelong': sourceLong, 'destinationlat': destinationLat, 'destinationlong': destinationlong})

        if (result.success) {
            return result
        }
        else {
            return result
        }

    } catch (error) {

        console.error('login modal', error);
        throw error
    }

}
