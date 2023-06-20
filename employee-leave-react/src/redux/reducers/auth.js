const initialState = {
    userData: {},
    userTokens: {},
  };
  
  const authReducer = (state = initialState, action) => {
    switch (action.type) {
      case "LOGIN":
        return {userData: action.data.userData, userTokens: action.data.userTokens};
      case "LOGOUT":
      case "AUTH_FAIL":
        localStorage.clear();
        return initialState;
      default:
        return state;
    }
  };
  
  export default authReducer;
  