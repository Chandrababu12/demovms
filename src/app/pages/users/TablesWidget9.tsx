import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { KTIcon } from '../../../_metronic/helpers';
import * as GraphQLQueries from '../../graphqlQueries/mutationQueries'
//import UsersPage  from '../../../app/modules/apps/user-management/UsersPage'



type Props = {
  className: string;
};

interface UserData {
  id: string;
  created_by: string;
  deleted_by: string;
  email: string;
  encryption_key: string;
  modified_by: string;
  password: string;
  user: string;
  created_on: string;
  deleted_on: string;
  modified_on: string;
  person_access: string;
  active: boolean;
}

interface UserDataWithVisibility extends UserData {
  showPassword: boolean;
}


interface EditUserFormData {
  id: string;
  username: string;
  email: string;
  password: string;
  person_access: string;
  active: boolean;
}

const TablesWidget9: React.FC<Props> = ({ className }) => {
  const [userData, setUserData] = useState < UserDataWithVisibility[] > ([]);
  const [selectedRows, setSelectedRows] = useState < string[] > ([]);
  const [selectAll, setSelectAll] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showPassword, setShowPassword] = useState(false);


  const hasuraAccessKey = process.env.REACT_APP_ADMIN_SECRET_KEY;

  const [editFormData, setEditFormData] = useState < EditUserFormData > ({
    id: '',
    username: '',
    email: '',
    password: '',
    person_access: '',
    active: true || false,
  });

  useEffect(() => {

    if (!hasuraAccessKey) {
      console.error('REACT_APP_ADMIN_SECRET_KEY is undefined');
      return; // Handle the case where the key is undefined
    }
    const fetchUserData = async () => {
      try {
        const response = await axios.post(`${process.env.REACT_APP_BASE_URL}`, {
          query: GraphQLQueries.GET_USER_QUERY
        },
          {
            headers: {
              'x-hasura-access-key': hasuraAccessKey,
            },
          });

        const fetchedUserData = response.data.data.user.map((user: UserData) => ({
          ...user,
        }));

        setUserData(fetchedUserData);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
    const intervalId = setInterval(() => {
      fetchUserData();
    }, 60000);

    // Clear the interval when the component is unmounted
    return () => clearInterval(intervalId);
  }, [hasuraAccessKey, editFormData]);

  const handleEditClick = (user: UserData) => {
    setEditFormData({
      id: user.id,
      username: user.user,
      email: user.email,
      password: user.password,
      person_access: user.person_access,
      active: user.active
    });
    setShowEditModal(true);
  };

  const handleEditSubmit = async () => {
    try {
      if (!hasuraAccessKey) {
        console.error('REACT_APP_ADMIN_SECRET_KEY is undefined');
        return;
      }

      const { id, username, email, password, person_access, active } = editFormData;

      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}`, // Replace with your actual GraphQL endpoint
        {
          query: GraphQLQueries.UPDATE_USER_MUTATION,
          variables: {
            id,
            userInput: {
              user: username,
              email,
              password,
              person_access,
              active,
            },
          },
        },
        {
          headers: {
            'x-hasura-access-key': hasuraAccessKey,
          },
        }
      );

      const responseData = response.data;

      if (!responseData || !responseData.data || !responseData.data.update_user) {
        console.error('Update operation failed or returned invalid data');
        return;
      }

      // Handle success here, for example, show a success message
      console.log('User updated successfully', responseData.data.update_user);

      // Additional logic if needed

      // Reset the form data and close the modal
      setEditFormData({
        id: '',
        username: '',
        email: '',
        password: '',
        person_access: '',
        active: true || false,
      });
      setShowEditModal(false);
    } catch (error) {
      console.error('Error updating user data:', error);
    }
  };

  const handleTogglePasswordVisibility = (userId: string) => {
    setUserData(prevUserData => {
      const updatedUserData = prevUserData.map(user =>
        user.id === userId ? { ...user, showPassword: !user.showPassword } : user
      );
      return updatedUserData;
    });
  };

  

  const handleDeleteUser = async (userId: string) => {
    try {

      const response = await axios.post(
        process.env.REACT_APP_BASE_URL || '',
        {
          query: GraphQLQueries.DELETE_USER_MUTATION,
          variables: {
            user_id: userId,
          },
        },
        {
          headers: {
            'x-hasura-access-key': process.env.REACT_APP_ADMIN_SECRET_KEY || '',
          },
        }
      );

      if (response.data.data.delete_user.affected_rows > 0) {
        // Update the userData state to reflect the deletion
        setUserData(prevUserData =>
          prevUserData.filter(user => user.id !== userId)
        );
        console.log('User deleted successfully');
      } else {
        console.error('Delete operation failed or returned invalid data');
      }
    } catch (error) {
      console.error('Error deleting user:', error);

    }
  };

  const handleSelectAll = () => {
    setSelectAll(!selectAll);
    const allUserIds = userData.map((user) => user.id);
    setSelectedRows(selectAll ? [] : allUserIds);
  };

  const handleSelectRow = (userId: string) => {
    const updatedSelectedRows = selectedRows.includes(userId)
      ? selectedRows.filter((id) => id !== userId)
      : [...selectedRows, userId];

    setSelectedRows(updatedSelectedRows);
  };

  return (
    <div className={`card ${className} `} style={{ backgroundColor: '#0d0d0f', color: 'white' }}>
      <div className='card-header border-0 pt-5'>
        <h3 className='card-title align-items-start flex-column'>
          <span className='card-label fw-bold fs-3 mb-1 text-white'>User Details</span>
          <span className='text-muted mt-1 fw-semibold fs-7 '>{`Total Users: ${userData.length}`}</span>
        </h3>
        <div
          className='card-toolbar'
          data-bs-toggle='tooltip'
          data-bs-placement='top'
          data-bs-trigger='hover'
          title='Click to add a user'
        >
          <button
            type='button'
            className='btn btn-sm btn-grey-primary text-white'
            data-bs-toggle='modal'
            data-bs-target='#kt_modal_invite_friends'
            onClick={() => { }}
          >
            <KTIcon iconName='plus' className='fs-3' />
            New User
          </button>
        </div>
      </div>
      <div className='card-body py-3'>
        <div className='table-responsive'>
          <table className='table table-row-dashed table-row-gray-100 align-middle gs-0 gy-4 text-white ' style={{ color: 'white' }}>
            <thead>
              <tr className='fw-bold text-muted fs-5'>
                <th className='w-25px'>
                  <div className='form-check form-check-sm form-check-custom form-check-solid'>
                    <input
                      className='form-check-input form-check-active-color-primary bg-dark'
                      type='checkbox'
                      checked={selectAll}
                      onChange={handleSelectAll}
                    />
                  </div>
                </th>
                <th className='min-w-150px'>Username</th>
                <th className='min-w-140px'>Email ID</th>
                <th className='min-w-140px'>Role</th>
                <th className='min-w-140px'>Permissions</th>
                <th className='min-w-140px'>Status</th>
                <th className='min-w-100px text-end'>Actions</th>
              </tr>
            </thead>
            <tbody>
              {userData.map((user) => (
                <tr key={user.id}>
                  <td>
                    <div className='form-check form-check-sm form-check-custom form-check-solid'>
                      <input
                        className='form-check-input widget-9-check bg-dark'
                        type='checkbox'
                        checked={selectedRows.includes(user.id)}
                        onChange={() => handleSelectRow(user.id)}
                      />
                    </div>
                  </td>
                  <td>
                    <div className='d-flex align-items-center'>
                      <div className='symbol symbol-35px symbol-circle'>
                        <span className={`symbol-label bg-light fw-bold`}>
                          {user.user.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <div className='d-flex justify-content-start flex-column ms-3'>
                        <span className='text-muted fw-semibold text-muted d-block fs-6'>
                          {user.user}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className='d-flex align-items-center'>
                      <div className='d-flex justify-content-start flex-column'>
                        <span className='text-muted fw-semibold text-muted d-block fs-6'>
                          {user.email}
                        </span>
                      </div>
                    </div>
                    <div className='d-flex align-items-center'>
  <div className='d-flex justify-content-start flex-column'>
 <span className='text-muted fw-semibold text-muted d-block fs-6'>
  {user.showPassword ? user.password : '••••••••'}
</span>


  </div>
  <div className='ms-2 cursor-pointer' onClick={() => handleTogglePasswordVisibility(user.id)}>
    {user.showPassword ? <i className='bi bi-eye'></i> : <i className='bi bi-eye-slash'></i>}
  </div>
</div>
                  </td>
                  <td></td>
                  <td>
                    <div className='d-flex align-items-center'>
                      <div className='d-flex justify-content-start flex-column ms-3'>
                        <span className='text-muted fw-semibold text-muted d-block fs-6'>
                          {user.person_access}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className='d-flex align-items-center'>
                      <div className='d-flex justify-content-start flex-column ms-3'>
                        <span className='text-muted fw-semibold text-muted d-block fs-6'>
                          {user.active ? 'Active' : 'Inactive'}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className='d-flex justify-content-end flex-shrink-0'>
                      <button
                        className='btn btn-icon btn-bg-black btn-active-color-primary btn-sm me-1'
                        onClick={() => handleEditClick(user)}
                        data-bs-toggle='modal'
                        data-bs-target='#editModal'  >
                        <KTIcon iconName='pencil' className='fs-5' />
                      </button>
                      <button
                        type='button'
                        className='btn btn-icon btn-bg-black btn-active-color-primary btn-sm'
                        onClick={() => handleDeleteUser(user.id)}
                      >
                        <KTIcon iconName='trash' className='fs-5' />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
            {/* end::Table body */}
          </table>
          {/* end::Table */}
        </div>
        {/* end::Table container */}
      </div>
      {/* begin::Body */}

      {/* Edit Modal */}
      <div className={`modal fade ${showEditModal ? 'show' : ''}`} id='editModal' tabIndex={-1} role='dialog'>
        <div className='add-site-setting'>
          <div className='modal-dialog modal-dialog-centered' role='document'>
            <div className='modal-content'>
              <div className='modal-header pb-0 border-0 justify-content-end'>
                <div className='btn btn-sm btn-icon btn-active-color-primary' data-bs-dismiss='modal'>
                  <KTIcon iconName='cross' className='fs-1' />
                </div>
              </div>

              <div className='modal-body scroll-y mx-5 mx-xl-18 pt-0 pb-15'>
                <div className='text-center mb-13'>
                  <h5 className='mb-3'>Edit User</h5>
                </div>

                <div className='mb-8'>
                  <div className='form-group'>
                    <label className='font-weight-bold'>Username:</label>
                    <input
                      type='text'
                      value={editFormData.username}
                      onChange={(e) => setEditFormData({ ...editFormData, username: e.target.value })}
                      className='form-control form-control-solid border border-dark'
                    />
                  </div>
                  <br />
                  <div className='form-group'>
                    <label className='font-weight-bold'>Email:</label>
                    <input
                      type='text'
                      value={editFormData.email}
                      onChange={(e) => setEditFormData({ ...editFormData, email: e.target.value })}
                      className='form-control form-control-solid border border-dark'
                    />
                  </div>
                  <br />
                  <div className='form-group'>
                    <label className='font-weight-bold'>Password:</label>
                    <input
                      type='password'
                      value={editFormData.password}
                      onChange={(e) => setEditFormData({ ...editFormData, password: e.target.value })}
                      className='form-control form-control-solid border border-dark '
                    />
                  </div>

                  <br />
                  <div className='form-group'>
                    <label className='font-weight-bold'>Permission</label>
                    <input
                      type='text'
                      value={editFormData.person_access}
                      onChange={(e) => setEditFormData({ ...editFormData, person_access: e.target.value })}
                      className='form-control form-control-solid border border-dark '
                    />
                  </div>
                  <br />
                  <div className='form-group'>
                    <label className='font-weight-bold'>Status</label>
                    <select

                      value={editFormData.active.toString()}
                      onChange={(e) => setEditFormData({ ...editFormData, active: e.target.value === 'true' })}
                      className='form-control form-control-solid border border-dark'
                    >
                      <option value='true'>True</option>
                      <option value='false'>False</option>
                    </select>
                  </div>
                </div>

                <div className='modal-footer'>
                  <button type='button' className='btn btn-light-primary font-weight-bold' data-bs-dismiss='modal' onClick={handleEditSubmit}>
                    Save changes
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>



  );

};

export { TablesWidget9 };
