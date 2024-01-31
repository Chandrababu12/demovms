import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { KTIcon } from '../../../_metronic/helpers';
import { Modal } from 'react-bootstrap';
import * as GraphQLQueries from '../../graphqlQueries/mutationQueries';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Server } from 'net';
type Props = {
  className: string;
};
interface SiteData {
  id: string;
  name: string;
  created_by: string;
  deleted_by: string;
  description: string;
  deleted: boolean;
  created_on: string;
  deleted_on: string;
  modified_by: string;
  modified_on: string;
  site_id: string;
  device_id: string;

}
interface ServerData {
  id: string;
  created_by: string;
  deleted_by: string;
  username: string;
  password: string;
  status: boolean;
  ip_address: string;
  description: string;
  deleted: boolean;
  created_on: string;
  deleted_on: string;
  modified_by: string;
  modified_on: string;
  site_id: string;
  device_id: string;
  site: {
    id: string;
    name: string;
  }
}


interface FormData {
  id: string;
  ip_address: string;
  username: string;
  password: string;
  currentPassword:string;
  site_id: string;
  deleted: boolean;
}

const TablesWidget9: React.FC<Props> = ({ className }) => {
  const [serverData, setServerData] = useState < ServerData[] > ([]);
  const [siteData, setSiteData] = useState < SiteData[] > ([]);
  const [selectedRows, setSelectedRows] = useState < string[] > ([]);
  const [selectAll, setSelectAll] = useState(false);
  const hasuraAccessKey = process.env.REACT_APP_ADMIN_SECRET_KEY;
  const [newServer, setNewServer] = useState < FormData > ({
    id: '',
    ip_address: '',
    username: '',
    password: '',
    currentPassword:'',
    site_id: '',
    deleted: false,
  });
  const [addServer, setAddServer] = useState < FormData > ({
    id: '',
    ip_address: '',
    username: '',
    password: '',
    currentPassword:'',
    site_id: '',
    deleted: false,
  });
  const [showAddSiteForm, setShowAddSiteForm] = useState(false);
  const [showConnectForm, setShowConnectForm] = useState(false);
  const [showDisconnectForm, setShowDisconnectForm] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pingMessage, setPingMessage] = useState('');

  useEffect(() => {
    if (!hasuraAccessKey) {
      console.error('REACT_APP_ADMIN_SECRET_KEY is undefined');
      return; // Handle the case where the key is undefined
    }

    const fetchSiteData = async () => {
      try {
        const siteResponse = await axios.post(
          `${process.env.REACT_APP_BASE_URL}`,
          {
            query: GraphQLQueries.GET_SITE_QUERY,
          },
          {
            headers: {
              'x-hasura-access-key': hasuraAccessKey,
            },
          });

        const fetchedSiteData = siteResponse.data.data.site.map((device: SiteData) => ({
          ...device,
          showPassword: false,
        }));

        setSiteData(fetchedSiteData);
      } catch (error) {
        console.error('Error fetching device data:', error);
      }
    };

    fetchSiteData();
    const intervalId = setInterval(() => {
      fetchSiteData();
    }, 2000);

    // Clear the interval when the component is unmounted
    return () => clearInterval(intervalId);
  }, [hasuraAccessKey]);

  useEffect(() => {
    if (!hasuraAccessKey) {
      console.error('REACT_APP_ADMIN_SECRET_KEY is undefined');
      return; // Handle the case where the key is undefined
    }

    const fetchServerData = async () => {
      try {
        const serverResponse = await axios.post(
          `${process.env.REACT_APP_BASE_URL}`,
          {
            query: GraphQLQueries.GET_SERVER_QUERY,
          },
          {
            headers: {
              'x-hasura-access-key': hasuraAccessKey,
            },
          });

        const fetchedServerData = serverResponse.data.data.server.map((device: ServerData) => ({
          ...device,
          showPassword: false,
        }));

        setServerData(fetchedServerData);
      } catch (error) {
        console.error('Error fetching device data:', error);
      }
    };

    fetchServerData();
    const intervalId = setInterval(() => {
      fetchServerData();
    }, 20000);

    // Clear the interval when the component is unmounted
    return () => clearInterval(intervalId);
  }, [hasuraAccessKey]);


  const handleSelectAll = () => {
    setSelectAll(!selectAll);
    const allSiteIds = serverData.map((server) => server.id);
    setSelectedRows(selectAll ? [] : allSiteIds);
  };

  const handleSelectRow = (siteId: string) => {
    const updatedSelectedRows = selectedRows.includes(siteId)
      ? selectedRows.filter((id) => id !== siteId)
      : [...selectedRows, siteId];

    setSelectedRows(updatedSelectedRows);
  };


  const openAddSiteModal = () => {
    setShowAddSiteForm(true);
  };

  // Function to handle closing the "Add Site" modal
  const closeAddSiteModal = () => {
    setShowAddSiteForm(false);
  };

  const closeConnectModal = () => {
    setShowConnectForm(false);
  };

  const closeDisconnectModal = () => {
    setShowDisconnectForm(false);

  };
  const handleAddServer = async () => {
    try {
      // Ensure that required fields are not empty
      if (!addServer.ip_address || !addServer.username || !addServer.password || !addServer.site_id) {
        console.error('Please fill in all required fields.');
        return;
      }

      // Prepare variables for the mutation with default values
      const variables = {
        ip_address: addServer.ip_address,
        username: addServer.username,
        password: addServer.password,
        site_id: addServer.site_id,
        status: true,
        created_by: '', // Provide appropriate default value
        modified_by: '', // Provide appropriate default value
        deleted_by: '', // Provide appropriate default value
        deleted: false, // Provide appropriate default value
      };

      // Send the mutation request
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}`,
        {
          query: GraphQLQueries.INSERT_SERVER_MUTATION,
          variables,
        },
        {
          headers: {
            'x-hasura-access-key': process.env.REACT_APP_ADMIN_SECRET_KEY || '',
          },
        }
      );

      // Log the response data
      console.log('Mutation response:', response.data);

      // Reset the new site form and hide the form
      setAddServer({
        id: '',
        ip_address: '',
        username: '',
        password: '',
        currentPassword:'',
        site_id: '',
        deleted: false,
      });
      setShowAddSiteForm(false);

      console.log('Added server:', response.data.data.insert_server.returning[0]);
    } catch (error) {
      console.error('Error adding server:', error);
    }
  };
  const handlePingClick = async (serverId:string) => {
    try {
      const response = await fetch('http://192.168.1.20:3000/ping_server', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          server_info: [
            {
              ip_address: serverId
            }
          ]
        })
      });

      const data = await response.json();

      if (response.ok) {
        setPingMessage(data.message);
      } else {
        setPingMessage(`Error: ${data.message}`);
      }
    } catch (error:any) {
      console.error('Error:', error.message);
      setPingMessage('Error occurred while making the request.');
    }
  };


  const handleClick = (server: ServerData, isTrashIcon: boolean, isConnectButton: boolean, isDisconnectButton: boolean) => {
    setNewServer({
      ...server,
      username: '',
      password: '',
      currentPassword:'',
    });

    if (isTrashIcon) {
      setShowEditModal(false);
      setShowDeleteModal(true);
      setShowConnectForm(false);
      setShowDisconnectForm(false);
    } else if (isConnectButton) {
      setShowConnectForm(true);
      setShowDisconnectForm(false);
      setShowEditModal(false);
      setShowDeleteModal(false);
    } else if (isDisconnectButton) {
      setShowConnectForm(false);
      setShowDisconnectForm(true);
      setShowEditModal(false);
      setShowDeleteModal(false);
    } else {
      setShowEditModal(true);
      setShowDeleteModal(false);
      setShowConnectForm(false);
      setShowDisconnectForm(false);
    }
  };



  const handleEditSubmit = async () => {
    try {
      if (!hasuraAccessKey) {
        console.error('REACT_APP_ADMIN_SECRET_KEY is undefined');
        return;
      }

      // Fetch the server data to check if the provided username and old password are correct
      const existingServer = await axios.post(
        `${process.env.REACT_APP_BASE_URL}`,
        {
          query: GraphQLQueries.GET_SERVERID_QUERY,
          variables: { id: parseInt(newServer.id) },
        },
        {
          headers: {
            'x-hasura-access-key': hasuraAccessKey,
          },
        }
      );

      const existingServerData = existingServer.data;
      console.log("exist:",existingServerData);

      if (!existingServerData || !existingServerData.data) {
        console.error('Error fetching server data:', existingServerData.errors);
        return;
      }
      const existingServerInfo = existingServerData.data.server_by_pk;
console.log(existingServerData.data.server_by_pk);
      if (!existingServerInfo || existingServerInfo.deleted) {
        console.error('Server not found or has been deleted');
        return;
      }
      

      const existingUsername = existingServerData.data.server_by_pk.username;
      const existingPassword = existingServerData.data.server_by_pk.password;
      // Check if the provided username and old password match the existing ones
      if (existingUsername === newServer.username && existingPassword === newServer.currentPassword) {
        setError(null);  // Reset error if the login is successful
      } else {
        setError('Username or Current password is incorrect');
        return;
      }
      const newPassword = newServer.password ? newServer.password : newServer.currentPassword;

      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}`,
        {
          query: GraphQLQueries.UPDATE_SERVER_MUTATION,
          variables: {
            id: newServer.id,
            ip_address: newServer.ip_address,
            status: true,
            username: newServer.username,
            password: newPassword,
            site_id: newServer.site_id,
            created_by: '',
            modified_by: '',
            deleted_by: '',
            deleted: false,
          },
        },
        {
          headers: {
            'x-hasura-access-key': hasuraAccessKey,
          },
        }
      );

      const responseData = response.data;

      console.log('Update Server Response:', responseData);

      if (!responseData || !responseData.data || !responseData.data.update_server) {
        console.error('Update operation failed or returned invalid data');
        return;
      }

      console.log('Server updated successfully', responseData.data.update_server);

      setNewServer({
        id: '',
        ip_address: '',
        username: '',
        password: '',
        currentPassword: '',
        site_id: '',
        deleted: false,
      });
