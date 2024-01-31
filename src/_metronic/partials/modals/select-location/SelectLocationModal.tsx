import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import { KTIcon } from '../../../helpers';

type Props = {
  data: { location: string; setLocation: Dispatch<SetStateAction<string>> };
  show: boolean;
  handleClose: () => void;
};

const SelectLocationModal: React.FC<Props> = ({ show, handleClose, data }) => {
  useEffect(() => {
    initMap();
  }, []);

  const [location, setLocation] = useState(data.location);

  const dismissLocation = () => {
    setLocation(data.location);
    handleClose();
  };

  const applyLocation = () => {
    data.setLocation(location);
    handleClose();
  };

  const initMap = () => {};

  return (
    <Modal
      className='modal fade'
      id='kt_modal_select_location'
      backdrop='static'
      tabIndex={-1}
      aria-labelledby='exampleModalLabel'
      show={show}
      onHide={dismissLocation}
    >
      <div className='modal-dialog modal-xl'>
        <div className='modal-content'>
          <div className='modal-header'>
            <h5 className='modal-title'>Select Location</h5>
            <button
              type='button'
              className='btn btn-icon btn-sm btn-active-light-primary ms-2'
              onClick={dismissLocation}
            >
              <KTIcon iconName='cross' className='fs-2x' />
            </button>
          </div>
          <div className='modal-body'>
            <input type='text' value={location} onChange={(e) => setLocation(e.target.value)} />
            <div id='kt_modal_select_location_map' className='map h-450px'></div>
          </div>
          <div className='modal-footer'>
            <button type='button' className='btn btn-light-primary' onClick={dismissLocation}>
              Cancel
            </button>
            <button type='button' className='btn btn-primary' onClick={applyLocation}>
              Apply
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export { SelectLocationModal };
