import { useEffect, useState } from 'react';
import axios from 'axios';
import clsx from 'clsx';
import { FC } from 'react';
import { toAbsoluteUrl } from '../../../../../../../_metronic/helpers';
import { User } from '../../core/_models';

type Props = {
  user: User;
};

interface UserData {
  id: string;
  created_by: string;
  deleted_by: string;
  email: string;
  encryption_key: string;
  modified_by: string;
  password: string;
  user: string;
  created_on: string;
  deleted_on: string;
  modified_on: string;
}
const UserInfoCell: FC<Props> = ({ user }) => {
  const [userData, setUserData] = useState<UserData[]>([]);
  const hasuraAccessKey = process.env.REACT_APP_ADMIN_SECRET_KEY;

  const fetchUserData = async () => {
    try {
      if (!hasuraAccessKey) {
        console.error('REACT_APP_ADMIN_SECRET_KEY is undefined');
        return;
      }

      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}`,
        {
          query: `
            query GetUsers {
              user {
                id
                created_by
                deleted_by
                email
                encryption_key
                modified_by
                password
                user
                created_on
                deleted_on
                modified_on
              }
            }
          `,
        },
        {
          headers: {
            'x-hasura-access-key': hasuraAccessKey,
          },
        }
      );

      if (response.data.errors) {
        console.error('GraphQL Errors:', response.data.errors);
        return;
      }

      const fetchedUserData = response.data.data.user;

      setUserData(fetchedUserData);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, [hasuraAccessKey]);

  return (
    <div>
      {userData.map((userDataItem: UserData) => (
        <div key={userDataItem.id} className='d-flex align-items-center'>
          {/* begin:: Avatar */}
          <div className='symbol symbol-circle symbol-50px overflow-hidden me-3'>
            <a href='#'>
              {userDataItem.user ? (
                <div className='symbol-label'>
                  <img
                    src={toAbsoluteUrl(`/media/${userDataItem.user.charAt(0).toUpperCase()}.png`)}
                    alt={userDataItem.user || 'User Avatar'}
                    className='w-100'
                  />
                </div>
              ) : (
                <div
                  className={clsx(
                    'symbol-label fs-3',
                    'bg-light-primary',
                    'text-primary'
                  )}
                >
                  {userDataItem.user.charAt(0).toUpperCase()}
                </div>
              )}
            </a>
          </div>
          <div className='d-flex flex-column'>
            {userDataItem.user && (
              <a href='#' className='text-gray-800 text-hover-primary mb-1'>
                {userDataItem.user}
              </a>
            )}
            {userDataItem.email && <span>{userDataItem.email}</span>}
          </div>
        </div>
      ))}
    </div>
  );
};

export { UserInfoCell };
