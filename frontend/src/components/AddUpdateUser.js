import React, { useEffect, useState } from 'react';
import { addUser, getUserById, editUser } from '../redux/actions/users';
import { connect } from 'react-redux';
import { setAlert } from '../redux/actions/alert';
import { useParams } from 'react-router';
import variable from '../variables';

const AddUpdateUser = ({
  addUser,
  setAlert,
  getUserById,
  user,
  loading,
  editUser
}) => {
  const [userData, setUserData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    password2: '',
    phone: '',
    code: ''
  });
  const [editForm, setEditForm] = useState(false);
  const [imageData, setImageData] = useState();
  const [userId, setUserId] = useState();

  const param = useParams();

  useEffect(() => {
    if (param.id) {
      getUserById(param.id);
    }
  }, []);

  useEffect(() => {
    if (!loading && user) {
      setUserData({
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        phone: user.phone,
        code: user.code
      });
      setEditForm(true);
      setUserId(user.id);
    }
  }, [user]);

  if (user) {
    var imagepath = `${variable.IMAGE_PATH}`;
    var imagename = user.image;
    var fullname = imagepath + imagename;
  }
  const { first_name, last_name, email, password, password2, phone, code } =
    userData;

  const onChange = async (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };
  const onImageChange = (e) => {
    var imgname = e.target.files[0];
    if (imgname) {
      if (
        imgname.type === 'image/jpeg' ||
        imgname.type === 'image/jpg' ||
        imgname.type === 'image/png'
      ) {
        setImageData(imgname);
        console.log(imgname);
      } else {
        setAlert('Image type should be jpg or jpeg or png', 'danger');
        setImageData('');
      }
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (editForm) {
      const data = {
        first_name: userData.first_name,
        last_name: userData.last_name,
        email: userData.email,
        phone: parseInt(userData.phone),
        code: userData.code,
        image: imageData,
        id: userId
      };
      const { first_name, last_name, email, phone, code, image, id } = data;
      editUser({
        first_name,
        last_name,
        email,
        phone,
        code,
        image,
        id
      });
    } else {
      if (userData.password !== userData.password2) {
        setAlert('Passwords must be same', 'danger');
      } else {
        const data = {
          first_name: userData.first_name,
          last_name: userData.last_name,
          email: userData.email,
          password: userData.password,
          phone: parseInt(userData.phone),
          code: userData.code,
          image: imageData
        };
        const { first_name, last_name, email, password, phone, code, image } =
          data;
        addUser({ first_name, last_name, email, password, phone, code, image });
        setUserData({
          first_name: '',
          last_name: '',
          email: '',
          password: '',
          password2: '',
          phone: '',
          code: ''
        });
      }
    }
  };
  return (
    <>
      {editForm ? <h1>UPDATE USER</h1> : <h1>ADD USER</h1>}
      <form onSubmit={(e) => onSubmit(e)}>
        <div className='form-group'>
          <label htmlFor='first_name'>First Name:</label>
          <input
            type='text'
            className='form-control'
            name='first_name'
            value={first_name}
            onChange={(e) => onChange(e)}
            required
          />{' '}
        </div>
        <div className='form-group'>
          <label htmlFor='last_name'>Last Name:</label>
          <input
            type='text'
            className='form-control'
            name='last_name'
            value={last_name}
            onChange={(e) => onChange(e)}
            required
          />{' '}
        </div>
        <div className='form-group'>
          <label htmlFor='email'>Email:</label>
          <input
            type='email'
            className='form-control'
            name='email'
            value={email}
            onChange={(e) => onChange(e)}
            required
          />{' '}
        </div>
        {editForm ? null : (
          <>
            <div className='form-group'>
              <label htmlFor='password'>Password:</label>
              <input
                type='password'
                className='form-control'
                name='password'
                value={password}
                onChange={(e) => onChange(e)}
                required
              />{' '}
            </div>
            <div className='form-group'>
              <label htmlFor='password2'>Confirm Password:</label>
              <input
                type='password'
                className='form-control'
                name='password2'
                value={password2}
                onChange={(e) => onChange(e)}
                required
              />{' '}
            </div>
          </>
        )}
        <div className='form-group'>
          <label htmlFor='phone'>Phone Number:</label>
          <input
            type='text'
            className='form-control'
            name='phone'
            value={phone}
            onChange={(e) => onChange(e)}
            required
            pattern='[789][0-9]{9}'
          />{' '}
        </div>
        <div className='form-group'>
          <label htmlFor='code'>Code:</label>
          <input
            type='text'
            className='form-control'
            name='code'
            value={code}
            onChange={(e) => onChange(e)}
            required
            minLength='6'
            maxLength='6'
          />{' '}
        </div>
        <div className='form-group'>
          <label>Image:</label>
          {editForm && (
            <img
              alt=''
              className='round-updateimg'
              src={fullname}
              style={{ height: '30px', width: '30px' }}
            />
          )}
          <input
            type='file'
            className='form-control'
            onChange={onImageChange}
          />
        </div>

        <button type='submit' className='btn btn-primary'>
          Submit
        </button>
      </form>
      <div style={{ marginBottom: '20px' }}></div>
    </>
  );
};
const mapStateToProps = (state) => ({
  user: state.usersReducer.user,
  loading: state.usersReducer.loading
});

export default connect(mapStateToProps, {
  addUser,
  setAlert,
  getUserById,
  editUser
})(AddUpdateUser);
