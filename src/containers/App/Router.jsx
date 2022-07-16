import { Box } from '@chakra-ui/react';
import React from 'react';
import { Routes, Route, Navigate, } from 'react-router-dom';
import { useToggle } from '../../hooks/useToggle';
import userService from '../../services/userService';
import HandleRoute from './HandleRoute';
import Layout from '../Layout/Layout';
import Login from '../Login/Login.jsx';
import Home from '../Home/Home';

const RoleRoute = ({ component: ComponentRouter, roles }) => {
  const userRoles = userService.getRoles();
  
  return  userRoles?.some(role => roles.includes(role) || role === 'ADMIN')  ? ComponentRouter : <Navigate to='/' />;
};

const WrapperRoutesLayout = () => {
  const [ sidebarShow, setSidebarShow ] = useToggle(true);
  
  return (
    <div>
      <Layout sidebarShow={ sidebarShow } setSidebarShow={ setSidebarShow } />
      <Box pl={ sidebarShow ? '270px' : {base:'20px', sm:'110px'} } pr='30px' pt='90px' pb='40px' w='100%' minH='100vh' h='calc(100vh - 130px)' transition='padding-left 0.3s' bg='background' overflowX='hidden'>
        <Routes>
          {/* Ho route */}
          <Route path='/home' element={ <Home /> } />
          
          {/* Loans routes */}
          {/* <Route path='/loans' element={ <RoleRoute component={ <Loans /> } roles={ [] } /> } /> */}


          {/* Default routes */}
          <Route path="*" element={ <Navigate to='/home' /> } />
        </Routes>
      </Box>
    </div>
  );
};

const Router = () => (
  <main>
    <Routes>
      {/* Public routes */}
      <Route exact path='/' element={ <HandleRoute component={ Login }/> } />
      <Route exact path='/login' element={ <HandleRoute component={ Login } /> } />
      
      {/* Private routes */}
      <Route path='/*' element={ <HandleRoute component={ WrapperRoutesLayout } type='private' /> } />
    </Routes>
  </main>
);

export default Router;
