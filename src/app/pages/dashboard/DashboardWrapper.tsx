/* eslint-disable jsx-a11y/anchor-is-valid */
import { FC } from 'react'
import { useIntl } from 'react-intl'
// import { toAbsoluteUrl } from '../../../_metronic/helpers'
// import { PageTitle } from '../../../_metronic/layout/core'
// import {
//   ListsWidget2,
//   ListsWidget3,
//   ListsWidget4,
//   ListsWidget6,
//   TablesWidget5,
//   TablesWidget10,
//   MixedWidget8,
//   CardsWidget7,
//   CardsWidget17,
//   CardsWidget20,
//   ListsWidget26,
//   EngageWidget10,
// } from '../../../_metronic/partials/widgets'
import { useNavigate } from 'react-router-dom';
// import Recording from '../recording/RecordingAll'
import { DashboardLandingPage } from './Dashboard-landing-page'
// import { Button } from 'react-bootstrap'

const DashboardPage= () => (
  <>
    {/* begin::Row */}
    <div className='row g-5 g-xl-10  mb-xl-10'>

      <DashboardLandingPage />

    </div>

  </>
)

const DashboardWrapper = () => {
  const intl = useIntl()

  return (
    <>
      <PaginationNavbar />
      <DashboardPage />
    </>
  )
}
export function PaginationNavbar() {
  const navigate = useNavigate()

  const handleCameraIconClick = () => {
    // Redirect to the recording page when the camera icon is clicked
    navigate('/recordingall')
  }
  return (
    <div className='d-block text-center'>
     <div className='pagination-content d-flex justify-content-between'>
    { /* <div className="my-5">
        <span className="d-inline-block me-15">
          <img src="media/surveillances/live.svg" alt="" className="img-fluid me-4" />
          <span className="text-white fs-3">Live</span>
        </span>

        <span className="d-inline-block me-10">
          <img src="media/surveillances/playback.svg" alt="" className="img-fluid me-4" />
          <span className="text-white fs-3">Playback</span>
        </span>
  </div> */}
     { /*  <div className='view-item-box' >
          <a href="#"><span> <img src="media/surveillances/1_1.svg" alt="" /> </span> </a>
          <a href="#"><span> <img src="media/surveillances/2_2.svg" alt="" /> </span> </a>
          <a href="#"><span> <img src="media/surveillances/3_3.svg" alt="" /> </span> </a>
          <span> <img src="media/surveillances/down-arrow.svg" alt="" /> </span>
        </div> */}
      </div>
  </div> 
  
  );
}

export { DashboardWrapper };


