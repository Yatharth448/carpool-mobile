import connection from "../../network/connection"

export const hitApiToGetRideList = async (pickUp, drop, date, seat) => {

    try {
        const result = await connection.postAPI('/api/ride/request', { 'journey_start_from': pickUp, 'journey_end_to': drop, 'journey_start_at': date, 'seat_available': seat, 'route': 0})

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