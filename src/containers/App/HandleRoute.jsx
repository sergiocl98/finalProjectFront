import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import AuthContext from '../../store/authContext';

const HandleRoute = ({ component: ComponentRoute, type='public' }) => {
  const { isLoggedIn } = useContext(AuthContext);
  
  if (type === 'private'){
    return isLoggedIn ? <ComponentRoute /> : <Navigate to="/login" />; 
  }

  return isLoggedIn ? <Navigate to='/home' /> : <ComponentRoute />;

};

export default HandleRoute;
