import connection from "../../network/connection"

export const hitApiForAccountSetup = async (name, email, dob) => {

    try {
        const accountData = await connection.postAPI('/api/user/update', { 'name': name, 'email': email, 'date_of_birth': dob})

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