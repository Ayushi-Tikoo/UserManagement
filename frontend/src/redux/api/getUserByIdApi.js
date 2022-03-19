import axios from 'axios';
import variables from '../../variables';
export const getUserByIdApi = async (id) => {
  try {
    console.log('API');
    const response = await axios.get(
      `${variables.BASE_URL}/user/getUserById/${id}`
    );

    return response;
  } catch (error) {
    const errors = error.response.data.msg;

    if (errors) {
      return error.response;
    }
  }
};
