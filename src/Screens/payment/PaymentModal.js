import connection from "../../network/connection"

export const hitApiToGetPaymentHistory = async () => {

    try {
        const otpData = await connection.getAPI('/api/wallet')

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


export const hitApiToAddMoneyToWallet = async (amount) => {

    try {
        const otpData = await connection.postAPI('/api/wallet/recharge', {"amount": amount})

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

export const hitApiToGetPaymentURL = async (amount) => {

    try {
        const otpData = await connection.postAPI('/api/user/startpayment', {"amount": amount})

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