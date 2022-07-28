import { Box } from '@chakra-ui/react';
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import userService from '../../services/userService';
import HandleRoute from './HandleRoute';
import Layout from '../Layout/Layout';
import Login from '../Login/Login.jsx';
import Home from '../Home/Home';
import Profile from '../Profile/Profile';
import Detail from '../Detail/Detail';
import BookingCreation from '../BookingCreation/BookingCreation';
import BookingConfirmation from '../BookingCreation/BookingConfirmation';
import About from '../About/About';

const RoleRoute = ({ component: ComponentRouter, roles }) => {
  const userRoles = userService.getRoles();

  return userRoles?.some(role => roles.includes(role) || role === 'ADMIN') ? (
    ComponentRouter
  ) : (
    <Navigate to="/" />
  );
};

const WrapperRoutesLayout = () => {
  return (
    <div>
      <Layout />
      <Box
        pl="30px"
        pr="30px"
        pt="90px"
        pb="40px"
        w="100%"
        minH="100vh"
        h="calc(100vh - 130px)"
        transition="padding-left 0.3s"
        bg="background"
        overflowX="hidden"
      >
        <Routes>
          {/* Ho route */}
          <Route path="/home" element={<Home />} />

          <Route
            path="/profile"
            element={<RoleRoute component={<Profile />} roles={[]} />}
          />
          <Route
            path="/detail/:id"
            element={<RoleRoute component={<Detail />} roles={[]} />}
          />
          <Route
            path="/book/:local"
            element={<RoleRoute component={<BookingCreation />} roles={[]} />}
          />
          <Route
            path="/confirmation/:id"
            element={
              <RoleRoute component={<BookingConfirmation />} roles={[]} />
            }
          />
          <Route
            path="/about"
            element={<RoleRoute component={<About />} roles={[]} />}
          />

          {/* Default routes */}
          <Route path="*" element={<Navigate to="/home" />} />
        </Routes>
      </Box>
    </div>
  );
};

const Router = () => (
  <main>
    <Routes>
      {/* Public routes */}
      <Route exact path="/" element={<HandleRoute component={Login} />} />
      <Route exact path="/login" element={<HandleRoute component={Login} />} />

      {/* Private routes */}
      <Route
        path="/*"
        element={<HandleRoute component={WrapperRoutesLayout} type="private" />}
      />
    </Routes>
  </main>
);

export default Router;
