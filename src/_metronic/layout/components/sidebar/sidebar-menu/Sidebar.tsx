import React, { Dispatch, SetStateAction, useState, useEffect } from 'react';
// import { useIntl } from 'react-intl';
// import { SidebarMenuItem } from './SidebarMenuItem';
// import { SidebarMenuItemWithSub } from './SidebarMenuItemWithSub';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Modal, OverlayTrigger, Tooltip, FloatingLabel, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { KTIcon } from '../../../../helpers';
import { BsBoxArrowRight } from "react-icons/bs";
import * as GraphQLQueries from '../../../../../app/graphqlQueries/mutationQueries';


interface ExpandedNodes {
    cameras: boolean;
    layouts: boolean;
    [key: string]: boolean;

}
interface Device {
    id: number;
    name: string;
    active: boolean;
    site_id: string;
}


interface SiteNameProps {
    expandedNodes: ExpandedNodes;
    toggleNode: (nodeName: keyof ExpandedNodes) => void;
    onSiteClick: (siteId: string) => void;
}


type Props = {
    data: { location: string; setLocation: Dispatch<SetStateAction<string>> };
    show: boolean;
    handleClose: () => void;
};

interface Site {
    id: string;
    name: string;
    devices?: Device[];
}

interface EditFormData {
    id: string;
    name: string;
    description: string;
    deleted: boolean;
}


const getSymbol = (active: boolean) => {
    const dotClass = active ? 'greendot' : 'reddot';
    return (
        <div className=" me-2">
            <img src={`media/surveillances/${dotClass}.svg`} alt=" " className=' ml-auto ' />
        </div>
    );
};




