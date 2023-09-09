export const getProfileDataRequest = () => ({
    type: 'GET_PROFILE_DATA_REQUEST',
  });
  
  export const getProfileDataSuccess = (data) => ({
    type: 'GET_PROFILE_DATA_SUCCESS',
    payload: data,
  });
  
  export const getProfileDataFailure = (error) => ({
    type: 'GET_PROFILE_DATA_FAILURE',
    payload: error,
  });
  export const getChatDataRequest = () => ({
    type: 'GET_CHAT_DATA_REQUEST',
  });
  
  export const getChatDataSuccess = (data) => ({
    type: 'GET_CHAT_DATA_SUCCESS',
    payload: data,
  });
  
  export const getChatDataFailure = (error) => ({
    type: 'GET_CHAT_DATA_FAILURE',
    payload: error,
  });


  