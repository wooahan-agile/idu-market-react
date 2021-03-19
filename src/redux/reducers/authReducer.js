import {
  LOGIN_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT_REQUEST,
  LOGOUT_FAILURE,
  LOGOUT_SUCCESS,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  LOADING_FAILURE, 
  LOADING_SUCCESS, 
  LOADING_REQUEST,
} from "../types";

const initialState = {
  jwt: "",
  isLoading: false,
  successMsg: "",
  loginErrorMsg: "",
  registerErrorMsg: "",
  checkRegister: false,
  id: "",
  email: "",
  name: "",
  exp: "",
  iss: "",
};

const auth = (state = initialState, action) => {
  switch (action.type) {
    case LOADING_REQUEST:
    case REGISTER_REQUEST:
    case LOGOUT_REQUEST:
    case LOGIN_REQUEST:
      return {
        ...state,
        isLoading: true,
        loginErrorMsg: "",
        registerErrorMsg: "",
        successMsg: "",
        id: "",
        email: "",
        name: "",
        exp: "",
        iss: "",
      };

    case LOGIN_SUCCESS:
      localStorage.setItem("jwt", action.payload.jwt);
      return {
        ...state,
        jwt: action.payload.jwt,
        isLoading: false,
        successMsg: action.payload.msg,
        loginErrorMsg: "",
      };

    case LOGIN_FAILURE:
      localStorage.removeItem("jwt");
      return {
        ...state,
        jwt: null,
        isLoading: false,
        successMsg: "",
        loginErrorMsg: action.payload.data.msg,
      };

    case LOGOUT_SUCCESS:
      localStorage.removeItem("jwt");
      return {
        ...state,
        jwt: null,
        isLoading: false,
        successMsg: "로그아웃에 성공하셨습니다.",
        loginErrorMsg: "",
      };

    case LOGOUT_FAILURE:
      return {
        ...state,
        jwt: null,
        isLoading: false,
        successMsg: "",
      };

    case REGISTER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        checkRegister: true,
        successMsg: action.payload.msg,
        registerErrorMsg: "",
      };

    case REGISTER_FAILURE:
      return {
        ...state,
        isLoading: false,
        checkRegister: false,
        successMsg: "",
        registerErrorMsg: action.payload.data.msg,
      };

    case LOADING_SUCCESS: 
      return {
        ...state,
        jwt: localStorage.getItem("jwt"),
        isLoading: false,
        id: action.payload.user.id,
        email: action.payload.user.email,
        name: action.payload.user.name,
        exp: action.payload.user.exp,
        iss: action.payload.user.iss,
      }
    
    case LOADING_FAILURE: 
      localStorage.removeItem("jwt");
      return {
        ...state,
        jwt: "",
        isLoading: false,
        id: "",
        email: "",
        name: "",
        exp: "",
        iss: "",
      }
  

    default:
      return state;
  }
};

export default auth;
