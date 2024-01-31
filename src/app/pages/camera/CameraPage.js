import React from 'react'
import {AddCameraSetting} from './CameraSetting'

export default function CameraPage() {
  return (
    <div className='d-block'>
      <div className='row justify-content-md-center'>
        <div className='col-md-8'>
          <div className='camera-modal '>
            <div className='add-camera-setting'>
              <AddCameraSetting />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
