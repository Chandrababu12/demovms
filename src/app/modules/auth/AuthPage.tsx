/* eslint-disable jsx-a11y/anchor-is-valid */
import { useEffect } from 'react'
import React from 'react';
import { Outlet, Route, Routes } from 'react-router-dom'
import { Registration } from './components/Registration'
import { ForgotPassword } from './components/ForgotPassword'
import { Login } from './components/Login'
import { toAbsoluteUrl } from '../../../_metronic/helpers'
import { Link } from '@material-ui/core'
import Button from '@material-ui/core/Button';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';

const AuthLayout = () => {
  useEffect(() => {
    document.body.classList.add('bg-body')
    return () => {
      document.body.classList.remove('bg-body')
    }
  }, [])

  return (

    <div className='row m-0 h-100'>
      <div className='col-md-6 align-items-center d-flex'>
        <div
          className='d-flex flex-column flex-column-fluid justify-content-center'
        // style={{
        //   backgroundImage: `url(${toAbsoluteUrl('/media/illustrations/sketchy-1/14.png')})`,
        // }}
        >
          {/* begin::Content */}
          <div className='d-flex flex-center flex-column flex-column-fluid  p-10  p-lg-10'>
            {/* begin::Logo */}
            {/* <a href='#' className='mb-12'>
              <img alt='Logo' src={toAbsoluteUrl('/media/logos/default.png')} className='h-45px' />
            </a> */}
            {/* end::Logo */}
            {/* begin::Wrapper */}
            <div className='w-lg-500px bg-body rounded shadow-sm  p-10  p-lg-10 mx-auto'>
              <Outlet />
            </div>
            {/* end::Wrapper */}
          </div>
          {/* end::Content */}
          {/* begin::Footer */}
          <div className='d-flex justify-content-between flex-column-auto py-5 pt-0 w-lg-500px py-lg-5 pt-lg-0 mx-auto'>
            <div className='language'>
              <Language />
            </div>
            <div className='contact-details-footer'>
              <div className='d-flex align-items-center fw-bold fs-6'>
                <a href='#' className='text-muted text-hover-primary px-2'>
                  About
                </a>

                <a href='#' className='text-muted text-hover-primary px-2'>
                  Contact
                </a>

                <a href='#' className='text-muted text-hover-primary px-2'>
                  Contact Us
                </a>
              </div>
            </div>
          </div>
          {/* end::Footer */}
        </div>
      </div>
      <div className='col-md-6 auth-page-background'          
      style={{
          backgroundImage: `url(${toAbsoluteUrl('/media/surveillances/background.Splash.png')})`,
        }}>

        

      </div>
    </div>

  )
}

const AuthPage = () => (
  <Routes>
    <Route element={<AuthLayout />}>
      <Route path='login' element={<Login />} />
      <Route path='registration' element={<Registration />} />
      <Route path='forgot-password' element={<ForgotPassword />} />
      <Route index element={<Login />} />
    </Route>
  </Routes>
)

export { AuthPage }


export function Language() {

  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

  function handleToggle() {
    setOpen(prevOpen => !prevOpen);
  }

  function handleClose() {
    if (anchorRef.current && anchorRef.current) {
      return;
    }

    setOpen(false);
  }

  return (
    <div className="d-flex">
      <div>
        <span
          ref={anchorRef}
          aria-controls="menu-list-grow"
          aria-haspopup="true"
          onClick={handleToggle}
          className='language-arrow'
        >
          English <img className='ms-1' src="../media/surveillances/down-arrow.svg" alt="icon" />
          </span>
        <Popper open={open} anchorEl={anchorRef.current} keepMounted transition disablePortal>
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
            >
              <Paper id="menu-list-grow">
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList>
                    <MenuItem onClick={handleClose}>French</MenuItem>
                    <MenuItem onClick={handleClose}>Japanese</MenuItem>
                    <MenuItem onClick={handleClose}>Hindi</MenuItem>
                    <MenuItem onClick={handleClose}>Tamil</MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </div>
    </div>
  )
}