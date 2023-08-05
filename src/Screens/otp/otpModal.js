import connection from "../../network/connection"

export const hitApiForVerifyOTP = async (email, otp, secret, deviceToken) => {

    try {
        const otpData = await connection.postAPI('/api/auth/verify/email/otp', { 'email': email, "otp": otp, "jwtSecret": secret, 'deviceToken': deviceToken })

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