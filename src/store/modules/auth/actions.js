import SignupValidations from "@/services/SignupValidations";
import {
  LOADING_SPINNER_SHOW_MUTATION,
  LOGIN_ACTION,
  SET_TOKEN_DATA_MUTATION,
  SIGNUP_ACTION,
} from "@/store/storeconstants";
import axios from "axios";

export default {
  async [LOGIN_ACTION](context, payload) {
    let postData = {
      email: payload.email, 
      password: payload.password,
      returnSecureToken: true,
    };
    let response = "";

    // context.commit(LOADING_SPINNER_SHOW_MUTATION, true,{root: true});
    try {
      console.log("Request Payload:", postData);
      response = await axios.post(
        `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAiplMj94EjpxWSUqGevsm9b5ZIgKLtXLc`,
        postData
      );
      console.log(response);
    } catch (error) {
      //  context.commit(LOADING_SPINNER_SHOW_MUTATION, false,{root: true});
      if (error.response) {
        let errorMessage = SignupValidations.getErrorMessageFromCode(
          error.response.data.error.errors[0].message
        );
        console.log("Status Code:", error.response.status);
        throw errorMessage;
      } else {
        console.log("Error:", error.message);
      }
    }
    // context.commit(LOADING_SPINNER_SHOW_MUTATION, false,{root: true});

    if (response.status === 200) {
      context.commit(SET_TOKEN_DATA_MUTATION, {
        email: response.data.email,
        token: response.data.idToken,
        expiresIn: response.data.expiresIn,
        refreshToken: response.data.refreshToken,
        userId: response.data.localId,
      });
    }
  },

  async [SIGNUP_ACTION](context, payload) {
    let postData = {
      email: payload.email,
      password: payload.password,
      returnSecureToken: true,
    };
    let response = "";

    // context.commit(LOADING_SPINNER_SHOW_MUTATION, true,{root: true});
    try {
      console.log("Request Payload:", postData);
      response = await axios.post(
        `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAiplMj94EjpxWSUqGevsm9b5ZIgKLtXLc`,
        postData
      );
      console.log("response",response);
    } catch (error) {
      //  context.commit(LOADING_SPINNER_SHOW_MUTATION, false,{root: true});
      if (error.response) {
        let errorMessage = SignupValidations.getErrorMessageFromCode(
          error.response.data.error.errors[0].message
        );
        console.log("Status Code:", error.response.status);
        throw errorMessage;
      } else {
        console.log("Error:", error.message);
      }
    }
    // context.commit(LOADING_SPINNER_SHOW_MUTATION, false,{root: true});

    if (response.status === 200) {
      context.commit(SET_TOKEN_DATA_MUTATION, {
        email: response.data.email,
        token: response.data.idToken,
        expiresIn: response.data.expiresIn,
        refreshToken: response.data.refreshToken,
        userId: response.data.localId,
      });
    }
  },
};
