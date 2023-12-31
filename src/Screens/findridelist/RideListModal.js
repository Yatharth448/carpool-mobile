import connection from "../../network/connection"

export const hitApiToGetRideList = async (pickUp, drop, date, seat, pickMainText, dropMainText) => {

    try {
        const result = await connection.postAPI('/api/ride/request/list', { 'journey_start_from': pickUp, 'journey_end_to': drop, 'journey_start_at': date, 'seat_available': seat, 'route': 0, 'pick_main_text': pickMainText, 'drop_main_text': dropMainText})

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

export const hitApiToRequestARide = async (rideId, seat, sourceLat, sourceLong, destinationLat, destinationlong, price) => {

    try {
        const result = await connection.postAPI('/api/ride/request', { 'ride_id': rideId, 'seat': seat, 'sourcelat': sourceLat, 'sourcelong': sourceLong, 'destinationlat': destinationLat, 'destinationlong': destinationlong, 'price': price})

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
