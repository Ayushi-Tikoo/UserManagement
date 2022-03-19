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
} from './actionTypes';
import { getUsersApi } from '../api/getUsersApi';
import { addUserApi } from '../api/addUserApi';
import { getUserByIdApi } from '../api/getUserByIdApi';
import { setAlert } from './alert';
import { editUserApi } from '../api/editUserApi';
import { deleteUserApi } from '../api/deleteUserApi';

//get all users
export const getUsers = () => async (dispatch) => {
  const response = await getUsersApi();

  if (response.status === 200) {
    dispatch({
      type: GET_USERS_SUCCESS,
      payload: response.data
    });
  } else {
    dispatch({ type: GET_USERS_FAIL });
  }
};

//add user
export const addUser =
  ({ first_name, last_name, email, password, phone, code, image }) =>
  async (dispatch) => {
    const res = await addUserApi({
      first_name,
      last_name,
      email,
      password,
      phone,
      code,
      image
    });

    if (res.status === 200) {
      dispatch(setAlert('User Created Successfully', 'success'));
      dispatch({
        type: ADD_USER_SUCCESS
      });
    } else {
      dispatch(setAlert('User Not Created', 'danger'));
      dispatch({ type: ADD_USER_FAIL });
    }
  };

//get user by id
export const getUserById = (id) => async (dispatch) => {
  const response = await getUserByIdApi(id);

  if (response.status === 200) {
    dispatch({
      type: GET_USER_BY_ID_SUCCESS,
      payload: response.data
    });
  } else {
    dispatch({ type: GET_USER_BY_ID_FAIL });
  }
};

// edit users action method
export const editUser =
  ({ first_name, last_name, email, phone, code, image, id }) =>
  async (dispatch) => {
    const res = await editUserApi({
      first_name,
      last_name,
      email,
      phone,
      code,
      image,
      id
    });

    if (res.status === 200) {
      dispatch(setAlert('User Updated Successfully', 'success'));
      dispatch({
        type: EDIT_USER_SUCCESS,
        payload: res.data[0]
      });
    } else {
      dispatch(setAlert('User Not Updated', 'danger'));
      dispatch({ type: EDIT_USER_FAIL });
    }
  };

// delete blogs action method
export const deleteUser = (id) => async (dispatch) => {
  const res = await deleteUserApi(id);

  if (res.status === 200) {
    dispatch(setAlert('User Deleted Successfully', 'success'));
    dispatch({
      type: DELETE_USER_SUCCESS,
      payload: id
    });
  } else {
    dispatch(setAlert('User Not Deleted', 'danger'));
    dispatch({ type: DELETE_USER_FAIL });
  }
};
