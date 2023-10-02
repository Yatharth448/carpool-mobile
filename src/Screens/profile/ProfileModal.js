import connection from "../../network/connection"

export const hitApiToGetProfile = async () => {

    try {
        const otpData = await connection.getAPI('api/user/profile')

        console.log(otpData, 'profile data')
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


export const hitApiToUpdateProfile = async (params) => {

    try {
        const accountData = await connection.uploadDocument('api/user/update',params )

        if (accountData.success) {
            return accountData
        }
        else {
            return accountData
        }

    } catch (error) {

        console.error('login modal', error);
        throw error
    }

}

// export const hitApiToUpdateProfile = async (name, mobile, dob) => {

//     try {
//         const otpData = await connection.postAPI('api/user/update', {'name': name, 'contact_number': mobile, 'date_of_birth': dob})

//         if (otpData.success) {
//             return otpData
//         }
//         else {
//             return otpData
//         }

//     } catch (error) {

//         console.error('otp modal', error);
//         throw error
//     }

// }