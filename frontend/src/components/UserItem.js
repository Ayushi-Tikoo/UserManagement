import React from 'react';
import variable from '../variables';
import { Link } from 'react-router-dom';
import { deleteUser } from '../redux/actions/users';
import { connect } from 'react-redux';

const UserItem = ({ item, deleteUser }) => {
  var imagepath = `${variable.IMAGE_PATH}`;
  var imagename = item.image;
  var fullname = imagepath + imagename;

  const onDelete = () => {
    const id = localStorage.getItem('userId');
    deleteUser(parseInt(id));
    localStorage.removeItem('userId');
  };
  const setUserID = () => {
    localStorage.setItem('userId', item.id);
  };
  return (
    <>
      <tr>
        <th>{item.first_name}</th>
        <td>{item.last_name}</td>
        <td>{item.email}</td>
        <td>{item.phone}</td>
        <td>{item.code}</td>
        <td>
          <img
            className='round-img'
            alt=''
            src={fullname}
            style={{ height: '30px', width: '30px' }}
          />
        </td>
        <td>
          <Link to={`/editUser/${item.id}`}>
            <i
              className='fa fa-edit'
              title='Edit User'
              style={{ marginRight: '10px' }}
            ></i>
          </Link>
          <>
            <i
              className='fa fa-trash'
              title='Delete User'
              style={{ color: 'red', cursor: 'pointer' }}
              onClick={setUserID}
              data-toggle='modal'
              data-target='#myModal'
            ></i>
          </>
        </td>
      </tr>

      <div className='modal' id='myModal'>
        <div className='modal-dialog'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h4 className='modal-title'>DELETE USER</h4>
              <button type='button' className='close' data-dismiss='modal'>
                &times;
              </button>
            </div>

            <div className='modal-body'>
              Are you sure you want to delete the user?
            </div>

            <div className='modal-footer'>
              <button
                type='button'
                className='btn btn-success'
                onClick={onDelete}
                data-dismiss='modal'
              >
                Delete
              </button>
              <button
                type='button'
                className='btn btn-danger'
                data-dismiss='modal'
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = () => ({});
export default connect(mapStateToProps, { deleteUser })(UserItem);
