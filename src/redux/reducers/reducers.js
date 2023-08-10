const initialState = {
    data: [],
    loading: false,
    error: null,
  };
  
  const reducer = (state = initialState, action) => {
    switch (action.type) {
      case 'GET_PROFILE_DATA_REQUEST':
        return { ...state, loading: true, error: null };
      case 'GET_PROFILE_DATA_SUCCESS':
        return { ...state, loading: false, data: action.payload };
      case 'GET_PROFILE_DATA_FAILURE':
        return { ...state, loading: false, error: action.payload };
      default:
        return state;
    }
  };
  
  export default reducer;