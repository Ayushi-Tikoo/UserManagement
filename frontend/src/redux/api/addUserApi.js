import axios from 'axios';
import variables from '../../variables';

export const addUserApi = async ({
  first_name,
  last_name,
  email,
  password,
  phone,
  code,
  image
}) => {
  var formData = new FormData();

  formData.append('first_name', first_name);
  formData.append('last_name', last_name);
  formData.append('email', email);
  formData.append('password', password);
  formData.append('phone', phone);
  formData.append('code', code);
  formData.append('user', image);

  try {
    const res = await axios.post(
      `${variables.BASE_URL}/user/addUser`,
      formData
    );

    return res;
  } catch (error) {
    const errors = error.response.data.msg;
    if (errors) {
      return error.response;
    }
  }
};
