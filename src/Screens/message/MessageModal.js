import connection from "../../network/connection"

export const hitApiToSendMessage = async (coTravelerId, message) => {

    try {
        const loginData = await connection.postAPI('/api/chat/send/msg', { 'cotravellerId': coTravelerId, 'message': message })

        if (loginData.success) {
            return loginData
        }
        else {
            return loginData
        }

    } catch (error) {

        console.error('login modal', error);
        throw error
    }

}

export const hitApiToGetChatList = async () => {

    try {
        const loginData = await connection.getAPI('/api/chat/message/list')

        if (loginData.success) {
            return loginData
        }
        else {
            return loginData
        }

    } catch (error) {

        console.error('login modal', error);
        throw error
    }

}

export const hitApiToMessageForParticularUser = async (id) => {

    try {
        const loginData = await connection.getAPI('/api/chat/message/' + id )

        if (loginData.success) {
            return loginData
        }
        else {
            return loginData
        }

    } catch (error) {

        console.error('login modal', error);
        throw error
    }

}