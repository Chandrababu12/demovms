import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { KTIcon } from '../../../_metronic/helpers';
import { AddDevice } from '../../../_metronic/partials/modals/invite-users/addDevice';
// import { number } from 'yup';
import * as GraphQLQueries from '../../graphqlQueries/mutationQueries';


interface Props {
  className: string;
}
interface Site {
  id: number;
  name: string;
}
interface Server {
  id: number;
  ip_address: string;
}
interface DeviceData {
  id: string;
  name: string;
  ip_address: string;
  active: boolean;
  server_id: number;
  Site_id: BigInt;
  typeName: string;
  server?: {
    id: number;
    ip_address: string;
  };
  site?: {
    id: number;
    name: string;
  };
}

interface EditUserFormData {
  id: string;
  name: string;
  ip_address: string;

  server?: {
    id: number;
    ip_address: string;
  };
  site?: {
    id: number;
    name: string;
  };
  active: boolean;
}





const TablesWidget9: React.FC<Props> = ({ className }) => {
  const [deviceData, setDeviceData] = useState < DeviceData[] > ([]);
  const [selectedRows, setSelectedRows] = useState < string[] > ([]);
  const [selectAll, setSelectAll] = useState(false);
  const hasuraAccessKey = process.env.REACT_APP_ADMIN_SECRET_KEY;
  const [showEditModal, setShowEditModal] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editDeviceData, setEditDeviceData] = useState < EditUserFormData > ({
    id: '',
    name: '',
    ip_address: '',
    server: { id: 0, ip_address: '' },
    site: { id: 0, name: '' },
    active: true || false,
  });
  const [pingMessage, setPingMessage] = useState('');
  const [servers, setServers] = useState<Server[]>();
  const [siteData, setSiteData] = useState<Site[] | undefined>();
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

        const fetchedSiteData = siteResponse.data.data.site;

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
  
  const handleSiteChange = (selectedId: number) => {
    // Find the selected site object
    const selectedSite = siteData?.find((site) => site.id === selectedId);

    // Update the editDeviceData state with the selected site's ID and name
    setEditDeviceData((prevData) => ({
      ...prevData,
      site: {
        id: selectedId,
        name: selectedSite ? selectedSite.name : '',
      },
    }));

    // Fetch server data for the selected site
    fetchServerData(selectedId);
  };
  useEffect(() => {
    const intervalId = setInterval(() => {
      if (!hasuraAccessKey || !editDeviceData.site) {
        console.error('REACT_APP_ADMIN_SECRET_KEY or site_id is undefined');
        return;
      }
  
      fetchServerData(editDeviceData.site.id);
    }, 2000);
  
    // Clear the interval when the component is unmounted
    return () => clearInterval(intervalId);
  }, [hasuraAccessKey, editDeviceData.site]);
  
  const fetchServerData = async (selectedSiteId: number) => {
    try {
      const serverResponse = await axios.post(
        `${process.env.REACT_APP_BASE_URL}`,
        {
          query: GraphQLQueries.GET_SITEID_QUERY,
          variables: { siteId: selectedSiteId },
        },
        {
          headers: {
            'x-hasura-access-key': hasuraAccessKey || '',
          },
        }
      );
  
      const fetchedServerData = serverResponse.data.data.site_by_pk;
  
      if (fetchedServerData) {
        setServers(fetchedServerData.servers || []); // Set servers array
  
        // If you want to select the first server automatically, you can do it here
        if (fetchedServerData.servers && fetchedServerData.servers.length > 0) {
          setEditDeviceData((prevData) => ({
            ...prevData,
            server: {
              id: fetchedServerData.servers[0].id,
              ip_address: fetchedServerData.servers[0].ip_address,
            },
          }));
        }
      }
    } catch (error) {
      console.error('Error fetching server data:', error);
    }
  };
  
  
  useEffect(() => {
    if (!hasuraAccessKey) {
      console.error('REACT_APP_ADMIN_SECRET_KEY is undefined');
      return; // Handle the case where the key is undefined
    }
    const fetchDeviceData = async () => {
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_BASE_URL}`,
          {
            query: GraphQLQueries.GET_DEVICE_QUERY,
          },
          {
            headers: {
              'x-hasura-access-key': hasuraAccessKey,
            },
          }
        );
        setDeviceData(response.data.data.device);

      } catch (error) {
        console.error('Error fetching device data:', error);
      }
    };
    fetchDeviceData();
    const intervalId = setInterval(() => {
      fetchDeviceData();
    }, 5000);

    // Clear the interval when the component is unmounted
    return () => clearInterval(intervalId);
    console.log(fetchDeviceData)
  }, [hasuraAccessKey]);



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

  const handleEditClick = (device: DeviceData) => {
    setEditDeviceData({
      id: device.id,
      name: device.name,
      ip_address: device.ip_address,
      server: device.server ? { id: device.server.id, ip_address: device.server.ip_address} : { id: 0,ip_address: '' },
      site: device.site ? { id: device.site.id, name: device.site.name } : { id: 0, name: '' },
      active: device.active,
    });
    setShowEditModal(true);
  };

  const handleEditSubmit = async () => {
    try {
      if (!process.env.REACT_APP_ADMIN_SECRET_KEY) {
        console.error('REACT_APP_ADMIN_SECRET_KEY is undefined');
        return;
      }

      const { id, name, ip_address,server, site, active } = editDeviceData;

      const response = await axios.post(
        process.env.REACT_APP_BASE_URL || '',
        {
          query: GraphQLQueries.UPDATE_DEVICE_MUTATION,
          variables: {
            id,
            site_id: site?.id || null,
            server_id: server?.id || null,
            name,
            ip_address,
            active
          },
        },
        {
          headers: {
            'x-hasura-access-key': process.env.REACT_APP_ADMIN_SECRET_KEY,
          },
        }
      );

      console.log('GraphQL Response:', response.data);

      const responseData = response.data;

      if (!responseData || !responseData.data || !responseData.data.update_device) {
        console.error('Update operation failed or returned invalid data');
        return;
      }

      console.log('Device updated successfully', responseData.data.update_device.returning[0]);

      setEditDeviceData({
        id: '',
        name: '',
        ip_address: '',
        server: { id: 0, ip_address: '' },
        site: { id: 0, name: '' },
        active: true || false,
      });


      setDeviceData(prevDeviceData => {
        const updatedDeviceData = [...prevDeviceData];
        const index = updatedDeviceData.findIndex(device => device.id === id);

        if (index !== -1) {
          updatedDeviceData[index] = responseData.data.update_device.returning[0];
        }

        return updatedDeviceData;
      });


      setShowEditModal(false);
    } catch (error: any) {
      if (error.response && error.response.data && error.response.data.errors) {
        const graphqlErrors = error.response.data.errors;

        const uniquenessViolation = graphqlErrors.some((error: any) =>
          error.message.includes('Uniqueness violation')
        );

        if (uniquenessViolation) {
          console.error('Uniqueness violation. Handle the error appropriately.');
          // Handle the error, such as notifying the user or taking corrective action.
        } else {
          console.error('GraphQL Error:', graphqlErrors);
        }
      } else {
        console.error('Unexpected Error:', error);
      }
    }

  };



  const handleDelete = async (deviceId: string) => {
    try {

      const response = await axios.post(
        process.env.REACT_APP_BASE_URL || '',
        {
          query: GraphQLQueries.DELETE_DEVICE_MUTATION,
          variables: {
            device_id: deviceId,
          },
        },
        {
          headers: {
            'x-hasura-access-key': process.env.REACT_APP_ADMIN_SECRET_KEY || '',
          },
        }
      );

      if (response.data.data.delete_device.affected_rows > 0) {
        // Update the deviceData state to reflect the deletion
        setDeviceData(prevDeviceData =>
          prevDeviceData.filter(device => device.id !== deviceId)
        );
        console.log('Device deleted successfully');
      } else {
        console.error('Delete operation failed or returned invalid data');
      }
    } catch (error) {
      console.error('Error deleting device:', error);

    }
  };

  const handleSelectAll = () => {
    setSelectAll(!selectAll);
    const allDeviceIds = deviceData.map((device) => device.id);
    setSelectedRows(selectAll ? [] : allDeviceIds);
  };

  const handleSelectRow = (deviceId: string) => {
    const updatedSelectedRows = selectedRows.includes(deviceId)
      ? selectedRows.filter((id) => id !== deviceId)
      : [...selectedRows, deviceId];

    setSelectedRows(updatedSelectedRows);
  };

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className={`card ${className} `} style={{ backgroundColor: '#0d0d0f', color: 'white' }}>
      {/* begin::Header */}
      {/* <UsersPage/> */}
      <div className='card-header border-0 pt-5 '>
        <h3 className='card-title align-items-start flex-column'>
          <span className='card-label fw-bold fs-3 mb-1 text-white'>Device Details</span>
          <span className='text-muted mt-1 fw-semibold fs-7 '>{`Total Device Available: ${deviceData.length}`}</span>
        </h3>
        <div
          className='card-toolbar'
          data-bs-toggle='tooltip'
          data-bs-placement='top'
          data-bs-trigger='hover'
          title='Click to add a user'
        >
          <button type='button' className='btn btn-sm btn-grey-primary text-white' onClick={handleOpenModal}>
            <KTIcon iconName='plus' className='fs-3' />

            Add Device
          </button>

          <AddDevice show={showModal} onClose={handleCloseModal} />



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
                <th className='min-w-150px'>Device Name</th>
                <th className='min-w-140px'>Device IP</th>
                <th className='min-w-140px'>Server IP</th>
                <th className='min-w-140px'>Site</th>
                <th className='min-w-140px'>Status</th>
                <th className='min-w-100px text-end'>Actions</th>
              </tr>
            </thead>
            <tbody>
              {deviceData.map((device) => (
                <tr key={device.id}>
                  <td>
                    <div className='form-check form-check-sm form-check-custom form-check-solid '>
                      <input
                        className='form-check-input widget-9-check bg-dark'
                        type='checkbox'
                        checked={selectedRows.includes(device.id)}
                        onChange={() => handleSelectRow(device.id)}
                      />
                    </div>
                  </td>
                  <td>
                    <div className='d-flex align-items-center'>
                      <div className='d-flex justify-content-start flex-column ms-3'>
                        <span className='text-muted fw-semibold text-muted d-block fs-6'>
                          {device.name}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className='d-flex align-items-center'>
                      <div className='d-flex justify-content-start flex-column'>
                        <span className='text-muted fw-semibold text-muted d-block fs-6'>
                          {device.ip_address}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className='d-flex align-items-center'>
                      <div className='d-flex justify-content-start flex-column'>
                        <span className='text-muted fw-semibold text-muted d-block fs-6'>
                          {device.server?.ip_address}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td>
                  {device.site?.name ? (
  <div className='d-flex justify-content-start flex-column'>
    <span className='text-muted fw-semibold text-muted d-block fs-6'>
      {device.site.name.charAt(0).toUpperCase() + device.site.name.slice(1)}
    </span>
  </div>
) : (
  <div className='d-flex justify-content-start flex-column'>
    <span className='text-muted fw-semibold text-muted d-block fs-6'>
      No Site
    </span>
  </div>
)}
                  </td>
                  <td>
                    <div className='d-flex align-items-center'>
                      <div className='d-flex justify-content-start flex-column'>
                        <span className='text-muted fw-semibold text-muted d-block fs-6'>
                          {device.active ? 'Active' : 'Inactive'}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className='d-flex justify-content-end flex-shrink-0'>
                      <button
                        className='btn btn-icon btn-bg-black btn-active-color-primary btn-sm me-1'
                        onClick={() => handleEditClick(device)}
                        data-bs-toggle='modal'
                        data-bs-target='#editModal'  >
                        <KTIcon iconName='pencil' className='fs-5' />
                      </button>
                      <button
                        type='button'
                        className='btn btn-icon btn-bg-black btn-active-color-primary btn-sm'
                        onClick={() => handleDelete(device.id)}

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

      {/*Edit model*/}
      <div className={`modal fade ${showEditModal ? 'show' : ''}`} id='editModal' tabIndex={-1} role='dialog' modal-dialog modal-dialog-centered >
        <div className='add-site-setting'>
          <div className='modal-dialog modal-dialog-centered ' role='document'>
            <div className='modal-content'>
              <div className='modal-header pb-0 border-0 justify-content-end'>
                <div className='btn btn-sm btn-icon btn-active-color-primary' data-bs-dismiss='modal'>
                  <KTIcon iconName='cross' className='fs-1' />
                </div>
              </div>

              <div className='modal-body scroll-y mx-5 mx-xl-18 pt-0 pb-15 '>
                <div className='text-center mb-13'>
                  <h5 className='mb-3' >Edit Device Data</h5>
                </div>


                <div className='mb-8'>
                  <div className='form-group'>
                    <label className='font-weight-bold'>DeviceName</label>
                    <input
                      type='text'
                      value={editDeviceData.name}
                      onChange={(e) => setEditDeviceData({ ...editDeviceData, name: e.target.value })}
                      className='form-control form-control-solid border border-dark'
                    />
                  </div>
                  <br />
                  <div className='form-group'>
                    <label className='font-weight-bold'>Device IP Address</label>
                    <input
                      type='text'
                      value={editDeviceData.ip_address}
                      onChange={(e) => setEditDeviceData({ ...editDeviceData, ip_address: e.target.value })}
                      className='form-control form-control-solid border border-dark '
                    />
                  </div>
                  <br />
                  <div className='form-group'>
    <label className='font-weight-bold'>Site</label>
    <select
      value={editDeviceData.site?.id || ''}
      onChange={(e) => handleSiteChange(parseInt(e.target.value, 10))}
      className='form-control form-control-solid border border-dark'
    >
      <option value=''>Select a Site</option>
      {siteData &&
        siteData.map((site: Site) => (
          <option key={site.id} value={site.id}>
            {site.name}
          </option>
        ))}
    </select>
  </div>
                  <br />
                  <div className='form-group'>
      <label className='font-weight-bold'>Server</label>
      <select
        value={editDeviceData.server?.id || ''}
        onChange={(e) =>
          setEditDeviceData({
            ...editDeviceData,
            server: {  id: parseInt(e.target.value, 10), ip_address: e.target.options[e.target.selectedIndex].text },
          })
        }
        className='form-control form-control-solid border border-dark'
      >
        <option value=''>Select a Server</option>
        {servers?.map((server) => (
          <option key={server.id} value={server.id}>
            {server.ip_address}
          </option>
        ))}
      </select>
    </div>
                  <br />
                  {pingMessage && <div className='mb-7 text-white'>{pingMessage}</div>}
                  <div className='form-group'>
                    {/* <label className='font-weight-bold'>Status</label>
                    <select
                      value={editDeviceData.active.toString()}
                      onChange={(e) => setEditDeviceData({ ...editDeviceData, active: e.target.value === 'true' })}
                      className='form-control form-control-solid border border-dark'
                    >
                      <option value='true'>True</option>
                      <option value='false'>False</option>
                    </select> */}



                    <div className='modal-footer'>
                    <button type='button' className='btn btn-primary font-weight-bold' onClick={()=>handlePingClick(editDeviceData.ip_address)}>
                    Test
                    </button>
                      <button type='button' className='btn btn-primary font-weight-bold' data-bs-dismiss='modal' onClick={handleEditSubmit}>
                        Save changes
                      </button>
                    </div>
                  </div>
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

