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

export const hitApiForVerifyAdhaarOTP = async (clientId, otp, name) => {

    try {
        const result = await connection.postAPI('/api/kyc/verify/kyc/aadhaar', { 'clientId': clientId, 'otp': otp, "identityName": name})

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

export const hitApiForDLKYC = async (licenceNumber, dob, identityName) => {

    try {
        const accountData = await connection.postAPI('/api/kyc/verify/kyc/driving/license', { 'licenseNumber': licenceNumber, 'dob': dob, 'identityName': identityName})

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

export const hitApiForUploadDocument = async (params, onUploadProgress) => {

    try {
        const accountData = await connection.uploadDocument('/api/kyc/verify/kyc/upload/document',params , onUploadProgress)

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
