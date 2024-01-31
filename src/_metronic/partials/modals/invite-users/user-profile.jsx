import React, { useState } from 'react';

const UserProfile = ({ isOpen, onClose, onSave }) => {
    const [editFormData, setEditFormData] = useState({
        username: '',
        email: '',
        password: '',
    });

    const handleSaveChanges = () => {
        // Add logic to save changes, e.g., make an API call using axios
        onSave(editFormData);
        onClose();
    };

    const handleCancelEdit = () => {
        // Reset the editFormData and close the form
        setEditFormData({
            username: '',
            email: '',
            password: '',
        });
        onClose();
    };

    return (
        <div className={`user-profile-popup ${isOpen ? 'open' : ''}`}>
            <div className='form-group'>
                <label className='font-weight-bold'>Username:</label>
                <input
                    type='text'
                    value={editFormData.username}
                    onChange={(e) => setEditFormData({ ...editFormData, username: e.target.value })}
                    className='form-control form-control-solid border border-dark'
                />
            </div>

            {/* Add similar blocks for other input fields (e.g., email, password) */}
            {/* ... */}

            <div className='d-flex py-1 align-items-center justify-content-between'>
                <button className='edit-name' onClick={handleSaveChanges}>
                    Save Changes
                </button>
                <button className='edit-name' onClick={handleCancelEdit}>
                    Cancel
                </button>
            </div>
        </div>
    );
};

export default UserProfile;
