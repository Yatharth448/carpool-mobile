import connection from "../../network/connection"

export const hitApiForVerifyOTP = async (mobile, otp, secret) => {

    try {
        const otpData = await connection.postAPI('/api/auth/verify/otp', { 'contactNumber': mobile, "otp": otp, "secret": secret })

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