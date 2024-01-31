/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { FC, useState, useEffect } from 'react';
import { KTIcon, toAbsoluteUrl } from '../../../helpers';
import axios from 'axios';
import * as GraphQLQueries from '../../../../app/graphqlQueries/mutationQueries'
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
  avatar?: string;
}

const InviteUsers: FC = () => {
  const [userData, setUserData] = useState < UserData[] > ([]);
  const [newUser, setNewUser] = useState({
    userName: '',
    passWord: '',
    email: '',
    access: '',
    avatar: null as File | null,
  });
  const handleAddMember = async () => {
    try {
      console.log('Start handleAddMember');

      const formData = new FormData();
      formData.append('avatar', newUser.avatar || '');

      console.log('Uploading avatar...');


      const userResponse = await axios.post(`${process.env.REACT_APP_BASE_URL}`, {
        query: GraphQLQueries.INSERT_USER_MUTATION,
        variables: {
          created_by: '',
          deleted_by: '',
          email: newUser.email,
          encryption_key: '',
          modified_by: '',
          password: newUser.passWord,
          person_access: newUser.access,
          user: newUser.userName,
        },
      },
        {
          headers: {
            'x-hasura-access-key': process.env.REACT_APP_ADMIN_SECRET_KEY || '',
          },
        }
      );

      console.log('User response:', userResponse.data);

      const result = userResponse.data?.data?.insert_user;

      if (!result || result.affected_rows === 0 || !result.returning || result.returning.length === 0) {
        console.error('Insert user operation failed or returned invalid data');
        return;
      }

      console.log('User added successfully:', result.returning[0]);

      setUserData((prevUserData) => [...prevUserData, result.returning[0]]);

      setNewUser({
        userName: '',
        passWord: '',
        email: '',
        access: '',
        avatar: null,
      });

      console.log('End handleAddMember');
    } catch (error) {
      console.error('Error adding user:', error);
    }
  };




  return (
    <div className='modal fade' id='kt_modal_invite_friends' aria-hidden='true'>
      <div className='add-site-setting'>

        <div className='modal-dialog mw-650px'>
          <div className='modal-content'>
            <div className='modal-header pb-0 border-0 justify-content-end'>
              <div className='btn btn-sm btn-icon btn-active-color-primary' data-bs-dismiss='modal'>
                <KTIcon iconName='cross' className='fs-1' />
              </div>
            </div>
            <div className='modal-body scroll-y mx-5 mx-xl-18 pt-0 pb-15'>
              <div className='text-center mb-8'>
                <h1 className='mb-3'>Invite a Friend</h1>

                <div className='text-muted fw-bold fs-5'>
                  If you need more info, please check out
                  <a href='#' className='link-primary fw-bolder'>
                    {' '}
                    FAQ Page
                  </a>
                  .
                </div>
              </div>

              <div className='btn btn-light-primary fw-bolder w-100 mb-8'>
                <img
                  alt='Logo'
                  src={toAbsoluteUrl('/media/svg/brand-logos/google-icon.svg')}
                  className='h-20px me-3'
                />
                Invite Gmail Contacts
              </div>

              <div className='separator d-flex flex-center mb-5'>
                <span className='text-uppercase bg-body fs-7 fw-bold text-muted px-3'>or</span>
              </div>

              <textarea
                className='form-control form-control-solid mb-5 border border-dark'
                rows={3}
                placeholder='Type or paste emails here'
                value={newUser.email}
                onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}

              ></textarea>

              <div className='mb-5'>

                <div className='mh-300px scroll-y me-n7 pe-7'>
                  {userData.map((user) => (
                    <div
                      className='d-flex flex-stack py-4 border-bottom border-gray-300 border-bottom-dashed'
                      key={user.id}
                    >
                      <div className='d-flex align-items-center'>
                        <div className='symbol symbol-35px symbol-circle'>
                          {user.avatar ? (
                            <img alt='Pic' src={toAbsoluteUrl(user.avatar)} />
                          ) : (
                            <div className={`symbol-label bg-light fw-bold text-uppercase`}>
                              {user.user.charAt(0).toUpperCase()}
                            </div>
                          )}
                        </div>

                        <div className='ms-5'>
                          <a
                            href='#'
                            className='fs-5 fw-bolder text-gray-900 text-hover-primary mb-2'
                          >
                            {user.user}
                          </a>
                          <div className='fw-bold text-muted'>{user.email}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className='mb-4'>
                <div className='mb-5'>
                  <input
                    type='text'
                    className='form-control form-control-solid  border border-dark text-center'
                    placeholder='User Name'
                    value={newUser.userName}
                    onChange={(e) => setNewUser({ ...newUser, userName: e.target.value })}
                  />
                </div>
                <div className='mb-5'>
                  <input
                    type='text'
                    className='form-control form-control-solid border border-dark text-center'
                    placeholder='Password'
                    value={newUser.passWord}
                    onChange={(e) => setNewUser({ ...newUser, passWord: e.target.value })}
                  />
                </div>
                <div className='mb-5'>
                  <input
                    type='text'
                    className='form-control form-control-solid border border-dark text-center'
                    placeholder='Role here'
                    value={newUser.access}
                    onChange={(e) => setNewUser({ ...newUser, access: e.target.value })}
                  />
                </div>


                <div className='modal-footer mb-3'>
                  <button className='btn btn-primary' onClick={handleAddMember}>
                    Send Invitation
                  </button>
                </div>
              </div>

              <div className='d-flex flex-stack'>
                <div className='me-5 fw-bold'>
                  <label className='fs-6'>Adding Users by Team Members</label>

                </div>

                <label className='form-check form-switch form-check-custom form-check-solid'>
                  <input className='form-check-input' type='checkbox' value='1' />

                  <span className='form-check-label fw-bold text-muted '>Allowed</span>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export { InviteUsers };
