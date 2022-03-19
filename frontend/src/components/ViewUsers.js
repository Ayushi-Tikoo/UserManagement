import React, { useEffect } from 'react';
import UserItem from './UserItem';
import { getUsers } from '../redux/actions/users';
import { connect } from 'react-redux';
import Loader from './loader';

const ViewUsers = ({ getUsers, users, loading }) => {
  useEffect(() => {
    getUsers();
  }, []);
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div style={{ overflowX: 'scroll' }}>
          <table className='table'>
            <thead>
              <tr>
                <th scope='col'>First Name</th>
                <th scope='col'>Last Name</th>
                <th scope='col'>Email</th>
                <th scope='col'>Phone</th>
                <th scope='col'>Code</th>
                <th scope='col'>Image</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {users && users.length > 0 ? (
                users.map((item) => <UserItem key={item.id} item={item} />)
              ) : (
                <h4>No Users found...</h4>
              )}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

const mapStateToProps = (state) => ({
  users: state.usersReducer.users,
  loading: state.usersReducer.loading
});

export default connect(mapStateToProps, { getUsers })(ViewUsers);