const SiteName: React.FC<SiteNameProps> = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState < string | null > (null);
    const [siteData, setSiteData] = useState < Record < string, string>> ({});
    const [deviceData, setDeviceData] = useState < Device[] > ([]);

    const hasuraAccessKey = process.env.REACT_APP_ADMIN_SECRET_KEY;

    useEffect(() => {
        if (!hasuraAccessKey) {
            console.error('REACT_APP_ADMIN_SECRET_KEY is undefined');
            return;
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


                setDeviceData(response.data.data.device); // Set device data here
            } catch (error: any) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchDeviceData();
        const intervalId = setInterval(() => {
            fetchDeviceData();
        }, 1000);
        return () => clearInterval(intervalId);
    }, []);
    const getSymbol = (active: boolean) => {
        const dotClass = active ? 'greendot' : 'reddot';
        return <img src={`media/surveillances/${dotClass}.svg`} alt=" " className='dot-svg ml-auto' />;
    };
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>

    return (
        <div className='mnvr-list'>
            <div className='device-info '>
                {deviceData && deviceData.length > 0 ? (
                    <div className="row">
                        <div className="col mb-1">
                            {/* Device Name Column */}
                            <ul >
                                {deviceData.map((device: Device) => (
                                    <li key={device.id} >
                                        <span>{device.name}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="col">
                            {/* Dot Column */}
                            <ul >
                                {deviceData.map((device: Device) => (
                                    <li key={device.id} >
                                        {getSymbol(device.active)}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                ) : null}
            </div>
            {/* Other dashboard content goes here */}
        </div>
    );
}

const SidebarMenuMain: React.FC = () => {
    const [expandedNodes, setExpandedNodes] = useState < ExpandedNodes > ({
        cameras: false,
        layouts: false,
    });
    const [siteNameInitials, setSiteNameInitials] = useState < string[] > ([]);
    const [sites, setSites] = useState < any[] > ([]);
    const siteNameColors = ['#3F424D', '#FF4747', '#436BFF', '#9747FF', '#139510'];
    const [showLocationModal, setShowLocationModal] = useState(false);
    const hasuraAccessKey = process.env.REACT_APP_ADMIN_SECRET_KEY;
    const [deviceData, setDeviceData] = useState < Record < string, Device[]>> ({});
    const [selectedSiteName, setSelectedSiteName] = useState('');
    const [selectedSiteId, setSelectedSiteId] = useState < string | null > (null);
    const [deviceDataFetched, setDeviceDataFetched] = useState(false);
    const [showMoreTooltip, setShowMoreTooltip] = useState(false);
    const navigate = useNavigate();



    const handleGroupClick = () => {
        // Navigate to the site page or perform any other action for the group click
        console.log('Group item clicked. Navigating to the site page or performing other actions.');
        setShowMoreTooltip(!showMoreTooltip);
        // Navigate to a different page using useNavigate
        navigate('/sites');
    };

    const handleSiteClick = (siteId: string) => {
        setSelectedSiteId(siteId);
        // Optionally, you can set the 'cameras' node to true when a site is clicked
        setExpandedNodes((prevExpandedNodes) => ({
            ...prevExpandedNodes,
            cameras: true,
        }));
    };
    const handleInitialClick = async (index: number, siteId: string) => {
        console.log(`Clicked on user initials ${index}, Site ID: ${siteId}`);
        if (!hasuraAccessKey) {
            console.error('Hasura access key is undefined');
            return;
        }

        try {
            const response = await axios.post(
                `${process.env.REACT_APP_BASE_URL}`,
                {
                    query: GraphQLQueries.GET_DEVICE_SITE_QUERY,
                    variables: {
                        siteId: siteId,
                    },
                },
                {
                    headers: {
                        'x-hasura-access-key': hasuraAccessKey,
                    },
                }
            );

            console.log('GraphQL Response:', response.data);

            const data = response.data;
            if (data.errors) {
                console.error('GraphQL Error:', data.errors);
                return;
            }

            const devices = data.data ? data.data.device || [] : [];
            console.log('Fetched Device Data:', devices);
            const selectedSite = devices.length > 0 ? devices[0].site.name : '';
            handleSiteClick(siteId);
            setExpandedNodes((prevExpandedNodes) => ({
                ...prevExpandedNodes,
                cameras: true,
            }));
            setSelectedSiteId(siteId);
            setSelectedSiteName(selectedSite);
            setDeviceData((prevDeviceData) => ({
                ...prevDeviceData,
                [siteId]: [...devices],
            }));
            setDeviceDataFetched(true);
        } catch (error) {
            console.error('Error fetching device data:', error);
        }
    };


    const fetchSiteData = async () => {
        if (!hasuraAccessKey) {
            console.error('REACT_APP_ADMIN_SECRET_KEY is undefined');
            return;
        }

        try {
            const response = await axios.post(
                `${process.env.REACT_APP_BASE_URL}`,
                {
                    query: GraphQLQueries.GET_SITE_DEVICE_QUERY,
                },
                {
                    headers: {
                        'x-hasura-access-key': hasuraAccessKey,
                    },
                }
            );

            const fetchedSites: Site[] = response.data.data.site || [];

            if (fetchedSites.length > 0) {
                const siteNames = fetchedSites.map((site) => site.name);
                setSiteNameInitials(siteNames);
            } else {
                console.warn('No valid site data found.');
            }

            setSites(fetchedSites);
            // Log the fetched device data
            console.log('Fetched Device Data:', response.data.data.device);
        } catch (error) {
            console.error('Error fetching site data:', error);
        }
    };

    useEffect(() => {
        fetchSiteData();
    }, [hasuraAccessKey]);

    const toggleNode = (nodeName: keyof ExpandedNodes) => {
        setExpandedNodes((prevExpandedNodes) => ({
            ...prevExpandedNodes,
            [nodeName]: !prevExpandedNodes[nodeName],
        }));
    };



    return (
        <>
            <div className='left-side-menu d-flex width-2'>
                <div className='profile-menu cursor-pointer'>
                    <ul>
                        {siteNameInitials.map((siteName, index) => {
                            if (index < 5) {
                                return (
                                    <OverlayTrigger
                                        key={index}
                                        placement='right'
                                        overlay={<Tooltip id={`tooltip-${index}`}>{siteName}</Tooltip>}
                                    >
                                        <li
                                            className={sites[index]?.active ? 'active' : ''}
                                            onClick={() => handleInitialClick(index, sites[index]?.id || '')}
                                        >
                                            <span style={{ backgroundColor: siteNameColors[index] }}>
                                                {siteName.charAt(0).toUpperCase()}
                                            </span>
                                        </li>
                                    </OverlayTrigger>
                                );
                            } else if (index === 5) {
                                return (
                                    <OverlayTrigger
                                        placement='right'
                                        overlay={<Tooltip id={`tooltip-more`}>More</Tooltip>}
                                    >
                                        <li onClick={handleGroupClick}>
                                            <span >
                                                <img width="30" height="30" src="https://img.icons8.com/quill/50/FFFFFF/more.png" alt="more" />
                                            </span>
                                        </li>
                                    </OverlayTrigger>
                                );
                            }
                            return null;
                        })}
                        <OverlayTrigger
                            placement='right'
                            overlay={<Tooltip id={`tooltip-add`}>Add a Site</Tooltip>}
                        >
                            <li onClick={() => setShowLocationModal(true)}>
                                <a href='#'>
                                    <span>
                                        {/* "Add" icon */}
                                        <img src='media/surveillances/add-icon.svg' alt='' />
                                    </span>
                                </a>
                            </li>
                        </OverlayTrigger>
                    </ul>
                </div>

                <div className='menu-item ' >
                    <ul>
                        <li>
                            <span className='left-nav-icon'>
                                <img src='media/surveillances/ri_search-line.svg' alt='' />
                            </span>
                            <input className='search' type='text' placeholder='Search...' />
                        </li>
                        <li>
                            <Link
                                to='/dashboard'
                                className={expandedNodes.cameras ? 'active' : ''}
                                onClick={() => {
                                    toggleNode('cameras');
                                    setDeviceDataFetched(false); // Reset the flag when clicking on Cameras
                                }}
                            >
                                <span className='left-nav-icon'>
                                    <img src='media/surveillances/video-camera.svg' alt='' />
                                </span>
                                Cameras
                                <span className='icon'>
                                    <img src='media/surveillances/right-side-arrow.svg' alt='' />
                                </span>
                            </Link>
                        </li>
                        {expandedNodes.cameras && (
                            <div className='mnvr-list'>
                                {deviceDataFetched ? (
                                    <div>
                                        <ul>
                                            <p className='mnvr-list'>
                                                {/* Add your arrow icon source here */}
                                                {selectedSiteName}
                                            </p>
                                            {deviceData[selectedSiteId!]?.length > 0 ? (
                                                deviceData[selectedSiteId!].map((device, index) => (
                                                    <li key={index}>
                                                        {device.name}
                                                        {getSymbol(device.active)}

                                                    </li>
                                                ))
                                            ) : (
                                                <li>No devices found </li>
                                            )}
                                        </ul>
                                    </div>
                                ) : (
                                    // Render the SiteName component
                                    <SiteName expandedNodes={expandedNodes} toggleNode={toggleNode} onSiteClick={handleSiteClick} />
                                )}
                            </div>
                        )}


                        <li> <Link to="/sequence" > <span className='left-nav-icon'> <img src="media/surveillances/sequence.svg" alt='' /> </span> Sequence </Link> </li>
                        <li> <Link to="/analytics" ><span className='left-nav-icon'> <img src="media/surveillances/analytics.svg" alt='' /> </span> Analytics </Link> </li>
                        <li> <Link to="/recording" ><span className='left-nav-icon'> <img src="media/surveillances/monitor.svg" alt='' /> </span> Playback </Link> </li>

                        <li> <Link to="/layouts"><span className='left-nav-icon'> <img src="media/surveillances/layout.svg" alt='' /></span>Layouts<span className='icon' onClick={() => toggleNode('layouts')}>
                            {expandedNodes.layouts ? (
                                <img src='media/surveillances/right-side-arrow.svg' alt='' />
                            ) : (
                                <img src='media/surveillances/right-side-arrow.svg' alt='' />
                            )}
                        </span>
                        </Link>
                        </li>
                        {/* Display SavedLayouts when Layouts is expanded */}
                        {expandedNodes.layouts && (
                            <ul>
                                <li><Link to="/savedLayout"> <i className='bi bi-arrow-right'></i> Saved Layouts </Link></li>
                            </ul>
                        )}

                        <li> <Link to="/sites" > <span className='left-nav-icon'> <img src="media/surveillances/monitor.svg" alt='' /> </span> Server <span className='icon'> <img src='media/surveillances/plus.svg' className='mx-1' alt='' /> <img src='media/surveillances/down-arrow.svg' alt='' /> </span> </Link> </li>

                    </ul>



                    <ul>
                        <div className='menu-sub-title'>DEVICE MANAGEMENT</div>
                        <li> <Link to="/device" ><span className='left-nav-icon'> <img src="media/surveillances/device-mobile-speaker.svg" alt='' /> </span> Device</Link> </li>
                        <li> <Link to="/camera" > <span className='left-nav-icon'> <img src="media/surveillances/video-camera.svg" alt='' /> </span> Camera </Link> </li>
                        <li> <Link to="/keyboard" > <span className='left-nav-icon'> <img src="media/surveillances/keyboard.svg" alt='' /> </span> Keyboard </Link> </li>
                        <li> <Link to="/mnvr" ><span className='left-nav-icon'> <img src="media/surveillances/camera.svg" alt='' /> </span> MNVR </Link> </li>


                    </ul>



                    <ul>
                        <div className='menu-sub-title'>ACCESS</div>
                        <li> <Link to="/users" > <span className='left-nav-icon'> <img src="media/surveillances/users.svg" alt='' /> </span> Users </Link> </li>
                        <li> <Link to="/role" ><span className='left-nav-icon'> <img src="media/surveillances/eos-icons_cluster-role.svg" alt='' /> </span> Role </Link> </li>
                        <li> <Link to="/permissions" > <span className='left-nav-icon'> <img src="media/surveillances/icon-park-outline_permissions.svg" alt='' /> </span> Permissions </Link> </li>
                        <li> <Link to="/auth/login" className="logout-button"><BsBoxArrowRight /> Logout </Link> </li>

                        <br />

                        <br />


                        <br />
                        <br />
                        <br />

                        <br />
                        <br />
                        <br />
                        <li> <Link to="/setting" ><span className='left-nav-icon'> <img src="media/surveillances/setting.svg" alt='' /> </span> Settings </Link> </li>
                        <li> <Link to="/LightMode" > <span className='left-nav-icon'> <img src="media/surveillances/lightmode.svg" alt='' /> </span> LightMode </Link> </li>


                    </ul>


                </div>
            </div>
            <SelectLocationModal
                show={showLocationModal}
                handleClose={() => setShowLocationModal(false)}
                data={{ location: '', setLocation: () => { } }} // Adjust the data accordingly
            />

        </>
    )
};

const SelectLocationModal: React.FC<Props> = ({ show, handleClose, data }) => {
    useEffect(() => {
        initMap();
    }, []);

    const [location, setLocation] = useState(data.location);
    const [showAddSiteForm, setShowAddSiteForm] = useState(false);

    const [newSite, setNewSite] = useState < EditFormData > ({
        id: '',
        name: '',
        description: '',
        deleted: false
    });

    const handleAddSite = async () => {
        try {
            // Ensure that required fields are not empty
            if (!newSite.name || !newSite.description) {
                console.error('Please fill in all required fields.');
                return;
            }

            // Prepare variables for the mutation with default values
            const variables = {
                name: newSite.name,
                description: newSite.description,
                created_by: '', // Provide appropriate default value
                modified_by: '', // Provide appropriate default value
                deleted_by: '', // Provide appropriate default value
                deleted: false, // Provide appropriate default value
            };

            // Send the mutation request
            const response = await axios.post(
                `${process.env.REACT_APP_BASE_URL}`,
                {
                    query: GraphQLQueries.INSERT_SITE_MUTATION,
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
            setNewSite({
                id: '',
                name: '',
                description: '',
                deleted: false
            });
            setShowAddSiteForm(false);

            console.log('Added site:', response.data.data.insert_site.returning[0]);
        } catch (error) {
            console.error('Error adding site:', error);
        }
    };


    const dismissLocation = () => {
        setLocation(data.location);
        handleClose();
    };

    const applyLocation = () => {
        data.setLocation(location);
        handleClose();
    };

    const initMap = () => { };

    return (
        <Modal
            className={`add-site-setting fade ${show ? 'show' : ''}`}
            id='kt_modal_select_location'
            backdrop='static'
            tabIndex={-1}
            aria-labelledby='exampleModalLabel'
            show={show}
            onHide={dismissLocation}
            centered // This class centers the modal vertically and horizontally
        >
            {/* Add Site Modal */}
            <Modal.Header onClick={dismissLocation}>
                <Modal.Title>Add Site</Modal.Title>
                <KTIcon iconName='cross' className='fs-1' />
            </Modal.Header>
            <Modal.Body>
                <div className='mb-8'>


                    <FloatingLabel
                        controlId="floatingInput"
                        label="Site Name"

                    >
                        <Form.Control type='text'
                            className='form-control'
                            placeholder='Site Name'
                            id='newSiteName'
                            value={newSite.name}
                            onChange={(e) => setNewSite({ ...newSite, name: e.target.value })} />
                    </FloatingLabel>
                </div>



                <div className='mb-0'>


                    <FloatingLabel controlId="floatingTextarea2" label="Write a Description Here">
                        <Form.Control
                            as="textarea"
                            type='text'
                            className='form-control'
                            id='newSiteDescription'
                            placeholder='Write a Description Here'
                            value={newSite.description}
                            onChange={(e) => setNewSite({ ...newSite, description: e.target.value })}
                            style={{ height: '100px' }}
                        />
                    </FloatingLabel>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <button type='button' className='btn cancel' onClick={handleAddSite}>
                    Add Site
                </button>
            </Modal.Footer>
        </Modal>


    );
};
export { SidebarMenuMain }

{/*<div className='menu-item'>
 <div className='menu-content pt-8 pb-2'>
 <span className='menu-section text-muted text-uppercase fs-8 ls-1'>Crafted</span>
 </div>
 </div>
 <SidebarMenuItemWithSub
 to='/crafted/pages'
 title='Pages'
 fontIcon='bi-archive'
 icon='element-plus'
 >
 <SidebarMenuItemWithSub to='/crafted/pages/profile' title='Profile' hasBullet={true}>
 <SidebarMenuItem to='/crafted/pages/profile/overview' title='Overview' hasBullet={true} />
 <SidebarMenuItem to='/crafted/pages/profile/projects' title='Projects' hasBullet={true} />
 <SidebarMenuItem
 to='/crafted/pages/profile/campaigns'
 title='Campaigns'
 hasBullet={true}
 />
 <SidebarMenuItem
 to='/crafted/pages/profile/documents'
 title='Documents'
 hasBullet={true}
 />
 <SidebarMenuItem
 to='/crafted/pages/profile/connections'
 title='Connections'
 hasBullet={true}
 />
 </SidebarMenuItemWithSub>

 <SidebarMenuItemWithSub to='/crafted/pages/wizards' title='Wizards' hasBullet={true}>
 <SidebarMenuItem
 to='/crafted/pages/wizards/horizontal'
 title='Horizontal'
 hasBullet={true}
 />
 <SidebarMenuItem to='/crafted/pages/wizards/vertical' title='Vertical' hasBullet={true} />
 </SidebarMenuItemWithSub>
 </SidebarMenuItemWithSub>
 <SidebarMenuItemWithSub
 to='/crafted/accounts'
 title='Accounts'
 icon='profile-circle'
 fontIcon='bi-person'
 >
 <SidebarMenuItem to='/crafted/account/overview' title='Overview' hasBullet={true} />
 <SidebarMenuItem to='/crafted/account/settings' title='Settings' hasBullet={true} />
 </SidebarMenuItemWithSub>
 <SidebarMenuItemWithSub to='/error' title='Errors' fontIcon='bi-sticky' icon='cross-circle'>
 <SidebarMenuItem to='/error/404' title='Error 404' hasBullet={true} />
 <SidebarMenuItem to='/error/500' title='Error 500' hasBullet={true} />
 </SidebarMenuItemWithSub>
 <SidebarMenuItemWithSub
 to='/crafted/widgets'
 title='Widgets'
 icon='element-7'
 fontIcon='bi-layers'
 >
 <SidebarMenuItem to='/crafted/widgets/lists' title='Lists' hasBullet={true} />
 <SidebarMenuItem to='/crafted/widgets/statistics' title='Statistics' hasBullet={true} />
 <SidebarMenuItem to='/crafted/widgets/charts' title='Charts' hasBullet={true} />
 <SidebarMenuItem to='/crafted/widgets/mixed' title='Mixed' hasBullet={true} />
 <SidebarMenuItem to='/crafted/widgets/tables' title='Tables' hasBullet={true} />
 <SidebarMenuItem to='/crafted/widgets/feeds' title='Feeds' hasBullet={true} />
 </SidebarMenuItemWithSub>
 <div className='menu-item'>
 <div className='menu-content pt-8 pb-2'>
 <span className='menu-section text-muted text-uppercase fs-8 ls-1'>Apps</span>
 </div>
 </div>
 <SidebarMenuItemWithSub
 to='/apps/chat'
 title='Chat'
 fontIcon='bi-chat-left'
 icon='message-text-2'
 >
 <SidebarMenuItem to='/apps/chat/private-chat' title='Private Chat' hasBullet={true} />
 <SidebarMenuItem to='/apps/chat/group-chat' title='Group Chart' hasBullet={true} />
 <SidebarMenuItem to='/apps/chat/drawer-chat' title='Drawer Chart' hasBullet={true} />
 </SidebarMenuItemWithSub>
 <SidebarMenuItem
 to='/apps/user-management/users'
 icon='abstract-28'
 title='User management'
 fontIcon='bi-layers'
 />
 <div className='menu-item'>
 <a
 target='_blank'
 className='menu-link'
 href={process.env.REACT_APP_PREVIEW_DOCS_URL + '/docs/changelog'}
 >
 <span className='menu-icon'>
 <KTIcon iconName='code' className='fs-2' />
 </span>
 <span className='menu-title'>Changelog {process.env.REACT_APP_VERSION}</span>
 </a>
 </div>*/}
{/* <SidebarMenuItem
 to='/dashboard'
 icon='element-11'
 title={intl.formatMessage({ id: 'MENU.DASHBOARD' })}
 fontIcon='bi-app-indicator'
 />
 <SidebarMenuItem to='/builder' icon='switch' title='Layout Builder' fontIcon='bi-layers' />
 <SidebarMenuItemWithSub
 to='#'
 title='Dashboard'
 fontIcon='bi-archive'
 icon='element-plus'
 >
 <SidebarMenuItem to='#' title='Project Summary' hasBullet={true} />
 <SidebarMenuItem to='#' title='Financial Overview' hasBullet={true} />
 <SidebarMenuItem to='#' title='Materials & Equipment Overview' hasBullet={true} />
 <SidebarMenuItem to='#' title='Labor & Contractor Summary' hasBullet={true} />
 <SidebarMenuItem to='#' title='Products & Appliances Update' hasBullet={true} />
 <SidebarMenuItem to='#' title='Alerts & Issues' hasBullet={true} />
 <SidebarMenuItem to='#' title='Recent Updates & Messages' hasBullet={true} />
 <SidebarMenuItem to='#' title='Documents for Review' hasBullet={true} />
 <SidebarMenuItem to='#' title='Scheduled Events' hasBullet={true} />
 <SidebarMenuItem to='#' title='Weather Forecast' hasBullet={true} />
 </SidebarMenuItemWithSub>
 <SidebarMenuItem to='/calculator' icon='switch' title='Calculator' fontIcon='bi-layers' /> */}