console.log('updateddata:',newServer)
      setShowEditModal(false);
    } catch (error) {
      console.error('Error updating server data:', error);
      setError('An error occurred while updating server data' as string | null);
    }
  
  };
  
  const handleDeleteSubmit = async () => {
    try {
      // Perform the server deletion
      const response = await axios.post(
        process.env.REACT_APP_BASE_URL || '',
        {
          query: GraphQLQueries.DELETE_SERVER_MUTATION,
          variables: { id: parseInt(newServer.id) }, // Parse id to Int
        },
        {
          headers: {
            'x-hasura-access-key': process.env.REACT_APP_ADMIN_SECRET_KEY || '',
          },
        }
      );

      const responseData = response.data.data;

      if (!responseData || !responseData.delete_server_by_pk) {
        console.error('Delete operation failed or returned invalid data:', response.data);
        return;
      }

      if (responseData.delete_server_by_pk.id) {
        // Server deleted successfully, handle any additional logic
        console.log('Server deleted successfully:', responseData.delete_server_by_pk);
        setShowDeleteModal(false);
      } else {
        console.error('Delete operation did not affect any rows:', response.data);
      }

      // Close the modal or perform any other necessary actions
    } catch (error) {
      console.error('Error deleting server:', error);
    }
  };


  return (
    <div className={`card ${className} `} style={{ backgroundColor: '#0d0d0f', color: 'white' }}>
      {/* begin::Header */}
      {/* <UsersPage/> */}
      <div className='card-header border-0 pt-5'>
        <h3 className='card-title align-items-start flex-column'>
          <span className='card-label fw-bold fs-3 mb-1 text-light'>REGISTERED SERVER</span>
          <span className='text-muted mt-1 fw-semibold fs-7'>{`Total Server: ${serverData.length}`}</span>
        </h3>
        <div
          className='card-toolbar'
          data-bs-toggle='tooltip'
          data-bs-placement='top'
          data-bs-trigger='hover'
          title='Click to Register Server'
        >
          <button
            type='button'
            className='btn btn-sm btn-grey-primary text-white'
            onClick={openAddSiteModal}>
            <KTIcon iconName='plus' className='fs-3' />
            Register Server
          </button>
          {/* <a className="btn btn-sm fw-bold btn-primary"
        data-bs-toggle='modal'
        data-bs-target='#kt_modal_create_app'
        >Create User</a> */}
        </div>
      </div>
      <div className='card-body py-3'>
        <div className='table-responsive'>
          <table className='table table-row-dashed table-row-gray-100 align-middle gs-0 gy-4'>
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
                <th className='min-w-10px'>Server IP</th>
                <th className='min-w-150px'>Site Name</th>
                <th className='min-w-150px'>Status</th>
                <th className='min-w-150px'>Connection</th>
                <th className='min-w-150px'>Actions</th>


              </tr>
            </thead>
            <tbody>
              {serverData.map((server) => (
                <tr key={server.id}>
                  <td>
                    <div className='form-check form-check-sm form-check-custom form-check-solid '>
                      <input
                        className='form-check-input widget-9-check bg-dark'
                        type='checkbox'
                        checked={selectedRows.includes(server.id)}
                        onChange={() => handleSelectRow(server.id)}
                      />
                    </div>
                  </td>
                  <td>
                    <div className='d-flex align-items-center'>
                      <div className='d-flex justify-content-start flex-column ms-3'>
                        <span className='text-muted fw-semibold text-muted d-block fs-6'>
                          {server.ip_address}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className='d-flex align-items-center'>
                      <div className='d-flex justify-content-start flex-column ms-3'>
                        <span className='text-muted fw-semibold text-muted d-block fs-6'>
                          {server.site?.name.charAt(0).toUpperCase()+ server.site?.name.slice(1)}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className='d-flex align-items-center'>
                      <div className='d-flex justify-content-start flex-column ms-3'>
                        <span className='text-muted fw-semibold text-muted d-block fs-6'>
                          {server.status ? 'Active' : 'Inactive'}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className='d-flex align-items-center'>
                      <div className='d-flex justify-content-start flex-column'>
                        <button
                          type='button'
                          className='btn btn-sm btn-black-primary text-white btn-bg-grey'
                          onClick={() => handleClick(server, false, true, false)}
                        >
                          Connect
                        </button>
                        <button
                          type='button'
                          className='btn btn-sm btn-black-primary text-white btn-bg-grey'
                          onClick={() => handleClick(server, false, false, true)}
                        >
                          Disconnect
                        </button>

                      </div>
                    </div>
                  </td>
                  <td>
                    <div className='d-flex align-items-center'>
                      <div className='d-flex justify-content-start flex-column '>

                        <div className='d-flex align-items-center flex-shrink-0'>
                          <button
                            className='btn btn-icon btn-bg-black btn-active-color-primary btn-sm me-)'
                            onClick={() => handleClick(server, false, false, false)}
                            data-bs-toggle='modal'
                            data-bs-target='#editserverModal'
                          >
                            <KTIcon iconName='pencil' className='fs-5' />
                          </button>
                          <button
                            className='btn btn-icon btn-bg-black btn-active-color-primary btn-sm'
                            onClick={() => handleClick(server, true, false, false)}
                            data-bs-toggle='modal'
                            data-bs-target='#deleteModal'
                          >
                            <KTIcon iconName='trash' className='fs-5' />
                          </button>

                        </div>
                      </div>
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

      {/* Add Site Modal */}
      <Modal show={showAddSiteForm} onHide={closeAddSiteModal} centered className='add-site-setting' >
        <Modal.Header closeButton>
          <Modal.Title>Register Server</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className='mb-7'>
            <FloatingLabel label="Site Name">
              <Form.Select
                className='form-control'
                id='floatingInput'
                value={addServer.site_id}
                onChange={(e) => setAddServer({ ...addServer, site_id: e.target.value })}
              >
                <option value='' disabled>Select a site</option>
                {siteData.map((site) => (
                  <option key={site.id} value={site.id}>
                    {site.name}
                  </option>
                ))}
              </Form.Select>
            </FloatingLabel>
          </div>

          <div className='mb-7'>
            <FloatingLabel
              label="Server IP"

            >
              <Form.Control type='text'
                className='form-control'
                placeholder='Server IP'
                id='floatingInput'
                value={addServer.ip_address}
                onChange={(e) => setAddServer({ ...addServer, ip_address: e.target.value })} />
            </FloatingLabel>
          </div>

          <div className='mb-7'>
            <FloatingLabel
              label="Username"
            >
              <Form.Control type='text'
                className='form-control'
                placeholder='username'
                id='floatingInput'
                value={addServer.username}
                onChange={(e) => setAddServer({ ...addServer, username: e.target.value })} />
            </FloatingLabel>
          </div>
          <div className='mb-7'>
            <FloatingLabel
              label="Password"
            >
              <Form.Control type='text'
                className='form-control'
                placeholder='password'
                id='floatingInput'
                value={addServer.password}
                onChange={(e) => setAddServer({ ...addServer, password: e.target.value })} />
            </FloatingLabel>
          </div>
          {pingMessage && <div className='mb-7 text-white'>{pingMessage}</div>}
        </Modal.Body>
        <Modal.Footer>
          <button type='button' className='btn add me-5' onClick={closeAddSiteModal}>
            Cancel
          </button>
          <button type='button' className='btn add me-5'  onClick={()=>handlePingClick(addServer.ip_address)}>

            Test
          </button>
          <button type='button' className='btn cancel' onClick={handleAddServer}>
            Register
          </button>
        </Modal.Footer>
      </Modal>


      {/* Edit Modal */}
      <div className={`modal fade ${showEditModal ? 'show' : ''}`} id='editserverModal' tabIndex={-1} role='dialog'>
        <div className='add-site-setting'>
          <div className='modal-dialog modal-dialog-centered' role='document'>
            <div className='modal-content'>
              <div className='modal-header pb-0 border-0 justify-content-end'>
                <div className='btn btn-sm btn-icon btn-active-color-primary' data-bs-dismiss='modal'>
                  <KTIcon iconName='cross' className='fs-1' />
                </div>
              </div>

              <div className='modal-body scroll-y mx-2 mx-xl-18 pt-0 pb-0'>
                <div className='text-center mb-13'>
                  <h5 className='mb-3'>Server Data (Edit mode)</h5>
                </div>

                <div className='mb-8'>
                  <div className='mb-7'>
                    <FloatingLabel
                      label="Server IP"

                    >
                      <Form.Control type='text'
                        className='form-control'
                        placeholder='Server IP'
                        id='floatingInput'
                        value={newServer.ip_address}
                        onChange={(e) => setNewServer({ ...newServer, ip_address: e.target.value })}
                      />
                    </FloatingLabel>
                  </div>
                  <div className='mb-7'>
                    <FloatingLabel label="Site Name">
                      <Form.Select
                        className='form-control'
                        id='floatingInput'
                        value={newServer.site_id}
                        onChange={(e) => setNewServer({ ...newServer, site_id: e.target.value })}
                      >
                        <option value='' disabled>Select a site</option>
                        {siteData.map((site) => (
                          <option key={site.id} value={site.id}>
                            {site.name}
                          </option>
                        ))}
                      </Form.Select>
                    </FloatingLabel>
                  </div>
                  <div className='mb-7'>
                    <FloatingLabel
                      label="Username"
                    >
                      <Form.Control type='text'
                        className='form-control'
                        placeholder='username'
                        id='floatingInput'
                        value={newServer.username}
                        onChange={(e) => setNewServer({ ...newServer, username: e.target.value })}
                      />
                    </FloatingLabel>
                  </div>
                  <div className='mb-7'>
                    <FloatingLabel
                      label="Cuurent Password"
                    >
                      <Form.Control type='text'
                        className='form-control'
                        placeholder='password'
                        id='floatingInput'
                        value={newServer.currentPassword}
                        onChange={(e) => setNewServer({ ...newServer, currentPassword: e.target.value })}/>
                    </FloatingLabel>
                  </div>
                  {error && <div className="error-message">{error}</div>}
                  <div className='mb-7 mt-3'>
                    <FloatingLabel
                      label=" New Password(If you want change)"
                    >
                      <Form.Control type='text'
                        className='form-control'
                        placeholder='password'
                        id='floatingInput'
                        value={newServer.password}
                        onChange={(e) => setNewServer({ ...newServer, password: e.target.value })} />
                    </FloatingLabel>
                  </div>
                  {pingMessage && <div className='mb-7 text-white'>{pingMessage}</div>}

                  <div className='modal-footer'>
                    <button type='button' className='btn add me-5' onClick={()=>handlePingClick(newServer.ip_address)}>
                      Test
                    </button>
                    <button type='button' className='btn cancel width-auto' onClick={handleEditSubmit}>
                      Update
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Delete Modal */}
      <div className={`modal fade ${showDeleteModal ? 'show' : ''}`} id='deleteModal' tabIndex={-1} role='dialog'>
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
                  <h5 className='mb-3'>Unregistering Server</h5>
                </div>

                <div className='mb-8'>
                  <div className='mb-7'>
                    <FloatingLabel
                      label="Server IP"

                    >
                      <Form.Control type='text'
                        className='form-control'
                        placeholder='Server IP'
                        id='floatingInput'
                        value={newServer.ip_address}
                      />
                    </FloatingLabel>
                  </div>
                  <br />
                  <div className='mb-8'>
                    <p className='text-white'>Are You Sure to Delete Server {newServer.ip_address}?</p>
                  </div>
                  <br />

                  <div className='modal-footer'>
                    <button type='button' className='btn cancel width-auto' onClick={handleDeleteSubmit}>
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Add Connect Modal */}

      <Modal show={showConnectForm} onHide={closeConnectModal} centered className='add-site-setting' >
        <Modal.Header closeButton>
          <Modal.Title>Connect the Server</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className='mb-7'>
            <FloatingLabel
              label="Server IP"

            >
              <Form.Control type='text'
                className='form-control'
                placeholder='Server IP'
                id='floatingInput'
                value={newServer.ip_address}
              />
            </FloatingLabel>
          </div>

          <div className='mb-7'>
            <FloatingLabel
              label="Username"
            >
              <Form.Control type='text'
                className='form-control'
                placeholder='username'
                id='floatingInput'
                value={newServer.username}
                onChange={(e) => setNewServer({ ...newServer, username: e.target.value })}
              />
            </FloatingLabel>
          </div>
          <div className='mb-7'>
            <FloatingLabel
              label="Password"
            >
              <Form.Control type='text'
                className='form-control'
                placeholder='password'
                id='floatingInput'
                value={newServer.password}
                onChange={(e) => setNewServer({ ...newServer, password: e.target.value })} />
            </FloatingLabel>
          </div>

        </Modal.Body>
        <Modal.Footer>
          <button type='button' className='btn add me-5' onClick={closeConnectModal}>
            Cancel
          </button>
          <button type='button' className='btn cancel'>
            Connect
          </button>
        </Modal.Footer>
      </Modal>

      {/* Add Disconnect Modal */}

      <Modal show={showDisconnectForm} onHide={closeDisconnectModal} centered className='add-site-setting' >
        <Modal.Header closeButton>
          <Modal.Title>Disconnect the Server</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className='mb-7'>
            <FloatingLabel
              label="Server IP"

            >
              <Form.Control type='text'
                className='form-control'
                placeholder='Server IP'
                id='floatingInput'
                value={newServer.ip_address}
              />
            </FloatingLabel>
          </div>

          <div className='mb-7'>
            <p className='text-white'> Are You Sure to Disconnect {newServer.ip_address}?</p>
          </div>

        </Modal.Body>
        <Modal.Footer>
          <button type='button' className='btn add me-5' onClick={closeDisconnectModal}>
            Cancel
          </button>
          <button type='button' className='btn cancel' >
            Disconnect
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export { TablesWidget9 };