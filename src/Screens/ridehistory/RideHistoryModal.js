import connection from "../../network/connection"

export const hitApiToGetOfferedRide = async () => {

    try {
        const result = await connection.getAPI('/api/ride/list/offer')

        if (result.success) {
            return result
        }
        else {
            return result
        }

    } catch (error) {

        console.error('offer ride list', error);
        throw error
    }

}

export const hitApiToGetRequestedRide = async () => {

    try {
        const result = await connection.getAPI('/api/ride/list/request')

        if (result.success) {
            return result
        }
        else {
            return result
        }

    } catch (error) {

        console.error('request ride list', error);
        throw error
    }

}

export const hitApiToGetOfferedRideDetails = async (param) => {

    try {
        const result = await connection.getAPI('/api/ride/list/offer/'+ param)

        if (result.success) {
            return result
        }
        else {
            return result
        }

    } catch (error) {

        console.error('request ride list', error);
        throw error
    }

}

export const hitApiToGetRequestedRideDetails = async (param) => {

    try {
        const result = await connection.getAPI('/api/ride/list/request/'+ param)

        if (result.success) {
            return result
        }
        else {
            return result
        }

    } catch (error) {

        console.error('request ride list', error);
        throw error
    }

}

export const hitApiToAcceptOfferedRide = async (rideId, userId) => {

    try {
        const result = await connection.postAPI('/api/ride/rider/request/action', {'rideId': rideId, 'userRequestId': userId})

        if (result.success) {
            return result
        }
        else {
            return result
        }

    } catch (error) {

        console.error('request ride list', error);
        throw error
    }

}

export const hitApiToRejectOfferedRide = async (rideId, userId, action) => {

    try {
        const result = await connection.postAPI('/api/ride/rider/request/action', {'rideId': rideId, 'userRequestId': userId, 'action': action})

        if (result.success) {
            return result
        }
        else {
            return result
        }

    } catch (error) {

        console.error('request ride list', error);
        throw error
    }

}



export const hitApiToAcceptRequestedRide = async (rideId, userId, riderId) => {

    try {
        const result = await connection.postAPI('/api/ride/traveller/request/action', {'rideId': rideId, 'userRequestId': userId, 'riderId': riderId})

        if (result.success) {
            return result
        }
        else {
            return result
        }

    } catch (error) {

        console.error('request ride list', error);
        throw error
    }

}

export const hitApiToRejectRequestedRide = async (rideId, userId, riderId, action) => {

    try {
        const result = await connection.postAPI('/api/ride/traveller/request/action', {'rideId': rideId, 'userRequestId': userId, 'riderId': riderId, 'action': action})

        if (result.success) {
            return result
        }
        else {
            return result
        }

    } catch (error) {

        console.error('request ride list', error);
        throw error
    }

}

export const hitApiToCancelRideForDriver = async (rideId) => {

    try {
        const result = await connection.postAPI('/api/ride/carpooler/cancel', {'rideId': rideId})

        if (result.success) {
            return result
        }
        else {
            return result
        }

    } catch (error) {

        console.error('request ride list', error);
        throw error
    }

}

export const hitApiToCancelRideForCustomer = async (rideId) => {

    try {
        const result = await connection.postAPI('/api/ride/cotraveller/cancel', {'rideId': rideId})

        if (result.success) {
            return result
        }
        else {
            return result
        }

    } catch (error) {

        console.error('request ride list', error);
        throw error
    }

}