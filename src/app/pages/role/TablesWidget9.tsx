import React, { useState, useEffect } from 'react';
import axios from 'axios';

type Props = {
  className: string;
};

interface RoleData {
  id: string;
  name: string;
}

interface PermissionData {
  id: string;
  name: string;
}

const INSERT_ROLE_PERMISSION_MUTATION = `
  mutation InsertRolePermission(
    $permission_ids: Int!,
    $role_ids: Int!,
    $created_by: String!,
    $deleted_by: String!,
    $modified_by: String!,
    $deleted_at: String!,
    $modified_at: String!
  ) {
    insert_role_permission(objects: {
      permission_ids: $permission_ids,
      role_ids: $role_ids,
      created_by: $created_by,
      deleted_by: $deleted_by,
      modified_by: $modified_by,
      deleted_at: $deleted_at,
      modified_at: $modified_at
    }) {
      affected_rows
      returning {
        id
      }
    }
  }
`;

const TablesWidget9: React.FC<Props> = ({ className }) => {
  const [roleData, setRoleData] = useState<RoleData[]>([]);
  const [permissionData, setPermissionData] = useState<PermissionData[]>([]);
  const [checkedPermissions, setCheckedPermissions] = useState<{ roleId: string; permissionId: string }[]>([]);
  const [loading, setLoading] = useState(true);

  const hasuraAccessKey = process.env.REACT_APP_ADMIN_SECRET_KEY || '';

  useEffect(() => {
    if (!hasuraAccessKey) {
      console.error('REACT_APP_ADMIN_SECRET_KEY is undefined');
      return;
    }

    const fetchData = async () => {
      try {
        const headers = {
          'x-hasura-access-key': hasuraAccessKey,
        };

        const queries = [
          { query: `query GetPermission { permission { id name } }` },
          { query: `query GetRoles { role { id name } }` }
        ];

        const [permissionResponse, roleResponse] = await Promise.all(
          queries.map(query => axios.post(process.env.REACT_APP_BASE_URL!, query, { headers }))
        );

        setPermissionData(permissionResponse.data.data.permission);
        setRoleData(roleResponse.data.data.role);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    hasuraAccessKey && fetchData();
  }, [hasuraAccessKey]);

  const handleCheckboxChange = async (permissionId: string, roleId: string) => {
    const isChecked = checkedPermissions.some(cp => cp.permissionId === permissionId && cp.roleId === roleId);

    try {
      if (isChecked) {
        console.log('Checkbox unchecked. Logic to remove record can be added here.');
        // Add logic here if you want to remove the record when unchecked
      } else {
        const variables = {
          permission_ids: parseInt(permissionId, 10),
          role_ids: parseInt(roleId, 10),
          created_by: "",  // Set appropriate value if needed
          deleted_by: "",
          modified_by: "",
          deleted_at: "",
          modified_at: ""
        };

        await axios.post(
          process.env.REACT_APP_BASE_URL!,
          {
            query: INSERT_ROLE_PERMISSION_MUTATION,
            variables
          },
          {
            headers: {
              'x-hasura-access-key': hasuraAccessKey
            }
          }
        );

        setCheckedPermissions(prev => [...prev, { roleId, permissionId }]);
      }
    } catch (error) {
      console.error('Error handling checkbox change:', error);
    }
  };

  return (
    <div className={`card ${className}`} style={{ backgroundColor: '#0d0d0f', color: 'white' }}>
      <div className='card-body py-3'>
        <div className='table-responsive'>
          <table className='table table-row-dashed table-row-gray-100 align-middle gs-0 gy-4'>
            <thead>
              <tr className='fw-bold text-muted fs-5'>
                <th className='min-w-150px'>Permission</th>
                {roleData.map((role) => (
                  <th key={role.id} className='min-w-150px'>
                    <label htmlFor={`role-${role.id}`} className="ms-2">{role.name}</label>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {permissionData.map((permission) => (
                <tr key={permission.id}>
                  <td>
                    <div className='d-flex align-items-center'>
                      <div className='d-flex justify-content-start flex-column ms-3'>
                        <span className='text-muted fw-semibold text-muted d-block fs-6'>{permission.name}</span>
                      </div>
                    </div>
                  </td>
                  {roleData.map((role) => (
                    <td key={`${permission.id}-${role.id}`}>
                      <input 
                        type="checkbox" 
                        id={`checkbox-${permission.id}-${role.id}`} 
                        checked={checkedPermissions.some(cp => cp.permissionId === permission.id && cp.roleId === role.id)}
                        onChange={() => handleCheckboxChange(permission.id, role.id)}
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export { TablesWidget9 };
