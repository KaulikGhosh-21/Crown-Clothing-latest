import React from 'react'

import { useSelector } from 'react-redux'
import { Navigate, useLocation } from 'react-router-dom';

import { selectCurrentUser } from '../../store/user/user.selector'

export const RequireAuth = ({children}) => {

  const location = useLocation();

  console.log(location);

  const currentUser = useSelector(selectCurrentUser);

  console.log(!currentUser);

  return !currentUser ? <Navigate to="/auth" state={{ path: location.pathname }}/> : children
      
}
