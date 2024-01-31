// AddDevice.jsx

import React, { useState,useEffect } from 'react'
import { Modal, Button } from 'react-bootstrap'
import { KTIcon } from '../../../helpers'
import axios from 'axios'
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { newInvariantError } from '@apollo/client/utilities/globals'
import * as GraphQLQueries from '../../../../app/graphqlQueries/mutationQueries'
const AddDevice = ({ show, onClose }) => {
  const hasuraAccessKey = process.env.REACT_APP_ADMIN_SECRET_KEY
  const [newDevice, setNewDevice] = useState({
    name: '',
    ip_address: '',
    site_id: '',
    server_id:'',
    username: '',
    password: '',
    active: true || false,
  })
  const [showModal, setShowModal] = useState(false);
  const [pingMessage, setPingMessage] = useState('');
  const [servers, setServers] = useState([]);
  const [siteData, setSiteData] = useState();
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

        const fetchedSiteData = siteResponse.data.data.site.map((device) => ({
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
    if (!hasuraAccessKey || !newDevice.site_id) {
      console.error('REACT_APP_ADMIN_SECRET_KEY or site_id is undefined');
      return;
    }

    const fetchServerData = async () => {
      try {
        const serverResponse = await axios.post(
          `${process.env.REACT_APP_BASE_URL}`,
          {
            query: GraphQLQueries.GET_SITEID_QUERY,
            variables: { siteId: parseInt(newDevice.site_id) }, // Convert site_id to integer if it's stored as a string
          },
          {
            headers: {
              'x-hasura-access-key': hasuraAccessKey,
            },
          }
        );

        const fetchedServerData = serverResponse.data.data.site_by_pk;

        if (fetchedServerData) {
          setServers(fetchedServerData.servers || []); // Set servers array
        }
      } catch (error) {
        console.error('Error fetching device data:', error);
      }
    };

    fetchServerData();
    const intervalId = setInterval(() => {
      fetchServerData();
    }, 2000);

    // Clear the interval when the component is unmounted
    return () => clearInterval(intervalId);
  }, [hasuraAccessKey, newDevice.site_id]);

  const handleSiteChange = (e) => {
    const selectedSiteId = e.target.value;
    setNewDevice({ ...newDevice, site_id: selectedSiteId });
  };

  const handleAddDevice = async () => {
    try {
      const formData = new FormData()
      formData.append('avatar', newDevice.avatar || '')

      // Assuming the server responds with the URL of the uploaded image
      const responseUpload = await axios.post(`${process.env.REACT_APP_BASE_URL}`, formData)
      const avatarUrl = responseUpload.data.url

      const deviceResponse = await axios.post(
        `${process.env.REACT_APP_BASE_URL}`,
        {
          query: GraphQLQueries.INSERT_DEVICE_MUTATION,
          variables: {
            name: newDevice.name,
            ip_address: newDevice.ip_address,
            user: newDevice.username,
            password: newDevice.password,
            server_id: newDevice.server_id|| null,
            site_id: newDevice.site_id || null,
            active: newDevice.active,
          },
        },
        {
          headers: {
            'x-hasura-access-key': hasuraAccessKey,
          },
        }
      )

      console.log(deviceResponse)
      const result = deviceResponse.data.data.insert_device
      console.log('Device added:', result.returning[0])

      // Handle further logic if needed

      setNewDevice({
        name: '',
        ip_address: '',
        devicetype: '',
        site_id: '',
        server_id:'',
        user: '',
        password: '',
        active: false,
      })
      setShowModal(false);
      onClose(); 
    } catch (error) {
      if (
        axios.isAxiosError(error) &&
        error.response &&
        error.response.data &&
        error.response.data.errors
      ) {
        console.error('GraphQL Errors:', error.response.data.errors)
      } else {
        console.error('Error adding device:', error)
      }
    }
  }
  const handlePingClick = async (serverId) => {
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
    } catch (error) {
      console.error('Error:', error.message);
      setPingMessage('Error occurred while making the request.');
    }
  };

  return (



    <Modal show={show} onHide={onClose} centered
    className={`add-site-setting fade ${showModal ? 'show' : ''}`}
      id='kt_modal_select_location'
      backdrop='static'
      tabIndex={-1}
      aria-labelledby='exampleModalLabel'
      data-bs-dismiss='modal'>



      <Modal.Header onClick={onClose}>
        <Modal.Title>Add Device</Modal.Title>
        <KTIcon iconName='cross' className='fs-1' />
      </Modal.Header>
      <Modal.Body>
      
      <div className='mb-8'>
      <FloatingLabel controlId="floatingInput" label="Site Name">
  <Form.Select
    className='form-control'
    value={newDevice.site_id || ''}
    onChange={handleSiteChange}
  >
    <option value='' disabled>
      Select a site
    </option>
    {siteData && siteData.map(site => (
      <option key={site.id} value={site.id}>
        {site.name}
      </option>
    ))}
  </Form.Select>
</FloatingLabel>
        </div>
        <div className='mb-8'>
           <FloatingLabel controlId="floatingInput" label="Server IP">
        <Form.Select
          className='form-control'
          value={newDevice.server_id || ''}
          onChange={(e) => setNewDevice({ ...newDevice, server_id: e.target.value })}
        >
          <option value='' disabled>
            Select a server IP
          </option>
          {siteData &&
            servers.map((server) => (
              <option key={server.id} value={server.id} >
                {server.ip_address}
              </option>
            ))}
        </Form.Select>
      </FloatingLabel>
        </div>
        <div className='mb-8 '>
          <FloatingLabel
            controlId="floatingInput"
            label="Device Name"
          >
            <Form.Control type='text'
              className='form-control'
              placeholder='Device Name'
              value={newDevice.name}
              onChange={(e) => setNewDevice({ ...newDevice, name: e.target.value })} />
          </FloatingLabel>
        </div>
        <div className='mb-8'>
          <FloatingLabel
            controlId="floatingInput"
            label="IP Address"
          >
            <Form.Control type='text'
              className='form-control'
              placeholder='IP Address'
              value={newDevice.ip_address}
              onChange={(e) => setNewDevice({ ...newDevice, ip_address: e.target.value })} />
          </FloatingLabel>
        </div>
        <div className='mb-8'>
          <FloatingLabel
            controlId="floatingInput"
            label="Username"
          >
            <Form.Control type='text'
              className='form-control'
              placeholder='Username'
              value={newDevice.username}
              onChange={(e) => setNewDevice({ ...newDevice, username: e.target.value })} />
          </FloatingLabel>
        </div>
        <div className='mb-8'>
          <FloatingLabel
            controlId="floatingInput"
            label="Password"
          >
            <Form.Control type='text'
              className='form-control'
              placeholder='Password'
              value={newDevice.password}
              onChange={(e) => setNewDevice({ ...newDevice, password: e.target.value })} />
          </FloatingLabel>
        </div>
        {pingMessage && <div className='mb-7 text-white'>{pingMessage}</div>}
        <div className='modal-footer mb-7 d-flex justify-content-end'>
        <Button variant='primary' onClick={()=>handlePingClick(newDevice.ip_address)}>
            Test
          </Button>
          <Button variant='primary' onClick={handleAddDevice}>
            Add Device
          </Button>
        </div>
      </Modal.Body>
    </Modal>


  )
}

export { AddDevice }

