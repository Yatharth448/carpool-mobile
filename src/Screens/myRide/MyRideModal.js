import connection from "../../network/connection"

export const hitApiToGetMyRide = async () => {

    try {
        const result = await connection.getAPI('/api/ride/list')

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