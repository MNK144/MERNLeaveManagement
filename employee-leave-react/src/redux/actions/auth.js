
export const login = (payload) => {
  return async (dispatch) => {
    try {
      // console.log("loginPayload", payload);
      const loginData = {
        userData: {
          email: payload.email,
        },
        userTokens: {
          accessToken: payload.response.accessToken,
          refreshToken: payload.response.refreshToken,
        },
      };
      dispatch({
        type: "LOGIN",
        data: loginData,
      });
    } catch (err) {
      console.log(err);
    }
  };
};
