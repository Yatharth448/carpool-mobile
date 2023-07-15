import connection from "../../network/connection"

export const hitApiToGetRoutes = async (pickUp, drop) => {

    try {
        const result = await connection.postAPI('/api/ride/request/path', { 'journey_start_from': pickUp, 'journey_end_to': drop })

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

export const hitApiToSaveRide = async (pickUp, drop, seat, date, route, price) => {

    try {
        const result = await connection.postAPI('/api/ride', { 'journey_start_from': pickUp, 'journey_end_to': drop, 'seat_available': seat, 'journey_start_at': date, 'route': route, 'expected_price': price })

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