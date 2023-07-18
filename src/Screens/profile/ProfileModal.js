import connection from "../../network/connection"

export const hitApiToGetProfile = async () => {

    try {
        const otpData = await connection.getAPI('api/user/profile')

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

export const hitApiToUpdateProfile = async (name, email, dob) => {

    try {
        const otpData = await connection.postAPI('api/user/update', {'name': name, 'email': email, 'date_of_birth': dob})

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