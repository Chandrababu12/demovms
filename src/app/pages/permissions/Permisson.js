import React, {useState} from 'react'
// import { Formik } from "formik";
import {Formik} from 'formik'
// import Select from "react-select";
// import { useQuery } from "@apollo/client";
// import { getSiteId, getWorkSpaceId } from "../../../LocalStorageUtil";
// import { GET_PERMISSION, GET_ROLE } from "../graphql/queries";
// import Button from "@material-ui/core/Button";
// import MuiExpansionPanel from "@material-ui/core/ExpansionPanel";
// import MuiExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
// import MuiExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
// import Typography from "@material-ui/core/Typography";
// import ExpansionPanel from "@material-ui/core/ExpansionPanel";
// import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
// import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
// import ExpandMoreIcon from "@material-ui/icons";
import Checkbox from '@material-ui/core/Checkbox'
// import ExpandMoreIcon from "@material-ui/icons";

// import { Formik } from "formik";
import {Form} from 'react-bootstrap'
import {ExpansionPanel, ExpansionPanelDetails, ExpansionPanelSummary} from '@material-ui/core'



export default function SettingsPermissionTwo() {
  const [initvalue, setInitvalue] = useState()

  return (
    <div className='clearfix'>
      <div className='account-security'>
        <Formik
          initialValues={initvalue}
          enableReinitialize={true}
          onSubmit={(values, {setSubmitting}) => {
            setSubmitting(true)
            // handleUpdateOneSetting(values);
          }}
        >
          {({values, setFieldValue, handleSubmit}) => (
            <Form onSubmit={handleSubmit}>
              {/* <div className="setting-page-business-info">
                <div className="row">
                  <div className="col-lg-12 col-xl-4 col-xxl-5 col-md-12">
                    <div className="business-header-content">
                      <span className="title d-block mb-3 text-uppercase">
                        PERMISSION
                      </span>
                      <span className="sub-text d-block mb-5">
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry. Lorem Ipsum has been the
                        industry's standard dummy text ever since the 1500s,
                        when an unknown printer took a galley of type and
                        scrambled it to make a type specimen book.
                      </span>
                    </div>
                  </div>

                  <div className="col-lg-12 col-xl-8 col-xxl-7 col-md-12">
                    <div className="setting-business-right-side">
                      <div className="setting-profile-login-provider row">
                        <span className="d-block ">
                          To Whom can (we) Schedule Appointments
                        </span>

                        <div className="service-gateway w-100 d-block">
                          <ul className="checkbox-header flex-column flex-md-row   d-flex justify-content-between align-items-center">
                            <li className="hm-checkbox">
                              <Field
                                type="checkbox"
                                id="prepaid"
                                name=""
                                value=""
                              />
                              <label className="eprice pr-0" for="prepaid">
                                <span className="circle-border"></span>
                                <span className="chk_txt">Prepaid User</span>
                              </label>
                            </li>
                            <li className="hm-checkbox">
                              <Field
                                type="checkbox"
                                id="mobile"
                                name=""
                                value=""
                              />
                              <label className="eprice pr-0" for="mobile">
                                <span className="circle-border"></span>
                                <span className="chk_txt">
                                  Mobile Verified User
                                </span>
                              </label>
                            </li>
                            <li className="hm-checkbox">
                              <Field
                                type="checkbox"
                                id="email"
                                name=""
                                value=""
                              />
                              <label className="eprice pr-0" for="email">
                                <span className="circle-border"></span>
                                <span className="chk_txt">
                                  Email Verified User
                                </span>
                              </label>
                            </li>
                          </ul>
                        </div>
                      </div>

                      <div className="setting-profile-login-provider row">
                        <span className="d-block">Access Control</span>
                        <span className="service-gateway w-100 d-block">
                          <div className="re_select">
                            <Select
                              //  onChange={(select) => {
                              //     setFieldValue("accesscontrol", select.value);
                              //   }}
                              //   value={accesscontrol.find(
                              //     (el) => el.value === values.client_time_slot
                              //   )}
                              options={accesscontrol}
                            />
                          </div>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div> */}

              <div className='setting-page-business-info'>
                {/* No Need below code */}
                {/* <div className='permission-page-setting'>
                  <div className='row align-items-center'>
                    <div className='col-lg-10 col-xl-10 col-xxl-10 col-md-10 '>
                      <div className='business-header-content'>
                        <span className='title d-block mb-3 text-uppercase'>PERMISSION</span>
                        <span className='sub-text d-block mb-5'>
                          In publishing and graphic design, lorem ipsum is a placeholder text
                          commonly used to the visual form of a document or a typeface without
                          relying on meaningful content. this demo
                        </span>
                      </div>
                    </div>

                    <div className='col-lg-2 col-xl-2 col-xxl-2 col-md-2'>
                      <div className='permission-setting-page text-right'>
                        <Button variant='contained' className='btn btn-primary rounded-pill'>
                          + ADD NEW
                        </Button>
                      </div>
                    </div>
                  </div>
                </div> */}

                <div className='permission-page-setting'>
                  <div className='permission-header-tab'>
                    <div className='row'>
                      <div className='col'>
                        <span className='sub-header'>Name</span>
                      </div>
                      <div className='col-xl-2'>
                        <span className='sub-header d-block w-100 text-center'>Admin</span>
                      </div>
                      <div className='col-xl-2'>
                        <span className='sub-header d-block w-100 text-center'> user</span>
                      </div>
                      <div className='col-xl-2'>
                        <span className='sub-header d-block w-100 text-center'>Operator</span>
                      </div>
                      <div className='col-xl-2'>
                        <span className='sub-header d-block w-100 text-center'>Service</span>
                      </div>
                      <div className='col-xl-1'>
                        <span className='sub-header d-block w-100 text-center'>Receptionist</span>
                      </div>
                    </div>
                  </div>
                  <div className='permission-body-content'>
                    <Permissionpage />
                  </div>
                </div>
              </div>

              <div className='w-100 mt-10'>
                <button
                  // onClick={getActiveElement}
                  type='submit'
                  className='btn btn-primary setting-page-btn'
                  // disabled={Loader}
                >
                  <span>Save</span>

                  {/* {Loader && <SpinnerSmall loading={Loader} />} */}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  )
}

export function Permissionpage() {
  const [expanded, setExpanded] = React.useState('panel1')

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false)
  }

  return (
    <div className='clearfix'>
      <div className='permission-table-conetent'>
        <ExpansionPanel square expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
          <ExpansionPanelSummary
            aria-controls='panel1d-content'
            id='panel1d-header'
            className='permission-header t-01'
            // expandIcon={<ExpandMoreIcon />}
          >
            <div className='permission-table-header'>
              <span> Management</span>
              {/* <ExpandMoreIcon /> */}
            </div>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <div className='d-block w-100 tab-inner-content-details'>
              <div className='row align-items-center'>
                <div className='col'>
                  <span className='inner-permission-title'> Camera view </span>
                </div>

                <div className='col-xl-2'>
                  <div className='permission-check-box d-block w-100 text-center'>
                    <Activecheckbox />
                  </div>
                </div>

                <div className='col-xl-2'>
                  <div className='permission-check-box d-block w-100 text-center'>
                    <Checkbox01 />
                  </div>
                </div>

                <div className='col-xl-2'>
                  <div className='permission-check-box d-block w-100 text-center'>
                    <Activecheckbox />
                  </div>
                </div>

                <div className='col-xl-2'>
                  <div className='permission-check-box d-block w-100 text-center'>
                    <Checkbox01 />
                  </div>
                </div>

                <div className='col-xl-1'>
                  <div className='permission-check-box d-block w-100 text-center'>
                    <Activecheckbox />
                  </div>
                </div>
              </div>
              <hr className='my-0 row' />
              <div className='row align-items-center'>
                <div className='col'>
                  <span className='inner-permission-title'> Camera Edit</span>
                </div>

                <div className='col-xl-2'>
                  <div className='permission-check-box d-block w-100 text-center'>
                    <Activecheckbox />
                  </div>
                </div>

                <div className='col-xl-2'>
                  <div className='permission-check-box d-block w-100 text-center'>
                    <Checkbox01 />
                  </div>
                </div>

                <div className='col-xl-2'>
                  <div className='permission-check-box d-block w-100 text-center'>
                    <Activecheckbox />
                  </div>
                </div>

                <div className='col-xl-2'>
                  <div className='permission-check-box d-block w-100 text-center'>
                    <Checkbox01 />
                  </div>
                </div>

                <div className='col-xl-1'>
                  <div className='permission-check-box d-block w-100 text-center'>
                    <Activecheckbox />
                  </div>
                </div>
              </div>
              <hr className='my-0 row' />

              <div className='row align-items-center'>
                <div className='col'>
                  <span className='inner-permission-title'> Camera Update</span>
                </div>

                <div className='col-xl-2'>
                  <div className='permission-check-box d-block w-100 text-center'>
                    <Activecheckbox />
                  </div>
                </div>

                <div className='col-xl-2'>
                  <div className='permission-check-box d-block w-100 text-center'>
                    <Checkbox01 />
                  </div>
                </div>

                <div className='col-xl-2'>
                  <div className='permission-check-box d-block w-100 text-center'>
                    <Activecheckbox />
                  </div>
                </div>

                <div className='col-xl-2'>
                  <div className='permission-check-box d-block w-100 text-center'>
                    <Checkbox01 />
                  </div>
                </div>

                <div className='col-xl-1'>
                  <div className='permission-check-box d-block w-100 text-center'>
                    <Activecheckbox />
                  </div>
                </div>
              </div>
              <hr className='my-0 row' />

              <div className='row align-items-center'>
                <div className='col'>
                  <span className='inner-permission-title'>Camera Delete </span>
                </div>

                <div className='col-xl-2'>
                  <div className='permission-check-box d-block w-100 text-center'>
                    <Activecheckbox />
                  </div>
                </div>

                <div className='col-xl-2'>
                  <div className='permission-check-box d-block w-100 text-center'>
                    <Checkbox01 />
                  </div>
                </div>

                <div className='col-xl-2'>
                  <div className='permission-check-box d-block w-100 text-center'>
                    <Activecheckbox />
                  </div>
                </div>

                <div className='col-xl-2'>
                  <div className='permission-check-box d-block w-100 text-center'>
                    <Checkbox01 />
                  </div>
                </div>

                <div className='col-xl-1'>
                  <div className='permission-check-box d-block w-100 text-center'>
                    <Activecheckbox />
                  </div>
                </div>
              </div>
              <hr className='my-0 row' />

              <div className='row align-items-center'>
                <div className='col'>
                  <span className='inner-permission-title'> Camera Add</span>
                </div>

                <div className='col-xl-2'>
                  <div className='permission-check-box d-block w-100 text-center'>
                    <Activecheckbox />
                  </div>
                </div>

                <div className='col-xl-2'>
                  <div className='permission-check-box d-block w-100 text-center'>
                    <Checkbox01 />
                  </div>
                </div>

                <div className='col-xl-2'>
                  <div className='permission-check-box d-block w-100 text-center'>
                    <Activecheckbox />
                  </div>
                </div>

                <div className='col-xl-2'>
                  <div className='permission-check-box d-block w-100 text-center'>
                    <Checkbox01 />
                  </div>
                </div>

                <div className='col-xl-1'>
                  <div className='permission-check-box d-block w-100 text-center'>
                    <Activecheckbox />
                  </div>
                </div>
              </div>
              <hr className='my-0 row' />

              <div className='row align-items-center'>
                <div className='col'>
                  <span className='inner-permission-title'> Keyboard View </span>
                </div>

                <div className='col-xl-2'>
                  <div className='permission-check-box d-block w-100 text-center'>
                    <Activecheckbox />
                  </div>
                </div>

                <div className='col-xl-2'>
                  <div className='permission-check-box d-block w-100 text-center'>
                    <Checkbox01 />
                  </div>
                </div>

                <div className='col-xl-2'>
                  <div className='permission-check-box d-block w-100 text-center'>
                    <Activecheckbox />
                  </div>
                </div>

                <div className='col-xl-2'>
                  <div className='permission-check-box d-block w-100 text-center'>
                    <Checkbox01 />
                  </div>
                </div>

                <div className='col-xl-1'>
                  <div className='permission-check-box d-block w-100 text-center'>
                    <Activecheckbox />
                  </div>
                </div>
              </div>
              <hr className='my-0 row' />

              <div className='row align-items-center'>
                <div className='col'>
                  <span className='inner-permission-title'> Keyboard Edit </span>
                </div>

                <div className='col-xl-2'>
                  <div className='permission-check-box d-block w-100 text-center'>
                    <Activecheckbox />
                  </div>
                </div>

                <div className='col-xl-2'>
                  <div className='permission-check-box d-block w-100 text-center'>
                    <Checkbox01 />
                  </div>
                </div>

                <div className='col-xl-2'>
                  <div className='permission-check-box d-block w-100 text-center'>
                    <Activecheckbox />
                  </div>
                </div>

                <div className='col-xl-2'>
                  <div className='permission-check-box d-block w-100 text-center'>
                    <Checkbox01 />
                  </div>
                </div>

                <div className='col-xl-1'>
                  <div className='permission-check-box d-block w-100 text-center'>
                    <Activecheckbox />
                  </div>
                </div>
              </div>
            </div>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel square expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
          <ExpansionPanelSummary
            aria-controls='panel2d-content'
            id='panel2d-header'
            className='permission-header'
            // expandIcon={<ExpandMoreIcon />}
          >
            <div className='permission-table-header'>
              <span> Management1</span>
            </div>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <div className='d-block w-100 tab-inner-content-details'>
              <div className='row align-items-center'>
                <div className='col'>
                  <span className='inner-permission-title'>Camera View </span>
                </div>

                <div className='col-xl-2'>
                  <div className='permission-check-box d-block w-100 text-center'>
                    <Activecheckbox />
                  </div>
                </div>

                <div className='col-xl-2'>
                  <div className='permission-check-box d-block w-100 text-center'>
                    <Checkbox01 />
                  </div>
                </div>

                <div className='col-xl-2'>
                  <div className='permission-check-box d-block w-100 text-center'>
                    <Activecheckbox />
                  </div>
                </div>

                <div className='col-xl-2'>
                  <div className='permission-check-box d-block w-100 text-center'>
                    <Checkbox01 />
                  </div>
                </div>

                <div className='col-xl-1'>
                  <div className='permission-check-box d-block w-100 text-center'>
                    <Activecheckbox />
                  </div>
                </div>
              </div>
              <hr className='my-0 row' />
              <div className='row align-items-center'>
                <div className='col'>
                  <span className='inner-permission-title'> Camera Edit</span>
                </div>

                <div className='col-xl-2'>
                  <div className='permission-check-box d-block w-100 text-center'>
                    <Activecheckbox />
                  </div>
                </div>

                <div className='col-xl-2'>
                  <div className='permission-check-box d-block w-100 text-center'>
                    <Checkbox01 />
                  </div>
                </div>

                <div className='col-xl-2'>
                  <div className='permission-check-box d-block w-100 text-center'>
                    <Activecheckbox />
                  </div>
                </div>

                <div className='col-xl-2'>
                  <div className='permission-check-box d-block w-100 text-center'>
                    <Checkbox01 />
                  </div>
                </div>

                <div className='col-xl-1'>
                  <div className='permission-check-box d-block w-100 text-center'>
                    <Activecheckbox />
                  </div>
                </div>
              </div>
              <hr className='my-0 row' />

              <div className='row align-items-center'>
                <div className='col'>
                  <span className='inner-permission-title'>Camera Update </span>
                </div>

                <div className='col-xl-2'>
                  <div className='permission-check-box d-block w-100 text-center'>
                    <Activecheckbox />
                  </div>
                </div>

                <div className='col-xl-2'>
                  <div className='permission-check-box d-block w-100 text-center'>
                    <Checkbox01 />
                  </div>
                </div>

                <div className='col-xl-2'>
                  <div className='permission-check-box d-block w-100 text-center'>
                    <Activecheckbox />
                  </div>
                </div>

                <div className='col-xl-2'>
                  <div className='permission-check-box d-block w-100 text-center'>
                    <Checkbox01 />
                  </div>
                </div>

                <div className='col-xl-1'>
                  <div className='permission-check-box d-block w-100 text-center'>
                    <Activecheckbox />
                  </div>
                </div>
              </div>
              <hr className='my-0 row' />

              <div className='row align-items-center'>
                <div className='col'>
                  <span className='inner-permission-title'>Camera Delete </span>
                </div>

                <div className='col-xl-2'>
                  <div className='permission-check-box d-block w-100 text-center'>
                    <Activecheckbox />
                  </div>
                </div>

                <div className='col-xl-2'>
                  <div className='permission-check-box d-block w-100 text-center'>
                    <Checkbox01 />
                  </div>
                </div>

                <div className='col-xl-2'>
                  <div className='permission-check-box d-block w-100 text-center'>
                    <Activecheckbox />
                  </div>
                </div>

                <div className='col-xl-2'>
                  <div className='permission-check-box d-block w-100 text-center'>
                    <Checkbox01 />
                  </div>
                </div>

                <div className='col-xl-1'>
                  <div className='permission-check-box d-block w-100 text-center'>
                    <Activecheckbox />
                  </div>
                </div>
              </div>
              <hr className='my-0 row' />

              <div className='row align-items-center'>
                <div className='col'>
                  <span className='inner-permission-title'> Camera Add</span>
                </div>

                <div className='col-xl-2'>
                  <div className='permission-check-box d-block w-100 text-center'>
                    <Activecheckbox />
                  </div>
                </div>

                <div className='col-xl-2'>
                  <div className='permission-check-box d-block w-100 text-center'>
                    <Checkbox01 />
                  </div>
                </div>

                <div className='col-xl-2'>
                  <div className='permission-check-box d-block w-100 text-center'>
                    <Activecheckbox />
                  </div>
                </div>

                <div className='col-xl-2'>
                  <div className='permission-check-box d-block w-100 text-center'>
                    <Checkbox01 />
                  </div>
                </div>

                <div className='col-xl-1'>
                  <div className='permission-check-box d-block w-100 text-center'>
                    <Activecheckbox />
                  </div>
                </div>
              </div>
              <hr className='my-0 row' />

              <div className='row align-items-center'>
                <div className='col'>
                  <span className='inner-permission-title'>Keyboard View </span>
                </div>

                <div className='col-xl-2'>
                  <div className='permission-check-box d-block w-100 text-center'>
                    <Activecheckbox />
                  </div>
                </div>

                <div className='col-xl-2'>
                  <div className='permission-check-box d-block w-100 text-center'>
                    <Checkbox01 />
                  </div>
                </div>

                <div className='col-xl-2'>
                  <div className='permission-check-box d-block w-100 text-center'>
                    <Activecheckbox />
                  </div>
                </div>

                <div className='col-xl-2'>
                  <div className='permission-check-box d-block w-100 text-center'>
                    <Checkbox01 />
                  </div>
                </div>

                <div className='col-xl-1'>
                  <div className='permission-check-box d-block w-100 text-center'>
                    <Activecheckbox />
                  </div>
                </div>
              </div>
              <hr className='my-0 row' />

              <div className='row align-items-center'>
                <div className='col'>
                  <span className='inner-permission-title'> Keyboard Edit</span>
                </div>

                <div className='col-xl-2'>
                  <div className='permission-check-box d-block w-100 text-center'>
                    <Activecheckbox />
                  </div>
                </div>

                <div className='col-xl-2'>
                  <div className='permission-check-box d-block w-100 text-center'>
                    <Checkbox01 />
                  </div>
                </div>

                <div className='col-xl-2'>
                  <div className='permission-check-box d-block w-100 text-center'>
                    <Activecheckbox />
                  </div>
                </div>

                <div className='col-xl-2'>
                  <div className='permission-check-box d-block w-100 text-center'>
                    <Checkbox01 />
                  </div>
                </div>

                <div className='col-xl-1'>
                  <div className='permission-check-box d-block w-100 text-center'>
                    <Activecheckbox />
                  </div>
                </div>
              </div>
            </div>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel square expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
          <ExpansionPanelSummary
            aria-controls='panel3d-content'
            id='panel3d-header'
            className='permission-header'
            // expandIcon={<ExpandMoreIcon />}
          >
            <div className='permission-table-header'>
              <span> Management</span>
            </div>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <div className='d-block w-100 tab-inner-content-details'>
              <div className='row align-items-center'>
                <div className='col'>
                  <span className='inner-permission-title'> Camera View </span>
                </div>

                <div className='col-xl-2'>
                  <div className='permission-check-box d-block w-100 text-center'>
                    <Activecheckbox />
                  </div>
                </div>

                <div className='col-xl-2'>
                  <div className='permission-check-box d-block w-100 text-center'>
                    <Activecheckbox />
                  </div>
                </div>
                <div className='col-xl-2'>
                  <div className='permission-check-box d-block w-100 text-center'>
                    <Checkbox01 />
                  </div>
                </div>

                <div className='col-xl-2'>
                  <div className='permission-check-box d-block w-100 text-center'>
                    <Checkbox01 />
                  </div>
                </div>

                <div className='col-xl-1'>
                  <div className='permission-check-box d-block w-100 text-center'>
                    <Activecheckbox />
                  </div>
                </div>
              </div>
              <hr className='my-0 row' />
              <div className='row align-items-center'>
                <div className='col'>
                  <span className='inner-permission-title'> Camera Edit </span>
                </div>

                <div className='col-xl-2'>
                  <div className='permission-check-box d-block w-100 text-center'>
                    <Activecheckbox />
                  </div>
                </div>

                <div className='col-xl-2'>
                  <div className='permission-check-box d-block w-100 text-center'>
                    <Activecheckbox />
                  </div>
                </div>

                <div className='col-xl-2'>
                  <div className='permission-check-box d-block w-100 text-center'>
                    <Checkbox01 />
                  </div>
                </div>

                <div className='col-xl-2'>
                  <div className='permission-check-box d-block w-100 text-center'>
                    <Checkbox01 />
                  </div>
                </div>

                <div className='col-xl-1'>
                  <div className='permission-check-box d-block w-100 text-center'>
                    <Activecheckbox />
                  </div>
                </div>
              </div>
              <hr className='my-0 row' />

              <div className='row align-items-center'>
                <div className='col'>
                  <span className='inner-permission-title'> Camera Update</span>
                </div>

                <div className='col-xl-2'>
                  <div className='permission-check-box d-block w-100 text-center'>
                    <Activecheckbox />
                  </div>
                </div>

                <div className='col-xl-2'>
                  <div className='permission-check-box d-block w-100 text-center'>
                    <Checkbox01 />
                  </div>
                </div>

                <div className='col-xl-2'>
                  <div className='permission-check-box d-block w-100 text-center'>
                    <Activecheckbox />
                  </div>
                </div>

                <div className='col-xl-2'>
                  <div className='permission-check-box d-block w-100 text-center'>
                    <Checkbox01 />
                  </div>
                </div>

                <div className='col-xl-1'>
                  <div className='permission-check-box d-block w-100 text-center'>
                    <Activecheckbox />
                  </div>
                </div>
              </div>
              <hr className='my-0 row' />

              <div className='row align-items-center'>
                <div className='col'>
                  <span className='inner-permission-title'>Camera Delete</span>
                </div>

                <div className='col-xl-2'>
                  <div className='permission-check-box d-block w-100 text-center'>
                    <Activecheckbox />
                  </div>
                </div>

                <div className='col-xl-2'>
                  <div className='permission-check-box d-block w-100 text-center'>
                    <Checkbox01 />
                  </div>
                </div>

                <div className='col-xl-2'>
                  <div className='permission-check-box d-block w-100 text-center'>
                    <Activecheckbox />
                  </div>
                </div>

                <div className='col-xl-2'>
                  <div className='permission-check-box d-block w-100 text-center'>
                    <Checkbox01 />
                  </div>
                </div>

                <div className='col-xl-1'>
                  <div className='permission-check-box d-block w-100 text-center'>
                    <Activecheckbox />
                  </div>
                </div>
              </div>
              <hr className='my-0 row' />

              <div className='row align-items-center'>
                <div className='col'>
                  <span className='inner-permission-title'> Camera Add</span>
                </div>

                <div className='col-xl-2'>
                  <div className='permission-check-box d-block w-100 text-center'>
                    <Activecheckbox />
                  </div>
                </div>

                <div className='col-xl-2'>
                  <div className='permission-check-box d-block w-100 text-center'>
                    <Checkbox01 />
                  </div>
                </div>

                <div className='col-xl-2'>
                  <div className='permission-check-box d-block w-100 text-center'>
                    <Activecheckbox />
                  </div>
                </div>

                <div className='col-xl-2'>
                  <div className='permission-check-box d-block w-100 text-center'>
                    <Checkbox01 />
                  </div>
                </div>

                <div className='col-xl-1'>
                  <div className='permission-check-box d-block w-100 text-center'>
                    <Activecheckbox />
                  </div>
                </div>
              </div>
              <hr className='my-0 row' />

              <div className='row align-items-center'>
                <div className='col'>
                  <span className='inner-permission-title'> Keyboard View </span>
                </div>

                <div className='col-xl-2'>
                  <div className='permission-check-box d-block w-100 text-center'>
                    <Activecheckbox />
                  </div>
                </div>

                <div className='col-xl-2'>
                  <div className='permission-check-box d-block w-100 text-center'>
                    <Checkbox01 />
                  </div>
                </div>

                <div className='col-xl-2'>
                  <div className='permission-check-box d-block w-100 text-center'>
                    <Activecheckbox />
                  </div>
                </div>

                <div className='col-xl-2'>
                  <div className='permission-check-box d-block w-100 text-center'>
                    <Checkbox01 />
                  </div>
                </div>

                <div className='col-xl-1'>
                  <div className='permission-check-box d-block w-100 text-center'>
                    <Activecheckbox />
                  </div>
                </div>
              </div>
              <hr className='my-0 row' />

              <div className='row align-items-center'>
                <div className='col'>
                  <span className='inner-permission-title'> Keyboard Edit</span>
                </div>

                <div className='col-xl-2'>
                  <div className='permission-check-box d-block w-100 text-center'>
                    <Activecheckbox />
                  </div>
                </div>

                <div className='col-xl-2'>
                  <div className='permission-check-box d-block w-100 text-center'>
                    <Checkbox01 />
                  </div>
                </div>

                <div className='col-xl-2'>
                  <div className='permission-check-box d-block w-100 text-center'>
                    <Activecheckbox />
                  </div>
                </div>

                <div className='col-xl-2'>
                  <div className='permission-check-box d-block w-100 text-center'>
                    <Checkbox01 />
                  </div>
                </div>

                <div className='col-xl-1'>
                  <div className='permission-check-box d-block w-100 text-center'>
                    <Activecheckbox />
                  </div>
                </div>
              </div>
            </div>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </div>
    </div>
  )
}

export function Checkbox01() {
  const [state, setState] = React.useState({
    checkedB: true,
  })

  const handleChange = (name) => (event) => {
    setState({...state, [name]: event.target.checked})
  }
  return (
    <div className='clearfix'>
      <Checkbox
        onChange={handleChange('checkedA')}
        value='checkedA'
        inputProps={{
          'aria-label': 'primary checkbox',
        }}
      />
    </div>
  )
}

export function Activecheckbox() {
  const [state, setState] = React.useState({
    checkedB: true,
  })

  const handleChange = (name) => (event) => {
    setState({...state, [name]: event.target.checked})
  }
  return (
    <div className='clearfix'>
      <Checkbox
        checked={state.checkedB}
        onChange={handleChange('checkedB')}
        value='checkedB'
        inputProps={{
          'aria-label': 'primary checkbox',
        }}
      />
    </div>
  )
}
