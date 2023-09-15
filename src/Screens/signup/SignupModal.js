import connection from "../../network/connection"

export const hitApiForSignUp = async (name, email, password, mobile, gender) => {

    try {
        const signupData = await connection.postAPI('/api/auth/send/email/otp', {'name': name, 'email': email, 'password': password, 'contactNumber': mobile, gender: gender})

        if (signupData.success) {
            return signupData
        }
        else {
            return signupData
        }

    } catch (error) {

        console.error('login modal', error);
        throw error
    }

}

export const hitApiForGoogleSignUp = async ( email, firstName, givenName, id, photo, token, mobile, gender) => {

    try {
        const signupData = await connection.postAPI('/api/auth/signup/google', { 'email': email, 'firstName': firstName, 'givenName': givenName, id: id, 'photo': photo, 'device_token': token, 'contactNumber': mobile, 'gender': gender  })

        if (signupData.success) {
            return signupData
        }
        else {
            return signupData
        }

    } catch (error) {

        console.error('login modal', error);
        throw error
    }

}

export const hitApiToResentOTP = async ( email ) => {

    try {
        const signupData = await connection.postAPI('/api/auth/resend/email/otp', { 'email': email })

        if (signupData.success) {
            return signupData
        }
        else {
            return signupData
        }

    } catch (error) {

        console.error('login modal', error);
        throw error
    }

}

