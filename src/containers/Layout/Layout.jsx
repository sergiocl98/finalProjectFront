import React from 'react';
import Topbar from './Topbar/Topbar';
import Sidebar from './Sidebar/Sidebar';
import { Box, Fade } from '@chakra-ui/react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

const withRouter = Component => props => {
  const location = useLocation();
  const match = { params: useParams() };
  const history = useNavigate();

  return <Component location={ location } match={ match } history={ history } { ...props } />;
};

const Layout = ({sidebarShow, setSidebarShow}) => {
  return (
    <Box data-testid='layout'>
      <Fade in={ true }>
        <Topbar changeSidebarVisibility={ setSidebarShow } />
        <Sidebar sidebarShow={ sidebarShow } />
      </Fade>
    </Box>
  );
};

export default withRouter(Layout);
