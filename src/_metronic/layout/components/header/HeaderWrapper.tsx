/* eslint-disable react-hooks/exhaustive-deps */
import clsx from 'clsx'
import { Link } from 'react-router-dom'
import { KTIcon, toAbsoluteUrl } from '../../../helpers'
import { useLayout } from '../../core'
import { Navbar } from './Navbar'

export function HeaderWrapper() {
  const { config, classes } = useLayout()
  if (!config.app?.header?.display) {
    return null
  }

  return (
    <div id='kt_app_header' className='app-header'>
      <div
        id='kt_app_header_container'
        className={clsx(
          'app-container flex-lg-grow-1',
          classes.headerContainer.join(' '),
          config.app?.header?.default?.containerClass
        )}
      >
        {config.app.sidebar?.display && (
          <>
            <div
              className='d-flex align-items-center d-lg-none ms-n2 me-2'
              title='Show sidebar menu'
            >
              <div
                className='btn btn-icon btn-active-color-primary w-30px h-35px'
                id='kt_app_sidebar_mobile_toggle'
              >
                <KTIcon iconName='abstract-14' className=' fs-1' />
              </div>
              <div className='d-flex align-items-center flex-grow-1 flex-lg-grow-0'>
                <Link to='/dashboard' className='d-lg-none'>
                  <img
                    alt='Logo'
                    src={toAbsoluteUrl('/media/logos/default-small.png')}
                    className='h-30px'
                  />
                </Link>
              </div>
            </div>
          </>
        )}

        {!(config.layoutType === 'dark-sidebar' || config.layoutType === 'light-sidebar') && (
          <div className='d-flex align-items-center flex-grow-1 flex-lg-grow-0 me-lg-15'>
            <Link to='/dashboard'>
              {config.layoutType !== 'dark-header' ? (
                <img
                  alt='Logo'
                  src={toAbsoluteUrl('/media/logos/default-dark.png')}
                  className='h-35px h-lg-30px app-sidebar-logo-default'
                />
              ) : (
                <>
                  <img
                    alt='Logo'
                    src={toAbsoluteUrl('/media/logos/default-dark.png')}
                    className='h-35px h-lg-30px app-sidebar-logo-default theme-light-show'
                  />
                  <img
                    alt='Logo'
                    src={toAbsoluteUrl('/media/logos/default-small.png')}
                    className='h-35px h-lg-30px app-sidebar-logo-default theme-dark-show'
                  />
                </>
              )}
            </Link>
          </div>
        )}

        <div
          id='kt_app_header_wrapper'
          className='d-flex align-items-stretch justify-content-between flex-lg-grow-1'
        >
          {config.app.header.default?.content === 'menu' &&
            config.app.header.default.menu?.display && (
              <div
                className='app-header-menu app-header-mobile-drawer align-items-stretch'
                data-kt-drawer='true'
                data-kt-drawer-name='app-header-menu'
                data-kt-drawer-activate='{default: true, lg: false}'
                data-kt-drawer-overlay='true'
                data-kt-drawer-width='150px'
                data-kt-drawer-direction='end'
               
              >
                { /*<div className='left-side-top-nav'>
                  <div className='d-flex align-items center gap-5 mt-10'>
                    <span> <img src="media/surveillances/microphone.svg" alt="" /></span>
                    <span> <img src="media/surveillances/fluent_video-20-filled.svg" alt="" /></span>
                    <span> <img src="media/surveillances/fa6-solid_rotate-right.svg" alt="" /></span>
                  </div>
            </div> */}
              </div>
            )}
          <Navbar />
        </div>
      </div>
    </div>
  )
}
