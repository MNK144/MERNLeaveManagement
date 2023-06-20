const initialState = {
  leavesList: [],
  leaveBalance: {},
};

const leaveReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOAD_LEAVES":
      return {
        userData: action.data.userData,
        userTokens: action.data.userTokens,
      };
    case "LOGOUT":
      return initialState;
    default:
      return state;
  }
};

export default leaveReducer;
