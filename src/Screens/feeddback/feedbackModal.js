import connection from "../../network/connection"

export const hitApiToPostFeedback = async (toBeRatedUserIds, rideId, message) => {

    try {
        const result = await connection.postAPI('/api/user/update/rating', { 'toBeRatedUserIds': toBeRatedUserIds, 'rideId': rideId, 'message': message})

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