import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../../../app/modules/auth';
import Popover from '@material-ui/core/Popover';
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'
import '../../../../_metronic/assets/sass/core/base/functions/_theme-colors.scss';
import * as GraphQLQueries from '../../../../app/graphqlQueries/mutationQueries';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Modal } from 'react-bootstrap';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';

interface EditUserFormData {
  id: string;
  username: string;

}

interface UserData {
  id: string;
  user: string;
  active: boolean;
  email: string;
  created_on: string;
}

const Navbar = () => {
  const [userData, setUserData] = useState < any | null > (null);
  const { currentUser } = useAuth();
  const [showEditModal, setShowEditModal] = useState(false);
  const navigate = useNavigate();
  const [editFormData, setEditFormData] = useState < EditUserFormData > ({
    id: '',
    username: '',

  });

  const [passwordError, setPasswordError] = useState < string > ('');


  const handleLogout = () => {
    // Redirect to the recording page when the camera icon is clicked
    navigate('/auth/login')
  }


  const handleEditClick = () => {
    setShowEditModal(true);

    if (currentUser) {
      setEditFormData({
        id: String(currentUser.id),
        username: currentUser.user,

      });
    }
  };

  const handleEditModalClose = () => {
    setShowEditModal(false);
  };

  const handleEditSubmit = async () => {
    try {
      const { id, username, } = editFormData;

      // // Check if the new password and confirm password match
      // if (editFormData.password !== editFormData.confirmPassword) {
      //   setPasswordError('New password and confirm password do not match');
      //   return;
      // }

      // Clear previous password error
      setPasswordError('');

      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}`,
        {
          query: GraphQLQueries.UPDATE_USER_MUTATION,
          variables: {
            id,
            userInput: {
              user: username,

            },
          },
        },
        {
          headers: {
            'x-hasura-access-key': process.env.REACT_APP_ADMIN_SECRET_KEY || '',
          },
        }
      );

      const responseData = response.data;

      if (!responseData || !responseData.data || !responseData.data.update_user) {
        console.error('Update operation failed or returned invalid data');

        return;
      }

      console.log('User updated successfully', responseData.data.update_user);

      setUserData((prevUserData: UserData[] | null) => {
        if (prevUserData) {
          const updatedUserData = prevUserData.map((user) =>
            user.id === id ? { ...user, user: username, } : user
          );
          return updatedUserData;
        }
        return null;
      });

      setEditFormData({
        id: '',
        username: '',

      });
      setShowEditModal(false);
    } catch (error) {
      console.error('Error updating user data:', error);
    }
  };


  // const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setEditFormData((prevData) => ({ ...prevData, confirmPassword: e.target.value }));
  // };

  // const handleForgetPasswordClick = () => {
  //   setShowForgetPasswordModal(true);
  // };

  // const handleForgetPasswordModalClose = () => {
  //   setShowForgetPasswordModal(false);
  // };



  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.post(`${process.env.REACT_APP_BASE_URL}`, {
          query: GraphQLQueries.GET_USER_QUERY
        },
          {
            headers: {
              'x-hasura-access-key': process.env.REACT_APP_ADMIN_SECRET_KEY || '',
            },
          });

        const fetchedUserData: any[] | undefined = response.data?.data?.user;
        if (fetchedUserData) {
          const formattedUserData = fetchedUserData.map(user => ({
            ...user,
            created_on: new Date(user.created_on),
          }));

          setUserData(formattedUserData);
        } else {
          console.error('No user data found.');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
    const intervalId = setInterval(() => {
      fetchUserData();
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const getInitials = (user: string) => {
    if (!user) return '';

    const initials = user.split(' ').map((word) => word[0]).join('');

    return initials.toUpperCase();
  };

  return (
    <div className='app-navbar flex-shrink-0'>
      <div className='right-side-nav d-flex align-items-center gap-4 mt-10'>
        <div className='notification'>
          <span className='alert-icon'>
            <img src="media/surveillances/notification.svg" alt="" />
          </span>
        </div>
        <div className='profile-user-details'>
          <PopupState variant="popover" popupId="demo-popup-popover">
            {popupState => (
              <div>
                <div {...bindTrigger(popupState)}>
                  <div className='profile'>
                    {currentUser ? (
                      <div className='avatar-container '>
                        {getInitials(currentUser.user)}
                        <br />
                        {userData && userData[0].active && <div className='dot' />}
                      </div>
                    ) : (
                      <img src="media/surveillances/profile.svg" alt="" />
                    )}
                  </div>
                </div>
                <Popover
                  {...bindPopover(popupState)}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                  }}
                  className='user-details-popover'
                >
                  <div className='dropdown-profile-user-details'>
                    <div className='profile-header d-flex align-items-center gap-2'>
                      <div className='user-img'>
                        <div className='profile'>
                          {currentUser ? (
                            <div className='avatar-container'>
                              {getInitials(currentUser.user)}
                              {userData && userData[0].active && <div className='dot' />}
                            </div>
                          ) : (
                            <img src="media/surveillances/profile.svg" alt="" />
                          )}
                        </div>
                      </div>
                      <div className='user-details'>
                        <div className='user-details'>
                          <div className='name pb-1 text-uppercase '>{currentUser ? currentUser.user : 'Loading...'}</div>
                          <div className='mail '>{currentUser ? currentUser.email : 'Loading...'}</div>
                        </div>
                      </div>
                    </div>
                    <div className='profile-content'>
                      <div className='d-flex py-1  align-items-center justify-content-between'>
                        <span className='edit-name ' onClick={handleEditClick}>

                          Profile</span>{' '}
                        <span className='icon'>
                          <AccountCircleOutlinedIcon /></span>
                      </div>


                    </div>
                    <div className='profile-setting'>


                      < Language />

                      <Mode />

                      {/*<div className='d-flex py-2 align-items-center justify-content-between' >
                        <div className='edit-name' onClick={() => handleLightModeClick} title="Light">
                          Light <Brightness4Icon />
                        </div>
                        <div className='edit-name' onClick={() => handleDarkModeClick} title="Light">
                          Dark<Brightness7Icon />
                        </div>
                        <div className='edit-name' onClick={() => handleSystemModeClick} title="Light">
                          System<SettingsBrightnessIcon />
                        </div> */}




                      <div className='d-flex py-1  align-items-center justify-content-between' onClick={handleLogout}>
                        <span className='edit-name'> Sign out </span> <span className='icon'> <img src="./media/vms/solar_logout-outline.svg" alt="icon" /> </span>
                      </div>
                    </div>
                  </div>
                </Popover>
              </div>
            )}
          </PopupState>
        </div>
      </div >

      <Modal show={showEditModal} centered className='add-site-setting'>
        <Modal.Header closeButton onClick={handleEditModalClose}>
          <Modal.Title> User Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className='row'>
            {/* Left side: Avatar and Username */}
            <div className='col-md-3'>
              <div className='mb-7 d-flex flex-column align-items-center'>
                <div className='profile'>
                  {currentUser ? (
                    <div className='avatar-container ' style={{ width: '64px', height: '64px' }}>
                      {getInitials(currentUser.user)}
                      {userData && userData[0].active && <div className='dot' />}
                    </div>
                  ) : (
                    <img src="media/surveillances/profile.svg" alt="" />
                  )}
                </div>
                <br />

                <div className='user-details text-white'>
                  <div className='name pb-1 text-uppercase '>{currentUser ? currentUser.user : 'Loading...'}</div>
                </div>
              </div>
            </div>

            {/* Right side: Email and Created on Date */}
            <div className='col-md-9'>
              <div className='mb-7'>
                <div className='text-muted fs-5'>{currentUser ? currentUser.email : 'Loading...'}</div>
                <br />
                <div className='text-muted fs-5'>Created on: {currentUser ? (currentUser.created_on) : 'Loading...'}</div>
              </div>

              <div className='mb-7'>
                {/* Edit Username Input */}
                <FloatingLabel label="Edit Username">
                  <Form.Control
                    className='form-control'
                    id='floatingInput'
                    value={editFormData.username}
                    onChange={(e) => setEditFormData({ ...editFormData, username: e.target.value })}
                  />
                </FloatingLabel>
              </div>

              <div className='mb-7'>
                {/* ... (other form fields) */}
              </div>

              {passwordError && <div className="text-danger">{passwordError}</div>}
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button type='button' className='btn add me-5' onClick={handleEditSubmit}>
            Update
          </button>
        </Modal.Footer>
      </Modal>



      {/* <Modal show={showForgetPasswordModal} centered className='add-site-setting'>
        <Modal.Header closeButton onClick={handleForgetPasswordModalClose}>
          <Modal.Title>Change Password</Modal.Title>
        </Modal.Header>
        <Modal.Body>

          <div className='mb-7'>
            <FloatingLabel label="New Password">
              <Form.Control
                type='password'
                className='form-control'
                placeholder='New Password'
                id='floatingNewPasswordInput'
                value={editFormData.password}
                onChange={(e) => setEditFormData({ ...editFormData, password: e.target.value })}
              />
            </FloatingLabel>
          </div>

          <div className='mb-7'>
            <FloatingLabel label="Confirm Password">
              <Form.Control
                type='password'
                className='form-control'
                placeholder='Confirm Password'
                id='floatingConfirmPasswordInput'
                value={editFormData.password}
                onChange={(e) => setEditFormData({ ...editFormData, password: e.target.value })}
              />
            </FloatingLabel>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button type='button' className='btn add me-5' onClick={handleEditSubmit}>
            Submit
          </button>
        </Modal.Footer>
      </Modal> */}
    </div >
  );
};

export { Navbar };



// export function Profileavatar() {

//   <PopupState variant="popover" popupId="demo-popup-popover">
//     {popupState => (
//       <div>
//         <Button variant="contained" {...bindTrigger(popupState)}>
//           Open Popover
//         </Button>
//         <Popover
//           {...bindPopover(popupState)}
//           anchorOrigin={{

//             vertical: 'bottom',
//             horizontal: 'center',
//           }}
//           transformOrigin={{
//             vertical: 'top',
//             horizontal: 'center',
//           }}
//         >
//           <Typography>The content of the Popover.</Typography>
//         </Popover>
//       </div>
//     )}
//   </PopupState>
// }


export function Mode() {
  const [anchorEl, setAnchorEl] = useState < null | HTMLElement > (null);
  const [themeMode, setThemeMode] = useState < 'light' | 'dark' | 'system' > ('light');

  const lightModeColor = '#ffffff'; // Replace with your actual light mode color
  const darkModeColor = '#121212';

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleModeChange = (mode: 'light' | 'dark' | 'system') => {
    setThemeMode(mode);
    handleClose();

    // Apply styles based on the selected theme mode
    const rootElement = document.documentElement;
    rootElement.setAttribute('data-theme', mode);
  };

  return (
    <div className='theme-mode'>
      <div className='d-flex py-2 align-items-center justify-content-between'>
        <span className='edit-name' aria-controls="mode-popover" aria-haspopup="true" onClick={handleClick}>
          Mode
        </span>
      </div>
      <Menu
        id="mode-popover"
        className='theme-mode'
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={() => handleModeChange('light')}>
          {/* Light Mode */}
          <div className='d-flex py-1 align-items-center justify-content-between'>
            <span className='edit-name' style={{ color: lightModeColor }}>
              Light
            </span>
            <span className='icon'>
              <img src='./media/vms/sunset.png' alt='icon' />
            </span>
          </div>
        </MenuItem>
        <MenuItem onClick={() => handleModeChange('dark')}>
          {/* Dark Mode */}
          <div className='d-flex py-1 align-items-center justify-content-between'>
            <span className='edit-name'>Dark</span>
            <span className='icon'>
              <img src='./media/vms/moon.png' alt='icon' />
            </span>
          </div>
        </MenuItem>
        <MenuItem onClick={() => handleModeChange('system')}>
          {/* System Mode */}
          <div className='d-flex py-1 align-items-center justify-content-between'>
            <span className='edit-name'>System</span>
            <span className='icon'>
              {/* You can customize the icon for the system mode */}
              <AccountCircleOutlinedIcon />
            </span>
          </div>
        </MenuItem>
      </Menu>
    </div>
  );
}

export function Language() {
  const [anchorEl, setAnchorEl] = React.useState < null | HTMLElement > (null);

  function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
    setAnchorEl(event.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null);
  }

  return (
    <div className='theme-mode'>
      <div className='d-flex py-1  align-items-center justify-content-between'>
        <span className='edit-name' aria-haspopup="true" onClick={handleClick}> Language </span>   <span className='icon'>
          <img src='./media/vms/united-states-of-america.png' alt='icon' /> </span>
      </div>
      <Menu
        id="mode-popover"
        className='theme-mode'
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>
          <div className='d-flex py-1  align-items-center justify-content-between'>
            <span className='edit-name'>
              Australia</span>
            <span className='icon'>
              <img src='./media/vms/australia.png' alt='icon' /> </span>
          </div>
        </MenuItem>
        <MenuItem onClick={handleClose}>

          <div className='d-flex py-1  align-items-center justify-content-between'>
            <span className='edit-name'>
              Germany </span>
            <span className='icon'>
              <img src='./media/vms/flag2.png' alt='icon' /> </span>
          </div>
        </MenuItem>

        <MenuItem onClick={handleClose}>

          <div className='d-flex py-1  align-items-center justify-content-between'>
            <span className='edit-name'>
              Canada</span>
            <span className='icon'>
              <img src='./media/vms/flag.png' alt='icon' /> </span>
          </div>
        </MenuItem>


        <MenuItem onClick={handleClose}>

          <div className='d-flex py-1  align-items-center justify-content-between'>
            <span className='edit-name'>
              America </span>
            <span className='icon'>
              <img src='./media/vms/united-states-of-america.png' alt='icon' /> </span>
          </div>
        </MenuItem>

      </Menu>
    </div>
  );
}