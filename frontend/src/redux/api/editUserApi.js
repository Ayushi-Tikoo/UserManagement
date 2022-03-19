import axios from 'axios';
import variables from '../../variables';

export const editUserApi = async ({
  first_name,
  last_name,
  email,
  phone,
  code,
  image,
  id
}) => {
  var formData = new FormData();

  formData.append('first_name', first_name);
  formData.append('last_name', last_name);
  formData.append('email', email);
  formData.append('phone', phone);
  formData.append('code', code);
  formData.append('user', image);

  try {
    const res = await axios.put(
      `${variables.BASE_URL}/user/editUser/${id}`,
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
