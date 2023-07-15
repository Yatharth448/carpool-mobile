import connection from "../../network/connection"

export const hitApiForVerifyAdhaarNumber = async (adhaarNumber) => {

    try {
        const result = await connection.postAPI('/api/kyc/submit/kyc/aadhaar', { 'aadhaarNumber': adhaarNumber})

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

export const hitApiForVerifyAdhaarOTP = async (clientId, otp) => {

    try {
        const result = await connection.postAPI('/api/kyc/verify/kyc/aadhaar', { 'clientId': clientId, 'otp': otp})

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

export const hitApiForKYCSetup = async (name, email, dob) => {

    try {
        const accountData = await connection.postAPI('/api/auth/send/otp', { 'name': name, 'email': email, 'date_of_birth': dob})

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