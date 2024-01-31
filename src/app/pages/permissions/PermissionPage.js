import React, { useState} from 'react'
import {Formik, Field, Form} from 'formik'
import {
  AppBar,
  Tabs,
  Tab,
 
} from '@material-ui/core'
// import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import {Modal, Button, OverlayTrigger, Tooltip} from 'react-bootstrap'
// import * as Yup from 'yup'
import {FormattedMessage, useIntl} from 'react-intl'
import {TabContainer} from '../../components/TabContainer'
import SettingsPermissionTwo from './Permisson'

export default function SettingsPermission() {
  const [btnLoading, setBtnLoading] = useState(false)
  const [isOpenPopup, setOpenPopup] = useState(false)
  const [isDeletePopup, setDeletePopup] = useState(false)
  const [value, setValue] = useState(null)
  const [val, setVal] = useState(0)

  function handleClick() {
    setValue(null)
    setOpenPopup(true)
  }

  const handleChange = (event, newValue) => {
    if (newValue === 0) {
      setVal(newValue)
    } else {
      setVal(newValue)
    }
  }

  function handleClose() {
    setOpenPopup(false)
  }

  function handleDeleteClose() {
    setDeletePopup(false)
  }

  const roleDelete = (values) => {
    setValue(values)
    setDeletePopup(true)
  }

  const roleEdit = (values) => {
    setValue(values)
    setOpenPopup(true)
  }

  return (
    <div className='pat_list'>
      <div className='d-block'>
        <div className='book-appointment-info com-tab'>
          <AppBar position='static' color='default' id='tabs' className='mt-0'>
            <Tabs
              value={val}
              onChange={handleChange}
              indicatorColor='secondary'
              textColor='secondary'
              scrollButtons='auto'
            >
              <Tab label='Permission' />
              <Tab label='Role' />
            </Tabs>
          </AppBar>
          <div className='account-security'>
            <div className='setting-page-business-info mt-5'>
              <div className='permission-page-setting'>
                <div className='row align-items-center'>
                  <div className='col-lg-10 col-xl-10 col-xxl-10 col-md-10 '>
                    <div className='business-header-content'>
                      <span className='title d-block mb-3 text-uppercase'>
                        {val === 0 ? 'Permission' : 'Role'}
                      </span>
                      <span className='sub-text d-block mb-5'>
                        In publishing and graphic design, lorem ipsum is a placeholder text commonly
                        used to the visual form of a document or a typeface without relying on
                        meaningful content.
                      </span>
                    </div>
                  </div>
                  {val === 1 && (
                    <div className='col-lg-2 col-xl-2 col-xxl-2 col-md-2'>
                      <div className='permission-setting-page text-right patientButton'>
                        <Button
                          variant='contained'
                          className='btn btn-primary rounded-pill'
                          onClick={handleClick}
                        >
                          AddNew
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              {isOpenPopup && (
                <AddRole
                  handleClose={handleClose}
                  open={isOpenPopup}
                  value={value}
                  btnLoading={btnLoading}
                />
              )}
              {isDeletePopup && (
                <DeleteRole
                  handleClose={handleDeleteClose}
                  open={isDeletePopup}
                  deleteValue={value}
                  btnLoading={btnLoading}
                />
              )}
            </div>
          </div>
          {val === 0 && (
            <TabContainer>
          <SettingsPermissionTwo />
            </TabContainer>
          )}
          {val === 1 && (
            // Row tab details ui
            <TabContainer>
              <div className='clearfix'>
                <div className='role-tabs'>
                  <div className='d-block w-100 setting-profile-login-provider role-tabs-header'>
                    <div className='row '>
                      <div className='col-lg-10 col '>
                        <span className='d-block payment-tax'>Type</span>
                      </div>
                      <div className='col-lg-2 col text-center'>
                        <span className='d-block payment-tax'>Action</span>
                      </div>
                    </div>
                  </div>
                  <div className='d-block w-100 setting-profile-login-provider'>
                    <div className='row  align-items-center border-bottom p-2'>
                      <div className='col-lg-10 col'>Role 1</div>

                      <div className='col-lg-2 col'>
                        <div className='d-flex align-items-center justify-content-center'>
                          <ul
                            className='appointment-edit d-flex m-0 p-0'
                            style={{listStyle: 'none'}}
                          >
                            <li className='mx-3'>
                              <OverlayTrigger
                                placement='top'
                                overlay={
                                  <Tooltip id='quick-search-tooltip' className='tool_bg'>
                                    Edit
                                  </Tooltip>
                                }
                              >
                                <div>
                                  <img
                                    src='/media/patients/blue_edit_icon.svg'
                                    alt={"Edit"}
                                    onClick={() => roleEdit()}
                                  />
                                </div>
                              </OverlayTrigger>
                            </li>
                            <li className='mx-3'>
                              <OverlayTrigger
                                placement='top'
                                overlay={
                                  <Tooltip id='quick-search-tooltip' className='tool_bg'>
                                    Delete
                                  </Tooltip>
                                }
                              >
                                <div>
                                  <img
                                    src='/media/patients/blue_delete_icon.svg'
                                    alt={"Delete"}
                                    onClick={() => roleDelete()}
                                  />
                                </div>
                              </OverlayTrigger>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TabContainer>
          )}
        </div>
      </div>
    </div>
  )
}

export function DeleteRole(props) {
  const {handleClose, open, deleteValue, deleteRole} = props

  return (
    <>
      <Modal show={open} onHide={handleClose} className='setting-page-modal-box'>
        <Modal.Header className='text-center justify-content-center' closeButton>
          <Modal.Title className='text-center'>
            <FormattedMessage id='DELETE.ROLE' />
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className='py-1'>
          <div className='form-group mt-3'>
            <label className='form-label d-block payment-tax'>
              <FormattedMessage id='ALERT.MSG.DELETING.ROLE' />
            </label>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant='primary'
            className='add-new-tax'
            type='submit'
            onClick={() => deleteRole(deleteValue)}
          >
            <FormattedMessage id='BUSINESS.YES' />
          </Button>
          <Button variant='secondary' className='cancel_add_new_tax' onClick={handleClose}>
            <FormattedMessage id='BUSINESS.NO' />
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export function AddRole(props) {
  const {handleClose, open, value} = props
  const intl = useIntl()
  const [isChange, setIsChange] = useState(false)

  const initialValues = {
    name: '',
  }

  return (
    <>
      <Modal show={open} onHide={handleClose} className='setting-page-modal-box'>
        <Formik
          initialValues={value || initialValues}
          enableReinitialize={true}
          validateOnChange={isChange}
          validateOnBlur={isChange}
        >
          {({values, setFieldValue, handleSubmit, handleChange, touched, errors}) => {
            return (
              <Form
                className='form fv-plugins-framework'
                onSubmit={handleSubmit}
                onChange={handleChange}
              >
                <Modal.Header className='text-center justify-content-center' closeButton>
                  <Modal.Title className='text-center'>
                    {value ? (
                      <FormattedMessage id='EDIT.ROLE' />
                    ) : (
                      <FormattedMessage id='ADD.ROLE' />
                    )}
                  </Modal.Title>
                </Modal.Header>
                <Modal.Body className='py-1'>
                  <div className='form-group mt-3 mb-4'>
                    <div className='d-flex row'>
                      <div className='col-md-12'>
                        <label className='form-label d-block payment-tax'>
                          <FormattedMessage id='DETAILS.NAME' />*
                        </label>
                        <Field
                          type='text'
                          className='form-control'
                          name='name'
                          placeholder={intl.formatMessage({id: 'DETAILS.NAME'})}
                          value={values.name || ''}
                        />
                      </div>
                    </div>
                  </div>
                </Modal.Body>
                <Modal.Footer>
                  <input
                    type='button'
                    variant='secondary'
                    className='cancel_add_new_tax'
                    onClick={handleClose}
                    value={intl.formatMessage({id: 'CANCEL.LABLE'})}
                  />

                  <Button variant='primary' className='add-new-tax' type='submit'>
                    <FormattedMessage id='COST.SAVE' />
                  </Button>
                </Modal.Footer>
              </Form>
            )
          }}
        </Formik>
      </Modal>
    </>
  )
}

export function Checkbox01(props) {
  const {checked, permission_id, handleChangeCheckBox, roleIndex, disable} = props
  const [state, setState] = React.useState({
    checkedB: checked || false,
  })
  const handleChange = (event) => {
    setState({...state, checkedB: event.target.checked})
    handleChangeCheckBox(event.target.checked, permission_id, roleIndex)
  }
  return (
    <div className='d-block'>
      {/* <Checkbox
        value={state.checkedB}
        inputProps={{
          "aria-label": "primary checkbox",
        }}
      /> */}

      <div className='checkbox-permission-custom'>
        <label className='container'>
          <input
            type='checkbox'
            onChange={handleChange}
            disabled={disable}
            checked={state.checkedB}
          />
          <span className='checkmark'></span>
        </label>
      </div>
    </div>
  )
}
