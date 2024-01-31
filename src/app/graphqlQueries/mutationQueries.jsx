// graphqlQueries.ts
export const GET_SITE_DEVICE_QUERY= `
query GetDevice {
            device {
                    id
                    name
                  
                    type_id
                    site_id
                    type {
                            id
                            name
                         }  
                    site {
                            id
                            name
                         }
                    }
            site {
                    id
                    name
                 }
                }
`;

export const GET_DEVICE_QUERY = `
  query GetDevice {
    device {
      id
      name
      active
      ip_address
      user
      password
      deleted
      server_id
      site_id
      server {
        id
        ip_address
      }
      site{
        id
        name
      }
    }
  }
`
export const INSERT_DEVICE_MUTATION = `
mutation InsertDevice($name: String!, $ip_address: String!, $user: String, $password: String, $server_id: Int, $site_id: Int, $active: Boolean) {
  insert_device(objects: {
    name: $name,
    ip_address: $ip_address,
    user: $user,
    password: $password,
    server_id: $server_id,
    site_id: $site_id,
    active: $active
  }) {
    affected_rows
    returning {
      id
      name
      ip_address
      password
      user
      server {
        id
        ip_address
      }
      site {
        id
        name
      }
      active
    }
  }
}
`;

export const GET_SERVER_QUERY=`
query GetServer{
  server {
    id
    username
    password
    status
    ip_address
    created_at
    created_by
    modified_by
    modified_at
    deleted_by
    deleted_at
    deleted
    device_id
    site_id
    site {
      id
      name
    }
  }
}
`;
export const GET_SERVERID_QUERY=`
query GetServer ($id: Int!){
  server_by_pk(id: $id) {
    id
    username
    password
    status
    ip_address
    created_at
    created_by
    modified_by
    modified_at
    deleted_by
    deleted_at
    deleted
    device_id
    site_id
    site {
      id
      name
    }
  }
}
`;

export const UPDATE_DEVICE_MUTATION = `
  mutation UpdateDevice(
    $id: oid!,
    $site_id: Int,
    $server_id: Int,
    $ip_address: String,
    $name: String,
    $devicetype: String
    $active: Boolean
  ) {
    update_device(
        where: {id: {_eq: $id}}, 
        _set: {
          site_id: $site_id, 
          server_id: $server_id, 
          ip_address: $ip_address, 
          name: $name, 
          active: $active
        }
      ) {
      affected_rows
      returning {
        active
        id
        site_id
        server_id
        ip_address
        name
        server {
          id
          ip_address
        }
        site{
          name
        }
      }
    }
  }
`

export const DELETE_DEVICE_MUTATION = `
  mutation DeleteDevice($device_id: oid!) {
    delete_device(where: { id: { _eq: $device_id } }) {
      affected_rows
    }
  }
`
export const GET_DEVICE_SITE_QUERY =  `
query GetDevicesBySiteId($siteId: Int!) {
device(where: { site_id: { _eq: $siteId } }) {
name
active
site {
name
}
}
}
`;


export const GET_SITE_QUERY = `
query GetSite {
  site {
    deleted
		status
		id
		created_by
		deleted_by
		description
		modified_by
		name
		password
		username
		deleted_on
		modified_on
		created_on
  }
}`;

export const GET_SITEID_QUERY = `
query GetSite($siteId: Int!) {
  site_by_pk(id: $siteId) {
    id
    name
    password
    username
    servers {
      id
      ip_address
    }
  }
}`;
  
export const INSERT_SITE_MUTATION = `
mutation InsertSite(
  $name: String!,
  $description: String!,
  $created_by: String,
  $modified_by: String,
  $deleted_by: String,
  $deleted: Boolean,
) {
  insert_site(objects: {
    name: $name,
    description: $description,
    created_by: $created_by,
    modified_by: $modified_by,
    deleted_by: $deleted_by,
    deleted: $deleted,
  }) {
    affected_rows
    returning {
      name
      description
      created_by
      created_on
      modified_by
      modified_on
      deleted_by
      deleted_on
      deleted
      id
    }
  }
}
`

