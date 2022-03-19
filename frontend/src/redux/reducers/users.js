import {
  GET_USERS_FAIL,
  GET_USERS_SUCCESS,
  ADD_USER_SUCCESS,
  ADD_USER_FAIL,
  GET_USER_BY_ID_SUCCESS,
  GET_USER_BY_ID_FAIL,
  EDIT_USER_SUCCESS,
  EDIT_USER_FAIL,
  DELETE_USER_SUCCESS,
  DELETE_USER_FAIL
} from '../actions/actionTypes';

const initalState = {
  users: [],
  loading: true,
  user: {}
};

export default function getUsers(state = initalState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_USERS_SUCCESS:
      return { ...state, users: payload, loading: false };

    case GET_USERS_FAIL:
      return {
        ...state,
        loading: false,
        blogs: []
      };

    case ADD_USER_SUCCESS:
      return {
        ...state,
        loading: false
      };

    case ADD_USER_FAIL:
      return {
        ...state,
        loading: false
      };

    case GET_USER_BY_ID_SUCCESS:
      return { ...state, user: payload, loading: false };

    case GET_USER_BY_ID_FAIL:
      return {
        ...state,
        loading: false,
        user: {}
      };
    case DELETE_USER_SUCCESS:
      return {
        ...state,
        users: state.users.filter((item) => item.id !== payload),
        loading: false
      };

    case DELETE_USER_FAIL:
      return {
        ...state,
        loading: false
      };

    case EDIT_USER_SUCCESS:
      return {
        ...state,
        loading: false
      };

    case EDIT_USER_FAIL:
      return {
        ...state,
        loading: false
      };
    default:
      return state;
  }
}
