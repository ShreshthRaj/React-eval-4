export const initialState = {
  isAuth: false,
  token: null,
  isError: false,
  isLoading: false,
  data: {},
  isDataLoading: false
};

export const reducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_REQUEST":
      return {
        ...state,
        isLoading: true
      };
    case "LOGIN_SUCCESS":
      return {
        ...state,
        isAuth: true,
        token: action.payload,
        isLoading: false
      };
    case "LOGIN_FAILURE":
      return {
        ...state,
        isLoading: false
      };
    case "GET_PRODUCTS_REQUEST":
      return {
        ...state,
        isLoading: true,
        isError: false
      };
    case "GET_PRODUCTS_SUCCESS":
      return {
        ...state,
        isLoading: false,
        isError: false,
        isDataLoading: false,
        data: action.payload
      };
    case "GET_PRODUCTS_FAILURE":
      return {
        isLoading: false,
        isError: true,
        data: []
      };
    default:
      throw new Error();
  }
};
