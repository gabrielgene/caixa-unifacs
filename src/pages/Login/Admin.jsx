import React from 'react';

import BaseLogin from './BaseLogin';

export const AdminLogin = (props) => (
  <BaseLogin {...props} type="admin" />
)

export default AdminLogin;