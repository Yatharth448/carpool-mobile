import connection from "../../network/connection"

export const hitApiToGetNotifications = async () => {

    try {
        const otpData = await connection.getAPI('api/notification')

        if (otpData.success) {
            return otpData
        }
        else {
            return otpData
        }

    } catch (error) {

        console.error('otp modal', error);
        throw error
    }

}


export const hitApiToSetSeenNotifications = async () => {

    try {
        const otpData = await connection.getAPI('api/notification/seen')

        if (otpData.success) {
            return otpData
        }
        else {
            return otpData
        }

    } catch (error) {

        console.error('otp modal', error);
        throw error
    }

}