export const INSERT_SERVER_MUTATION=`mutation InsertServer($username: String, $password: String, $status: Boolean, $ip_address: String, $created_by: String, $modified_by: String, $deleted_by: String, $deleted: Boolean, $device_id: Int, $site_id: Int) {
  insert_server(objects: {username: $username, password: $password, status: $status, ip_address: $ip_address, created_by: $created_by, modified_by: $modified_by, deleted_by: $deleted_by, deleted: $deleted, device_id: $device_id, site_id: $site_id}) {
    affected_rows
    returning {
      id
			username
			password
			status
			ip_address
			created_at
			created_by
			modified_by
			modified_at
			deleted_by
			deleted_at
			deleted
			device_id
			site_id
    }
  }
}
    `

export const UPDATE_SITE_MUTATION = `
mutation UpdateSite(
  $siteId: Int!,
  $name: String,
  $description: String,
  $modified_by: String,
  $deleted_by: String,
  $deleted: Boolean,
) {
  update_site(
    where: { id: { _eq: $siteId } }
    _set: {
      name: $name,
      description: $description,
      modified_by: $modified_by,
      deleted_by: $deleted_by,
      deleted: $deleted,
    }
  ) {
    affected_rows
    returning {
      name
      description
      created_by
      created_on
      modified_by
      modified_on
      deleted_by
      deleted_on
      deleted
      id
    }
  }
}
`
export const UPDATE_SERVER_MUTATION=`mutation UpdateServer($id: Int!, $deleted: Boolean, $status: Boolean, $device_id: Int, $site_id: Int, $created_by: String, $deleted_by: String, $ip_address: String, $modified_by: String, $password: String, $username: String) {
  update_server(where: {id: {_eq: $id}}, _set: {deleted: $deleted, status: $status, device_id: $device_id, site_id: $site_id, created_by: $created_by, deleted_by: $deleted_by, ip_address: $ip_address, modified_by: $modified_by, password: $password, username: $username}) {
    affected_rows
    returning {
      deleted
      status
      device_id
      id
      site_id
      created_by
      deleted_by
      ip_address
      modified_by
      password
      username
      created_at
      deleted_at
      modified_at
    }
  }
}`;

export const DELETE_SERVER_MUTATION=`
mutation DeleteServer($id: Int!) {
  delete_server_by_pk(id: $id) {
    id
    username
    password
    status
    ip_address
    created_at
    created_by
    modified_by
    modified_at
    deleted_by
    deleted_at
    deleted
    device_id
    site_id
  }
}
`;


export const DELETE_SITE_MUTATION = `
mutation DeleteSite($site_id: Int!) {
  delete_site(where: { id: { _eq: $site_id } }) {
    affected_rows
    returning {
      id
      deleted
    }
  }
}
`;

export const GET_USER_QUERY= `
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
    person_access
    active
  }
}
`;

export const INSERT_USER_MUTATION= `
mutation InsertUser(
  $deleted: Boolean,
  $role_id: Int,
  $site_id: Int,
  $created_by: String,
  $deleted_by: String,
  $email: String,
  $encryption_key: String,
  $image_url: String,
  $modified_by: String,
  $password: String,
  $person_access: String,
  $user: String
) {
  insert_user(objects: {
    deleted: $deleted,
    role_id: $role_id,
    site_id: $site_id,
    created_by: $created_by,
    deleted_by: $deleted_by,
    email: $email,
    encryption_key: $encryption_key,
    image_url: $image_url,
    modified_by: $modified_by,
    password: $password,
    person_access: $person_access,
    user: $user
  }) {
    affected_rows
    returning {
      active
      deleted
      is_it_user
      id
      role_id
      site_id
      created_by
      deleted_by
      email
      encryption_key
      image_url
      modified_by
      password
      person_access
      user
      created_on
      deleted_on
      modified_on
    }
  }
}
`;

export const UPDATE_USER_MUTATION= `
mutation UpdateUser($id: Int!, $userInput: user_set_input!) {
  update_user(where: {id: {_eq: $id}}, _set: $userInput) {
    affected_rows
    returning {
      id
      email
      password
      person_access
      user
      active
    }
  }
}
`;

export const DELETE_USER_MUTATION=`
mutation DeleteUser($user_id: Int!) {
  delete_user(where: { id: { _eq: $user_id } }) {
    affected_rows
  }
}
`;
